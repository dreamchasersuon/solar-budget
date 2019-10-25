/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 120
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginTop: 30
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $MEDIUMSILVER
  }
});

export default function SecurePin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтвердите PIN-CODE</Text>
      <View style={styles.paginationContainer}>
        <View style={styles.pagination} />
        <View style={styles.pagination} />
        <View style={styles.pagination} />
        <View style={styles.pagination} />
      </View>
    </View>
  );
}
