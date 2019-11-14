import React, { useState } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import NumericBoard from '../components/NumericBoard';
import SecondaryButton from '../components/SecondaryButton';
import SecurePin from '../components/SecurePin';
import { $BLUE, $RED } from '../constants/colorLiterals';
import { authorizeUserByPinCode } from '../redux/features/userFeatureSlice';
import { useDispatch } from 'react-redux';

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
  }
});

export default function LoginPinCode() {
  const dispatch = useDispatch();

  const [pinCode, setPin] = useState('');
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);

  const setPinCode = value => () => {
    if (pinCode.length === 4) return;
    const updatePinCode = pinCode + value;
    if (value === 'delete') {
      return setPin(pinCode.slice(0, -1));
    }
    setPin(updatePinCode);
  };

  if (pinCode.length === 4) {
    try {
      dispatch(authorizeUserByPinCode({ pinCode }));
      NavigationService.navigate('App');
    } catch (e) {
      setPin('');
      Vibration.vibrate(500);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <View>
        <InfoPost title="Добрый вечер">
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
        hasDelete
        bigDelete
        hasFingerprint
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        numberStyle={styles.numberStyle}
      />
      <View style={styles.buttonsContainer}>
        <SecondaryButton
          buttonTextStyle={styles.buttonText}
          handleOnPress={goTo('LoginCredentials')}
          buttonText="Использовать логин и пароль"
        />
        <SecondaryButton
          buttonTextStyle={styles.buttonTextWithNote}
          handleOnPress={goTo('Creation')}
          buttonText="РЕГИСТРАЦИЯ"
          hasNote
          noteText="Не зарегистрированы?"
        />
      </View>
    </View>
  );
}
