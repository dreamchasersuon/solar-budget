import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationService from '../navigation/service';
import MajorBlueButton from '../components/MajorBlueButton';
import Slider from '../components/Slider';

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
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 100,
    width: '100%'
  }
});

export default function Welcome() {
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>RU</Text>
      </View>
      <Slider />
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={goTo('Creation')}
          buttonText="Создать аккаунт"
        />
        <MajorBlueButton handleOnPress={goTo('LoginPin')} buttonText="Войти" />
      </View>
    </View>
  );
}
