import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import NavigationService from '../navigation/service';
import CreationHeader from '../components/CreationHeader';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';
import Pros from '../../assets/pros.svg';
import CustomInput from '../components/Input';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default function Creation() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <CreationHeader goBack={goBack} />
      <InfoPost
        title="Анонимность"
        note="Только вы можете просматривать свои данные. Никакой привязки к соц.
        сетям и сквозной аналитики"
      >
        <Pros />
      </InfoPost>
      <View style={styles.form}>
        <CustomInput label="Имя аккаунта" placeholder="Введите имя" />
        <CustomInput
          label="Пароль"
          placeholder="Создайте пароль"
          hasMargin
          password
        />
        <CustomInput
          label="Подтверждение"
          placeholder="Подтвердите пароль"
          hasMargin
          password
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          buttonText="Создать"
          handleOnPress={goTo('CreatePin')}
        />
        <SecondaryButton
          handleOnPress={goTo('LoginCredentials')}
          buttonText="ВОЙТИ"
          hasNote
          noteText="Уже зарегистрированы?"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
