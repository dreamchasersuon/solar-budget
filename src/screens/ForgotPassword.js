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
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $RED
} from '../constants/colorLiterals';
import DropdownAlert from 'react-native-dropdownalert';
import { useSelector, useDispatch } from 'react-redux';
import { Notifications } from 'expo';
import {
  updateUserPasswordThunk,
  authorizeUserByCredentials
} from '../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  backArrow: {
    marginLeft: 20
  },
  buttonsContainer: {
    height: 90,
    justifyContent: 'center',
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
  label: {
    fontSize: 10
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

export default function LoginCredentials() {
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation([
    'ForgotPasswordScreen',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);

  const dropDownRef = useRef(null);

  const [isValidLogin, setLoginValidity] = useState(true);
  const multiAccUser = users.find(user => user.multiAccountSelect);
  let user;
  if (multiAccUser) {
    user = multiAccUser;
  } else {
    user = users.find(user => user.active);
  }
  const [login, setLogin] = useState(user.login);
  const { background_bottom, text_main, accent } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    textMain: {
      color: text_main
    },
    backgroundMain: {
      backgroundColor: background_bottom
    },
    backgroundAccent: {
      backgroundColor: accent
    }
  });

  const [userCredentials, setUserCredentials] = useState({
    password: undefined,
    login: undefined,
    userId: undefined
  });

  const remindPassword = () => {
    try {
      if (login.length) {
        if (user) {
          setLoginValidity(true);
          dropDownRef.current.alertWithType(
            'success',
            `${t('ApplicationSuccessMessages:userFoundedMsg')}`,
            ''
          );
          return setTimeout(() => {
            goTo('ValidatePinCode', { userId: user.id });
          }, 500);
        }
        throw new Error(`${t('ApplicationErrorMessages:wrongLoginMsg')}`);
      }
      setLoginValidity(false);
      throw new Error(`${t('ApplicationErrorMessages:loginNotEnteredMsg')}`);
    } catch (e) {
      setLoginValidity(false);
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:userNotFoundMsg')}`,
        e.message
      );
      Vibration.vibrate(500);
    }
  };

  const handleNotification = notification => {
    const { password, userId } = notification.data;
    const user = users.find(user => user.id === userId);
    setUserCredentials({ password, login: user.login, userId });
    setLogin(login);
  };

  Notifications.addListener(handleNotification);

  const updatePassword = () => {
    dispatch(updateUserPasswordThunk(userCredentials));
    dropDownRef.current.alertWithType(
      'success',
      `${t('ApplicationSuccessMessages:passwordUpdatedMsg')}`,
      ''
    );
    setTimeout(() => {
      dispatch(
        authorizeUserByCredentials({
          login: userCredentials.login,
          password: userCredentials.password
        })
      );
      goTo('App');
    }, 500);
  };

  const goBack = () => NavigationService.goBack();
  const goTo = (route, params = {}) =>
    NavigationService.navigate(route, params);
  return (
    <KeyboardAvoidingView
      style={[styles.container, themeStyles.backgroundMain]}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} fill={text_main} style={styles.backArrow} />
      </View>
      <AuthHeader
        title={
          userCredentials.password !== undefined
            ? t('ForgotPasswordScreen:headerTitleSuccessReminder')
            : t('ForgotPasswordScreen:headerTitleStartReminder')
        }
        note={
          userCredentials.password !== undefined
            ? t('ForgotPasswordScreen:headerNoteSuccessReminder')
            : t('ForgotPasswordScreen:headerNoteStartReminder')
        }
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
              : [styles.input, { color: $RED, borderColor: $RED }]
          }
          label={t('ForgotPasswordScreen:loginInputLabel')}
          labelStyle={
            isValidLogin
              ? [styles.label, themeStyles.textMain]
              : [styles.label, { color: $RED }]
          }
          placeholder={t('ForgotPasswordScreen:loginInputText')}
          initial={login}
          handleChange={value => setLogin(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          handleOnPress={
            userCredentials.password !== undefined
              ? updatePassword
              : remindPassword
          }
          buttonText={
            userCredentials.password !== undefined
              ? t('ForgotPasswordScreen:updatePasswordButton')
              : t('ForgotPasswordScreen:remindPasswordButton')
          }
          buttonStyle={[styles.buttonFeedback, themeStyles.backgroundAccent]}
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
