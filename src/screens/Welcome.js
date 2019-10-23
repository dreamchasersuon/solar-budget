import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import Pros from '../../assets/pros.svg';
import { $BLUE, $MEDIUMSILVER, $WHITE } from '../constants/colorLiterals';
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
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 50
  },
  language: {
    fontSize: 16,
    marginRight: 30
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 40,
    marginTop: 30
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $MEDIUMSILVER
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 110,
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
  }
});

//TODO: refactor into smaller components
export default function Welcome() {
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>RU</Text>
      </View>
      <View style={styles.pros}>
        <Pros />
        <Text style={styles.prosTitle}>Анализируйте статистику</Text>
        <Text style={styles.prosText}>
          Получайте точные статистические данные по вашему бюджету в реальном
          времени
        </Text>
        <View style={styles.paginationContainer}>
          <View style={styles.pagination} />
          <View style={styles.pagination} />
          <View style={[styles.pagination, { backgroundColor: $BLUE }]} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={goTo('Creation')}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Создать аккаунт</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={goTo('LoginCredentials')}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Войти</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
