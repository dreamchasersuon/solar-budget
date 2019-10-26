/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pros from '../../assets/pros.svg';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  aboutContainer: {
    alignItems: 'center',
    maxHeight: 220
  },
  slideContainer: {
    alignItems: 'center'
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10
  },
  slideNote: {
    textAlign: 'center',
    fontSize: 11,
    width: 250,
    marginTop: 5,
    opacity: 0.6
  },
  bold: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700'
  }
});

export default function Slider() {
  return (
    <Swiper
      width={400}
      loop
      bounces
      containerStyle={styles.aboutContainer}
      dotColor={$MEDIUMSILVER}
      activeDotColor={$BLUE}
    >
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>Анализируйте статистику</Text>
        <Text style={styles.slideNote}>
          Получайте точные статистические данные по вашему бюджету в реальном
          времени
        </Text>
      </View>
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>Следите за своими операциями</Text>
        <Text style={styles.slideNote}>
          Контроль за приходом и расходом средств полностью в ваших руках
        </Text>
      </View>
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>Контролируйте свои финансы</Text>
        <Text style={styles.slideNote}>
          Ведите учет своих финансов. Научитесь сберегать свои деньги вместе с
        </Text>
        <Text style={styles.bold}>Solar Budget</Text>
      </View>
    </Swiper>
  );
}
