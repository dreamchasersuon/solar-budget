import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Vibration,
  StatusBar
} from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import AuthHeader from '../components/AuthHeader';
import CustomInput from '../components/CustomInput';
import ButtonWithFeedbackBlue from '../components/buttons/ButtonWithFeedbackBlue';
import ButtonSecondary from '../components/buttons/ButtonSecondary';
import { $LIGHT_BLUE, $MEDIUMSILVER, $RED } from '../constants/colorLiterals';
import { useDispatch } from 'react-redux';
import { authorizeUserByCredentials } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  backArrow: {
    marginLeft: 20
  },
  buttonText: {
    color: $LIGHT_BLUE,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center'
  },
  buttonsContainer: {
    height: 90,
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
  form: {
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: $MEDIUMSILVER,
    fontSize: 13,
    height: 40,
    width: '100%'
  },
  invalidInput: {
    borderBottomWidth: 1,
    borderColor: $RED,
    color: $RED,
    fontSize: 13,
    height: 40,
    width: '100%'
  },
  label: {
    fontSize: 10
  },
  invalidLabel: {
    fontSize: 10,
    color: $RED
  },
  marginTop: {
    marginTop: 30
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
    backgroundColor: $LIGHT_BLUE,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  },
  invalidButtonFeedback: {
    alignItems: 'center',
    backgroundColor: $RED,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function LoginCredentials() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation([
    'LoginCredentialsScreen',
    'ApplicationErrorMessages'
  ]);

  const dropDownRef = useRef(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setValidity] = useState(true);
  const [isValidLogin, setLoginValidity] = useState(true);
  const [isValidPassword, setPasswordValidity] = useState(true);

  const handleLoginTyping = value => {
    setLoginValidity(true);
    setLogin(value);
  };

  const handlePasswordTyping = value => {
    setPasswordValidity(true);
    setPassword(value);
  };

  const validateLoginLength = () => login.length;
  const validatePasswordLength = () => password.length;

  const authorize = () => {
    try {
      if (!validateLoginLength()) {
        setLoginValidity(false);
        setValidity(false);
        Vibration.vibrate(500);
        return dropDownRef.current.alertWithType(
          'error',
          `${t('ApplicationErrorMessages:loginNotEnteredMsg')}`,
          ''
        );
      }
      if (!validatePasswordLength()) {
        setPasswordValidity(false);
        setValidity(false);
        Vibration.vibrate(500);
        return dropDownRef.current.alertWithType(
          'error',
          `${t('ApplicationErrorMessages:passwordNotEnteredMsg')}`,
          ''
        );
      }
      if (validateLoginLength() && validatePasswordLength()) {
        dispatch(authorizeUserByCredentials({ login, password }));
        NavigationService.navigate('App');
      }
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:passwordsNotMatchMsg')}`,
        ''
      );
      Vibration.vibrate(500);
    }
  };
  const goBack = () => NavigationService.goBack();
  const goTo = route => NavigationService.navigate(route);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <AuthHeader
        title={t('LoginCredentialsScreen:headerTitle')}
        note={t('LoginCredentialsScreen:headerNote')}
        extendedNote={t('LoginCredentialsScreen:headerExtendedNote')}
        titleStyle={styles.title}
        handleOnPress={() => goTo('ForgotPassword')}
      >
        <Pros />
      </AuthHeader>
      <View style={styles.form}>
        <CustomInput
          inputStyle={isValidLogin ? styles.input : styles.invalidInput}
          label={t('LoginCredentialsScreen:loginInputLabel')}
          labelStyle={isValidLogin ? styles.label : styles.invalidLabel}
          placeholder={t('LoginCredentialsScreen:loginInputText')}
          initial={login}
          handleChange={value => handleLoginTyping(value)}
        />
        <CustomInput
          label={t('LoginCredentialsScreen:passwordInputLabel')}
          inputStyle={isValidPassword ? styles.input : styles.invalidInput}
          placeholder={t('LoginCredentialsScreen:passwordInputText')}
          hasMargin
          labelStyle={
            isValidPassword
              ? [styles.label, styles.marginTop]
              : [styles.invalidLabel, styles.marginTop]
          }
          password
          initial={password}
          handleChange={value => handlePasswordTyping(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={
            isValid ? styles.buttonFeedback : styles.invalidButtonFeedback
          }
          handleOnPress={isValid ? authorize : null}
          buttonText={t('LoginCredentialsScreen:loginButtonLabel')}
        />
        <ButtonSecondary
          buttonTextStyle={styles.buttonText}
          buttonText={t('LoginCredentialsScreen:redirectToRemindPasswordText')}
          handleOnPress={() => goTo('ForgotPassword')}
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
    </KeyboardAvoidingView>
  );
}
