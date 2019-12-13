import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  Vibration
} from 'react-native';
import NavigationService from '../navigation/service';
import AuthHeader from '../components/AuthHeader';
import ButtonWithFeedbackBlue from '../components/buttons/ButtonWithFeedbackBlue';
import ButtonSecondary from '../components/buttons/ButtonSecondary';
import Pros from '../../assets/pros.svg';
import CustomInput from '../components/CustomInput';
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $RED
} from '../constants/colorLiterals';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  buttonTextWithNote: {
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
  backArrow: {
    marginLeft: 20
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20
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

export default function CreateAccount() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const { background_bottom, accent, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    backgroundMain: {
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

  const { t, i18n } = useTranslation([
    'CreateAccountScreen',
    'ApplicationErrorMessages'
  ]);

  const dropDownRef = useRef(null);

  const [isValid, setValidity] = useState(true);
  const [isValidLogin, setLoginValidity] = useState(true);
  const [isValidPassword, setPasswordValidity] = useState(true);
  const [isValidRepeatedPassword, setRepeatedPasswordValidity] = useState(true);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

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
  const validatePasswordsIdentity = () => password === repeatedPassword;

  const createUserByCredentials = () => {
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
    if (!validatePasswordsIdentity()) {
      Vibration.vibrate(500);
      setRepeatedPasswordValidity(false);
      setValidity(false);
      return dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:passwordsNotMatchMsg')}`,
        ''
      );
    }
    setValidity(true);
    try {
      dispatch(
        createUser({
          login,
          password
        })
      );
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:loginIsBusyMsg')}`,
        ''
      );
    }

    goTo('CreatePin', { login });
  };
  const goBack = () => NavigationService.goBack();
  const goTo = (routeName, params = {}) =>
    NavigationService.navigate(routeName, params);
  return (
    <KeyboardAvoidingView
      style={[styles.container, themeStyles.backgroundMain]}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} fill={text_main} style={styles.backArrow} />
        <Text style={[styles.headerText, themeStyles.textMain]}>
          {t('CreateAccountScreen:screenName')}
        </Text>
      </View>
      <AuthHeader
        title={t('CreateAccountScreen:headerTitle')}
        note={t('CreateAccountScreen:headerNote')}
        titleStyle={[styles.title, themeStyles.textMain]}
        noteColor={text_main}
      >
        <Pros />
      </AuthHeader>
      <View style={styles.form}>
        <CustomInput
          inputStyle={
            isValidLogin
              ? [styles.input, themeStyles.textMain]
              : styles.invalidInput
          }
          labelStyle={
            isValidLogin
              ? [styles.label, themeStyles.textMain]
              : styles.invalidLabel
          }
          label={t('CreateAccountScreen:loginInputLabel')}
          placeholder={t('CreateAccountScreen:loginInputText')}
          initial={login}
          handleChange={value => handleLoginTyping(value)}
        />
        <CustomInput
          inputStyle={
            isValidPassword
              ? [styles.input, themeStyles.textMain]
              : styles.invalidInput
          }
          label={t('CreateAccountScreen:passwordInputLabel')}
          placeholder={t('CreateAccountScreen:passwordInputText')}
          hasMargin
          labelStyle={
            isValidPassword
              ? [styles.label, styles.marginTop, themeStyles.textMain]
              : [styles.invalidLabel, styles.marginTop]
          }
          password
          initial={password}
          handleChange={value => handlePasswordTyping(value)}
          iconMainColor={text_main}
          iconAccentColor={accent}
        />
        <CustomInput
          inputStyle={
            isValidRepeatedPassword
              ? [styles.input, themeStyles.textMain]
              : styles.invalidInput
          }
          label={t('CreateAccountScreen:confirmPasswordInputLabel')}
          placeholder={t('CreateAccountScreen:confirmPasswordInputText')}
          hasMargin
          labelStyle={
            isValidRepeatedPassword
              ? [styles.label, styles.marginTop, themeStyles.textMain]
              : [styles.invalidLabel, styles.marginTop]
          }
          password
          initial={repeatedPassword}
          handleChange={value => setRepeatedPassword(value)}
          iconMainColor={text_main}
          iconAccentColor={accent}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={
            isValid
              ? [styles.buttonFeedback, themeStyles.backgroundAccent]
              : styles.invalidButtonFeedback
          }
          buttonText={t('CreateAccountScreen:createButtonLabel')}
          handleOnPress={createUserByCredentials}
        />
        <ButtonSecondary
          handleOnPress={() => goTo('LoginCredentials')}
          buttonText={t('CreateAccountScreen:redirectToLoginText')}
          hasNote
          buttonTextStyle={[styles.buttonTextWithNote, themeStyles.textAccent]}
          noteText={t('CreateAccountScreen:alreadyRegisteredRedirectText')}
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
