import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import CustomInput from '../components/Input';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';

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
        <CustomInput label="Имя аккаунта" placeholder="Введите имя" />
        <CustomInput
          label="Пароль"
          placeholder="Введите пароль"
          hasMargin
          password
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton handleOnPress={authorize} buttonText="Войти" />
        <SecondaryButton buttonText="Забыли пароль?" />
      </View>
    </KeyboardAvoidingView>
  );
}
