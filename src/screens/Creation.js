import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import NavigationService from '../navigation/service';
import CreationHeader from '../components/CreationHeader';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';
import Pros from '../../assets/pros.svg';
import CustomInput from '../components/Input';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';

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
  label: {
    fontSize: 10
  },
  marginTop: {
    marginTop: 30
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
        <CustomInput
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Имя аккаунта"
          placeholder="Введите имя"
        />
        <CustomInput
          inputStyle={styles.input}
          label="Пароль"
          placeholder="Создайте пароль"
          hasMargin
          labelStyle={[styles.label, styles.marginTop]}
          password
        />
        <CustomInput
          inputStyle={styles.input}
          label="Подтверждение"
          placeholder="Подтвердите пароль"
          hasMargin
          labelStyle={[styles.label, styles.marginTop]}
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
          buttonTextStyle={styles.buttonTextWithNote}
          noteText="Уже зарегистрированы?"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
