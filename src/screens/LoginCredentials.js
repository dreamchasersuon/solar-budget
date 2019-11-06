import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import CustomInput from '../components/Input';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';

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
  }
});

export default function LoginCredentials() {
  const goBack = () => NavigationService.goBack();
  const authorize = () => NavigationService.replaceTo('App');
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <InfoPost
        title="Добрый вечер"
        note="Войдите с помощью логина и пароля. Если вы забыли пароль -
          воспользуйтесь формой"
        extendedNote="восстановления пароля"
      >
        <Pros />
      </InfoPost>
      <View style={styles.form}>
        <CustomInput
          inputStyle={styles.input}
          label="Имя аккаунта"
          labelStyle={styles.label}
          placeholder="Введите имя"
        />
        <CustomInput
          label="Пароль"
          inputStyle={styles.input}
          placeholder="Введите пароль"
          hasMargin
          labelStyle={[styles.label, styles.marginTop]}
          password
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton handleOnPress={authorize} buttonText="Войти" />
        <SecondaryButton
          buttonTextStyle={styles.buttonText}
          buttonText="Забыли пароль?"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
