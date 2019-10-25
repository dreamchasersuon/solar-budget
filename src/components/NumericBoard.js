/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';
import { $BLUE } from '../constants/colorLiterals';
import Delete from '../../assets/big-delete.svg';
import NumericUnit from './NumericUnit';

const styles = StyleSheet.create({
  wrapper: {
    width: 240,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  container: {
    borderRadius: 50,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerWithMargin: {
    borderRadius: 50,
    width: 65,
    height: 65,
    marginLeft: 88,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function NumericBoard({
  onPressDevNavigation,
  onPressDevNavGoBack,
  hasDelete,
  hasFingerprint,
  needNullAlignment
}) {
  return (
    <View style={styles.wrapper}>
      <NumericUnit containerStyle={styles.container} number="1" />
      <NumericUnit containerStyle={styles.container} number="2" />
      <NumericUnit containerStyle={styles.container} number="3" />
      <NumericUnit containerStyle={styles.container} number="4" />
      <NumericUnit containerStyle={styles.container} number="5" />
      <NumericUnit containerStyle={styles.container} number="6" />
      <NumericUnit containerStyle={styles.container} number="7" />
      <NumericUnit containerStyle={styles.container} number="8" />
      <NumericUnit containerStyle={styles.container} number="9" />
      <NumericUnit
        containerStyle={
          needNullAlignment ? styles.containerWithMargin : styles.container
        }
        number="0"
        onPress={onPressDevNavigation}
      />
      {hasDelete && (
        <NumericUnit
          containerStyle={styles.container}
          iconDelete
          onPress={onPressDevNavGoBack}
        />
      )}
      {hasFingerprint && (
        <NumericUnit containerStyle={styles.container} iconFingerprint />
      )}
    </View>
  );
}
