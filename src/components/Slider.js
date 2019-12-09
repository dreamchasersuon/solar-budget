/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pros from '../../assets/pros.svg';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
import { $LIGHT_BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  aboutContainer: {
    alignItems: 'center',
    maxHeight: 220
  },
  bold: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center'
  },
  slideContainer: {
    alignItems: 'center'
  },
  slideNote: {
    fontSize: 11,
    marginTop: 5,
    opacity: 0.6,
    textAlign: 'center',
    width: 250
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center'
  }
});

export default function Slider() {
  const { t, i18n } = useTranslation('SliderComponent');
  return (
    <Swiper
      width={400}
      loop
      bounces
      containerStyle={styles.aboutContainer}
      dotColor={$MEDIUMSILVER}
      activeDotColor={$LIGHT_BLUE}
    >
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>{t('firstSlideHeaderTitle')}</Text>
        <Text style={styles.slideNote}>{t('firstSlideNote')}</Text>
      </View>
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>{t('secondSlideHeaderTitle')}</Text>
        <Text style={styles.slideNote}>{t('secondSlideNote')}</Text>
      </View>
      <View style={styles.slideContainer}>
        <Pros />
        <Text style={styles.slideTitle}>{t('thirdSlideHeaderTitle')}</Text>
        <Text style={styles.slideNote}>{t('thirdSlideNote')}</Text>
        <Text style={styles.bold}>Solar Budget</Text>
      </View>
    </Swiper>
  );
}
