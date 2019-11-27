/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import NavigationService from '../navigation/service';
import { $WHITE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 26,
    marginLeft: 10
  },
  iconStyleWhite: {
    fontSize: 26,
    marginLeft: 10,
    color: $WHITE
  }
});

export default function NavigationBackArrow({ white }) {
  const goBack = () => NavigationService.goBack();
  return (
    <Icon
      name="arrow-round-back"
      style={white ? styles.iconStyleWhite : styles.iconStyle}
      onPress={goBack}
    />
  );
}
