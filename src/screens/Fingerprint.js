import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import Fingerprint from '../../assets/big-fingerprint.svg';
import NavigationService from '../navigation/service';
import AuthHeader from '../components/AuthHeader';
import ButtonWithFeedbackBlue from '../components/buttons/ButtonWithFeedbackBlue';
import ButtonSecondary from '../components/buttons/ButtonSecondary';
// eslint-disable-next-line import/no-namespace
import * as LocalAuthentication from 'expo-local-authentication';
import DropdownAlert from 'react-native-dropdownalert';
import { useDispatch, useSelector } from 'react-redux';
import { enableFingerprint } from '../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';

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
  },
  buttonFeedback: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function AddFingerprint() {
  const dropDownRef = useRef(null);

  const { t, i18n } = useTranslation('FingerprintScreen');

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
      <AuthHeader
        title={t('headerTitle')}
        note={t('headerNote')}
        titleStyle={styles.title}
      >
        <TouchableOpacity style={styles.fingerprint}>
          <Fingerprint />
        </TouchableOpacity>
      </AuthHeader>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={useFingerprint}
          buttonText={t('useFingerprintButtonLabel')}
        />
        <ButtonSecondary
          handleOnPress={() => goTo('App')}
          buttonTextStyle={styles.buttonText}
          buttonText={t('useFingerprintLaterButtonLabel')}
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
