import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import mapColorsToTheme, { $MEDIUMSILVER } from '../constants/colorLiterals';
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
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function AddFingerprint() {
  const dropDownRef = useRef(null);

  const { t, i18n } = useTranslation([
    'FingerprintScreen',
    'ApplicationMessages',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);

  const user = useSelector(state => state.user.find(user => user.active));
  const { background_bottom, accent, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    background: {
      backgroundColor: background_bottom
    },
    backgroundAccent: {
      backgroundColor: accent
    },
    textMain: {
      color: text_main
    },
    textAccent: {
      color: accent
    }
  });

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
          `${t('ApplicationMessages:fingerprintScanningEnabledMsg')}`,
          `${t('ApplicationMessages:fingerprintScanningEnabledMsgNote')}`
        );
        await scanFingerprint();
      } catch (e) {
        dropDownRef.current.alertWithType(
          'error',
          `${t('ApplicationErrorMessages:fingerprintNotConfiguredMsg')}`,
          `${t('ApplicationErrorMessages:fingerprintNotConfiguredMsgNote')}`
        );
      }
    } else {
      return dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:notSupportedMsg')}`,
        `${t('ApplicationErrorMessages:notSupportedFingerprintMsgNote')}`
      );
    }
  };

  const scanFingerprint = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      dispatch(enableFingerprint({ userId: user.id }));
      dropDownRef.current.alertWithType(
        'success',
        `${t('ApplicationSuccessMessages:fingerprintRecognizedMsg')}`,
        ''
      );
      setTimeout(() => {
        goTo('App');
      }, 1000);
    } else {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:fingerprintNotRecognizedMsg')}`,
        `${t('ApplicationErrorMessages:fingerprintNotRecognizedMsgNote')}`
      );
    }
  };

  return (
    <View style={[styles.container, themeStyles.background]}>
      <View style={styles.header} />
      <AuthHeader
        title={t('FingerprintScreen:headerTitle')}
        note={t('FingerprintScreen:headerNote')}
        titleStyle={[styles.title, themeStyles.textMain]}
        noteColor={text_main}
      >
        <TouchableOpacity style={styles.fingerprint}>
          <Fingerprint fill={accent} />
        </TouchableOpacity>
      </AuthHeader>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={[styles.buttonFeedback, themeStyles.backgroundAccent]}
          handleOnPress={useFingerprint}
          buttonText={t('FingerprintScreen:useFingerprintButtonLabel')}
        />
        <ButtonSecondary
          handleOnPress={() => goTo('App')}
          buttonTextStyle={[styles.buttonText, themeStyles.textAccent]}
          buttonText={t('FingerprintScreen:useFingerprintLaterButtonLabel')}
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
