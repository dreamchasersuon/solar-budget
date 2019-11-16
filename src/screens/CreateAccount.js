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
import { $BLUE, $MEDIUMSILVER, $RED } from '../constants/colorLiterals';
import { useDispatch } from 'react-redux';
import { createByCredentials } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import ArrowLeft from '../../assets/left-arrow.svg';

const styles = StyleSheet.create({
  buttonTextWithNote: {
    color: $BLUE,
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
    backgroundColor: $BLUE,
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

  const createUser = () => {
    if (!validateLoginLength()) {
      setLoginValidity(false);
      setValidity(false);
      Vibration.vibrate(500);
      return dropDownRef.current.alertWithType('error', 'Введите логин', '');
    }
    if (!validatePasswordLength()) {
      setPasswordValidity(false);
      setValidity(false);
      Vibration.vibrate(500);
      return dropDownRef.current.alertWithType('error', 'Введите пароль', '');
    }
    if (!validatePasswordsIdentity()) {
      Vibration.vibrate(500);
      setRepeatedPasswordValidity(false);
      setValidity(false);
      return dropDownRef.current.alertWithType(
        'error',
        'Пароли не совпадают',
        ''
      );
    }
    setValidity(true);
    dispatch(
      createByCredentials({
        login,
        password
      })
    );

    goTo('CreatePin', { login });
  };
  const goBack = () => NavigationService.goBack();
  const goTo = (routeName, params = {}) =>
    NavigationService.navigate(routeName, params);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
        <Text style={styles.headerText}>Новый аккаунт</Text>
      </View>
      <AuthHeader
        title="Анонимность"
        note="Только вы можете просматривать свои данные. Никакой привязки к соц.
        сетям и сквозной аналитики"
        titleStyle={styles.title}
      >
        <Pros />
      </AuthHeader>
      <View style={styles.form}>
        <CustomInput
          inputStyle={isValidLogin ? styles.input : styles.invalidInput}
          labelStyle={isValidLogin ? styles.label : styles.invalidInput}
          label="Логин"
          placeholder="Введите логин"
          initial={login}
          handleChange={value => handleLoginTyping(value)}
        />
        <CustomInput
          inputStyle={isValidPassword ? styles.input : styles.invalidInput}
          label="Пароль"
          placeholder="Создайте пароль"
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
        <CustomInput
          inputStyle={
            isValidRepeatedPassword ? styles.input : styles.invalidInput
          }
          label="Подтверждение"
          placeholder="Подтвердите пароль"
          hasMargin
          labelStyle={
            isValidRepeatedPassword
              ? [styles.label, styles.marginTop]
              : [styles.invalidLabel, styles.marginTop]
          }
          password
          initial={repeatedPassword}
          handleChange={value => setRepeatedPassword(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={
            isValid ? styles.buttonFeedback : styles.invalidButtonFeedback
          }
          buttonText="Создать"
          handleOnPress={isValid ? createUser : null}
        />
        <ButtonSecondary
          handleOnPress={() => goTo('LoginCredentials')}
          buttonText="ВОЙТИ"
          hasNote
          buttonTextStyle={styles.buttonTextWithNote}
          noteText="Уже зарегистрированы?"
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
