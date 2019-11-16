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
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import { useDispatch } from 'react-redux';
import { authorizeUserByCredentials } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';

const styles = StyleSheet.create({
  backArrow: {
    marginLeft: 20
  },
  buttonText: {
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
    backgroundColor: $BLUE,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function LoginCredentials() {
  const dispatch = useDispatch();

  const dropDownRef = useRef(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const authorize = () => {
    try {
      if (login.length && password.length) {
        dispatch(authorizeUserByCredentials({ login, password }));
        NavigationService.navigate('App');
      }
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        'Пароли не совпадают',
        e.message
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
        title="Добрый вечер"
        note="Войдите с помощью логина и пароля. Если вы забыли пароль -
          воспользуйтесь формой"
        extendedNote="восстановления пароля"
        titleStyle={styles.title}
        handleOnPress={() => goTo('ForgotPassword')}
      >
        <Pros />
      </AuthHeader>
      <View style={styles.form}>
        <CustomInput
          inputStyle={styles.input}
          label="Логин"
          labelStyle={styles.label}
          placeholder="Введите логин"
          initial={login}
          handleChange={value => setLogin(value)}
        />
        <CustomInput
          label="Пароль"
          inputStyle={styles.input}
          placeholder="Введите пароль"
          hasMargin
          labelStyle={[styles.label, styles.marginTop]}
          password
          initial={password}
          handleChange={value => setPassword(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={authorize}
          buttonText="Войти"
        />
        <ButtonSecondary
          buttonTextStyle={styles.buttonText}
          buttonText="Забыли пароль?"
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
