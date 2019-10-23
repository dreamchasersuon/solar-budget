import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput
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
    alignItems: 'center',
    width: '100%',
    marginTop: 50
  },
  headerText: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '500'
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
    marginBottom: 30,
    height: 90,
    width: '100%'
  },
  button: {
    backgroundColor: $BLUE,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: $WHITE
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
  togglePassword: { position: 'absolute', right: 10, marginTop: 15 },
  youRegistered: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  youRegisteredText: {
    fontSize: 12,
    color: $MEDIUMSILVER
  },
  remindPassword: {
    color: $BLUE,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 5
  }
});

//TODO: refactor into smaller components
export default function Creation() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
        <Text style={styles.headerText}>Новый аккаунт</Text>
      </View>
      <View style={styles.pros}>
        <Pros />
        <Text style={styles.prosTitle}>Анонимность</Text>
        <Text style={styles.prosText}>
          Только вы можете просматривать свои данные. Никакой привязки к соц.
          сетям и сквозной аналитики
        </Text>
      </View>
      <View style={styles.form}>
        <React.Fragment>
          <Text style={styles.label}>Имя аккаунта</Text>
          <TextInput style={styles.input} placeholder="Введите имя" />
        </React.Fragment>
        <React.Fragment>
          <Text style={[styles.label, { marginTop: 30 }]}>Пароль</Text>
          <View>
            <TextInput style={styles.input} placeholder="Создайте пароль" />
            <TogglePassword style={styles.togglePassword} />
          </View>
        </React.Fragment>
        <React.Fragment>
          <Text style={[styles.label, { marginTop: 30 }]}>Подтверждение</Text>
          <View>
            <TextInput style={styles.input} placeholder="Подтвердите пароль" />
            <TogglePassword style={styles.togglePassword} />
          </View>
        </React.Fragment>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Создать</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.youRegistered}>
          <Text style={styles.youRegisteredText}>Уже зарегистрированы?</Text>
          <TouchableOpacity onPress={goTo('LoginCredentials')}>
            <Text style={styles.remindPassword}>ВОЙТИ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
