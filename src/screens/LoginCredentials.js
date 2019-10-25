import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Pros from '../../assets/pros.svg';
import { $BLUE, $MEDIUMSILVER, $WHITE } from '../constants/colorLiterals';
import ArrowLeft from '../../assets/left-arrow.svg';
import TogglePassword from '../../assets/toggle-pass.svg';
import NavigationService from '../navigation/service';

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
  pros: {
    alignItems: 'center'
  },
  prosTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10
  },
  prosText: {
    textAlign: 'center',
    fontSize: 11,
    width: 250,
    marginTop: 5,
    opacity: 0.6
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 20,
    height: 80,
    width: '100%'
  },
  button: {
    backgroundColor: $BLUE,
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: $WHITE
  },
  remindPassword: {
    color: $BLUE,
    textAlign: 'center'
  },
  remindPasswordSmall: {
    color: $BLUE,
    fontSize: 11
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  },
  label: {
    fontSize: 10
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderBottomWidth: 1,
    fontSize: 13
  },
  togglePassword: { position: 'absolute', right: 10, marginTop: 15 }
});

//TODO: refactor into smaller components
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
      <View style={styles.pros}>
        <Pros />
        <Text style={styles.prosTitle}>Добрый вечер</Text>
        <Text style={styles.prosText}>
          Войдите с помощью логина и пароля. Если вы забыли пароль -
          воспользуйтесь формой
        </Text>
        <Text style={styles.remindPasswordSmall}>восстановления пароля</Text>
      </View>
      <View style={styles.form}>
        <React.Fragment>
          <Text style={styles.label}>Имя аккаунта</Text>
          <View>
            <TextInput style={styles.input} placeholder="Введите имя" />
          </View>
        </React.Fragment>
        <React.Fragment>
          <Text style={[styles.label, { marginTop: 30 }]}>Пароль</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Введите пароль"
              secureTextEntry
            />
            <TogglePassword style={styles.togglePassword} />
          </View>
        </React.Fragment>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={authorize}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Войти</Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={styles.remindPassword}>Забыли пароль?</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
