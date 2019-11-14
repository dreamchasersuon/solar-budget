import React, { useState, useRef } from 'react';
import { View, StyleSheet, Vibration, StatusBar } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import NumericBoard from '../components/NumericBoard';
import SecondaryButton from '../components/SecondaryButton';
import SecurePin from '../components/SecurePin';
import { $BLUE } from '../constants/colorLiterals';
import { authorizeUserByPinCode } from '../redux/features/userFeatureSlice';
import { useDispatch, useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
// eslint-disable-next-line import/no-namespace
import * as LocalAuthentication from 'expo-local-authentication';

const styles = StyleSheet.create({
  backArrow: {
    marginLeft: 20
  },
  buttonText: {
    color: $BLUE,
    fontSize: 12,
    textAlign: 'center'
  },
  buttonTextWithNote: {
    color: $BLUE,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center'
  },
  buttonsContainer: {
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  numberStyle: {
    fontSize: 40
  },
  numericBoardContainerStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    width: 65
  },
  numericBoardWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 240
  },
  paginationActive: {
    backgroundColor: $BLUE,
    borderRadius: 50,
    height: 10,
    width: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    maxWidth: 220,
    textAlign: 'center'
  }
});

export default function LoginPinCode() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.find(user => user.active));

  const dropDownRef = useRef(null);
  const [pinCode, setPin] = useState('');
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => NavigationService.navigate(routeName);

  const setPinCode = value => () => {
    if (pinCode.length === 4) return;
    const updatePinCode = pinCode + value;
    if (value === 'delete') {
      return setPin(pinCode.slice(0, -1));
    }
    setPin(updatePinCode);
  };

  if (pinCode.length === 4) {
    setPin('');
    try {
      dispatch(authorizeUserByPinCode({ pinCode }));
      NavigationService.navigate('App');
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        'Пароли не совпадают',
        e.message
      );
      Vibration.vibrate(500);
    }
  }

  const useFingerprint = async () => {
    if (user.fingerprint !== null) {
      dropDownRef.current.alertWithType(
        'info',
        'Сканирование запущено',
        'Пожалуйста, приложите отпечаток пальца к сенсору.'
      );
      await scanFingerprint();
    } else {
      return dropDownRef.current.alertWithType(
        'error',
        'Несовместимое устройство',
        'На данном устройстве нет возможности сканирования отпечатка пальца.'
      );
    }
  };

  const scanFingerprint = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      dropDownRef.current.alertWithType('success', 'Отпечаток распознан', '');
      setTimeout(() => {
        goTo('App');
      }, 1000);
    } else {
      dropDownRef.current.alertWithType(
        'error',
        'Отпечаток не распознан',
        'Попробуйте отсканировать еще раз.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <View>
        <InfoPost title="Добрый вечер" titleStyle={styles.title}>
          <Pros />
        </InfoPost>
        <SecurePin
          paginationIndicatorStyle={styles.paginationActive}
          noMargins
          pinCodeLength={pinCode.length}
        />
      </View>
      <NumericBoard
        onPressNumber={value => setPinCode(value)}
        onPressFingerprint={useFingerprint}
        hasDelete
        bigDelete
        hasFingerprint
        isFingerprintEnabled
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        numberStyle={styles.numberStyle}
      />
      <View style={styles.buttonsContainer}>
        <SecondaryButton
          buttonTextStyle={styles.buttonText}
          handleOnPress={() => goTo('LoginCredentials')}
          buttonText="Использовать логин и пароль"
        />
        <SecondaryButton
          buttonTextStyle={styles.buttonTextWithNote}
          handleOnPress={() => goTo('Creation')}
          buttonText="РЕГИСТРАЦИЯ"
          hasNote
          noteText="Не зарегистрированы?"
        />
      </View>
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row'
        }}
        updateStatusBar={false}
        ref={dropDownRef}
      />
    </View>
  );
}
