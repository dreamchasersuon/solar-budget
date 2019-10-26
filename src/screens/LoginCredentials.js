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
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 50
  },
  backArrow: {
    marginLeft: 20
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 20,
    height: 90,
    width: '100%'
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonText: {
    color: $BLUE,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 5
  },
  label: {
    fontSize: 10
  },
  marginTop: {
    marginTop: 30
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderBottomWidth: 1,
    fontSize: 13
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
