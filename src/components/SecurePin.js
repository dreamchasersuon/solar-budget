/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  marginBottom: {
    marginBottom: 120
  },
  marginTop: {
    marginTop: 30
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10
  },
  titleNoMargin: {
    fontSize: 18,
    fontWeight: '700'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $MEDIUMSILVER
  }
});

export default function SecurePin({ title, noMargins }) {
  return (
    <View
      style={
        noMargins ? styles.container : [styles.container, styles.marginBottom]
      }
    >
      <Text style={noMargins ? styles.titleNoMargin : styles.title}>
        {title}
      </Text>
      <View
        style={
          noMargins
            ? styles.paginationContainer
            : [styles.paginationContainer, styles.marginTop]
        }
      >
        <View style={styles.pagination} />
        <View style={styles.pagination} />
        <View style={styles.pagination} />
        <View style={styles.pagination} />
      </View>
    </View>
  );
}
