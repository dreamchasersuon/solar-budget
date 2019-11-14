import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import Fingerprint from '../../assets/big-fingerprint.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';
// eslint-disable-next-line import/no-namespace
import * as LocalAuthentication from 'expo-local-authentication';
import DropdownAlert from 'react-native-dropdownalert';
import { useDispatch, useSelector } from 'react-redux';
import { enableFingerprint } from '../redux/features/userFeatureSlice';

const styles = StyleSheet.create({
  buttonText: {
    color: $BLUE,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center'
  },
  buttonsContainer: {
    height: 80,
    justifyContent: 'space-between',
    marginBottom: 20,
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
  fingerprint: {
    alignItems: 'center',
    borderColor: $MEDIUMSILVER,
    borderRadius: 50,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 100,
    justifyContent: 'center',
    marginBottom: 20,
    width: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    maxWidth: 220,
    textAlign: 'center'
  }
});

export default function AddFingerprint() {
  const dropDownRef = useRef(null);
  const user = useSelector(state => state.user.find(user => user.active));
  const dispatch = useDispatch();

  const goTo = roteName => NavigationService.navigate(roteName);

  const hasFingerprint = async () => {
    const fingerprint = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return fingerprint.find(type => type === 1);
  };

  const useFingerprint = async () => {
    if (await hasFingerprint()) {
      try {
        await LocalAuthentication.isEnrolledAsync();
        dropDownRef.current.alertWithType(
          'info',
          'Сканирование запущено',
          'Пожалуйста, приложите отпечаток пальца к сенсору.'
        );
        await scanFingerprint();
      } catch (e) {
        dropDownRef.current.alertWithType(
          'error',
          'Отпечаток не настроен',
          'Пожалуйста, убедитесь, что отпечаток пальца настроен в настрйоках системы.'
        );
      }
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
      dispatch(enableFingerprint({ userId: user.id }));
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
      <View style={styles.header} />
      <InfoPost
        title={'Использовать отпечаток пальца для входа?'}
        note="Используйте отпечаток пальца для более быстрого и легкого доступа к
          своей учетной записи"
        titleStyle={styles.title}
      >
        <TouchableOpacity style={styles.fingerprint}>
          <Fingerprint />
        </TouchableOpacity>
      </InfoPost>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={useFingerprint}
          buttonText="Использовать"
        />
        <SecondaryButton
          handleOnPress={() => goTo('App')}
          buttonTextStyle={styles.buttonText}
          buttonText="Позже"
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
