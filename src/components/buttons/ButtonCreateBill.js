/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import mapColorsToTheme, {
  $WHITE,
  $LIGHT_BLUE
} from '../../constants/colorLiterals';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  buttonCreateBill: {
    alignItems: 'center',
    backgroundColor: $LIGHT_BLUE,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 26,
    marginLeft: 10,
    justifyContent: 'center',
    width: 40
  },
  createBillText: {
    color: $WHITE,
    fontSize: 20
  }
});

export default function ButtonCreateBill({ onPressCreateBill, theme }) {
  const { accent } = mapColorsToTheme(theme);
  const themeStyles = StyleSheet.create({
    backgroundAccent: {
      backgroundColor: accent
    }
  });
  return (
    <TouchableOpacity
      style={[styles.buttonCreateBill, themeStyles.backgroundAccent]}
      onPress={onPressCreateBill}
    >
      <Ionicons name="ios-add" style={styles.createBillText} />
    </TouchableOpacity>
  );
}
