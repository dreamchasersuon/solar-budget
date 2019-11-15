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
import InfoPost from '../components/InfoPost';
import CustomInput from '../components/Input';
import MajorBlueButton from '../components/MajorBlueButton';
import { $MEDIUMSILVER, $RED } from '../constants/colorLiterals';
import DropdownAlert from 'react-native-dropdownalert';
import { useSelector, useDispatch } from 'react-redux';
import { Notifications } from 'expo';
import {
  updateUserPasswordThunk,
  authorizeUserByCredentials
} from '../redux/features/userFeatureSlice';

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
  }
});

export default function LoginCredentials() {
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

  const [isValidLogin, setLoginValidity] = useState(true);
  const [login, setLogin] = useState('');

  const [userCredentials, setUserCredentials] = useState({
    password: undefined,
    login: undefined,
    userId: undefined
  });

  const remindPassword = () => {
    try {
      if (login.length) {
        const user = users.find(user => user.login === login);
        if (user) {
          setLoginValidity(true);
          dropDownRef.current.alertWithType(
            'success',
            'Пользователь найден',
            ''
          );
          return setTimeout(() => {
            goTo('ValidatePinCode', { userId: user.id });
          }, 500);
        }
        throw new Error('Пользователь не найден');
      }
      setLoginValidity(false);
      throw new Error('Введите логин');
    } catch (e) {
      setLoginValidity(false);
      dropDownRef.current.alertWithType(
        'error',
        'Пользователь не найден',
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
    dropDownRef.current.alertWithType('success', 'Пароль обновлён', '');
    setTimeout(() => {
      dispatch(
        authorizeUserByCredentials({
          login: userCredentials.login,
          password: userCredentials.password
        })
      );
    }, 500);
  };

  const goBack = () => NavigationService.goBack();
  const goTo = (route, params) => NavigationService.navigate(route, params);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <InfoPost
        title={
          userCredentials.password !== undefined
            ? 'Восстановление пароля'
            : 'Пароль восстановлен'
        }
        note={
          userCredentials.password !== undefined
            ? 'Введите имя'
            : 'Для обновления пароля нажмите на кнопку'
        }
        titleStyle={styles.title}
      >
        <Pros />
      </InfoPost>
      <View style={styles.form}>
        <CustomInput
          inputStyle={
            isValidLogin
              ? styles.input
              : [styles.input, { color: $RED, borderColor: $RED }]
          }
          label="Имя аккаунта"
          labelStyle={
            isValidLogin ? styles.label : [styles.label, { color: $RED }]
          }
          placeholder="Введите имя"
          initial={login}
          handleChange={value => setLogin(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={
            userCredentials.password !== undefined
              ? updatePassword
              : remindPassword
          }
          buttonText={
            userCredentials.password !== undefined
              ? 'Обновить'
              : 'Напомнить пароль'
          }
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
