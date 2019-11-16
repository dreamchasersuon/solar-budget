/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { $WHITE, $BLUE } from '../constants/colorLiterals';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  buttonCreateBill: {
    alignItems: 'center',
    backgroundColor: $BLUE,
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

export default function ButtonCreateBill({ onPressCreateBill }) {
  return (
    <TouchableOpacity
      style={styles.buttonCreateBill}
      onPress={onPressCreateBill}
    >
      <Ionicons name="ios-add" style={styles.createBillText} />
    </TouchableOpacity>
  );
}
