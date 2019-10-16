/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import NavigationService from '../navigation/service';

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 26,
    marginLeft: 10
  }
});

export default function BackButton() {
  const goBack = () => NavigationService.goBack();
  return (
    <Icon name="arrow-round-back" style={styles.iconStyle} onPress={goBack} />
  );
}
