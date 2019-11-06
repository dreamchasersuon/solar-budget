'use strict';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationService from '../navigation/service';
import MajorBlueButton from '../components/MajorBlueButton';
import Slider from '../components/Slider';

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 30,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    width: '100%'
  },
  language: {
    fontSize: 16,
    marginRight: 30
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
