/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';

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
  },
  paginationActive: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $BLUE
  }
});

export default function SecurePin({ title, noMargins, pinCodeLength }) {
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
        <View
          style={
            pinCodeLength > 0 ? styles.paginationActive : styles.pagination
          }
        />
        <View
          style={
            pinCodeLength > 1 ? styles.paginationActive : styles.pagination
          }
        />
        <View
          style={
            pinCodeLength > 2 ? styles.paginationActive : styles.pagination
          }
        />
        <View
          style={
            pinCodeLength > 3 ? styles.paginationActive : styles.pagination
          }
        />
      </View>
    </View>
  );
}
