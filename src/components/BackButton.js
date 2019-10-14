/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavigationService from '../navigation/service';

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 16
  }
});

export default function BackButton() {
  const goBack = () => NavigationService.goBack();
  return (
    <Ionicons name="arrow-left" style={styles.iconStyle} onPress={goBack} />
  );
}
