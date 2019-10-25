/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';
import { $BLUE } from '../constants/colorLiterals';
import Delete from '../../assets/big-delete.svg';
import Fingerprint from '../../assets/small-fingerprint.svg';

const styles = StyleSheet.create({
  numberStyle: {
    fontSize: 40
  }
});

export default function NumericUnit({
  containerStyle,
  number,
  iconDelete,
  iconFingerprint,
  onPress
}) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple($BLUE, true)}
      onPress={onPress || null}
    >
      <View style={containerStyle}>
        {iconDelete && <Delete />}
        {iconFingerprint && <Fingerprint />}
        {number && <Text style={styles.numberStyle}>{number}</Text>}
      </View>
    </TouchableNativeFeedback>
  );
}
