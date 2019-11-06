/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { $BLUE, $GREEN, $RED } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  operationSaldoCredit: {
    color: $RED,
    fontSize: 22
  },
  operationSaldoDebit: {
    color: $GREEN,
    fontSize: 22
  },
  operationsSaldo: {
    color: $BLUE,
    fontSize: 22
  },
  saldoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 60,
    paddingRight: 60,
    width: '100%'
  }
});

export default function Saldo({ saldo, creditAmount, debitAmount }) {
  return (
    <View style={styles.saldoContainer}>
      <Text style={styles.operationSaldoDebit}>{debitAmount}</Text>
      <Text style={styles.operationsSaldo}>{saldo}</Text>
      <Text style={styles.operationSaldoCredit}>{creditAmount}</Text>
    </View>
  );
}
