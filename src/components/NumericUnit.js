/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';
import { $BLUE } from '../constants/colorLiterals';
import BigDelete from '../../assets/big-delete.svg';
import SmallDelete from '../../assets/delete.svg';
import Fingerprint from '../../assets/small-fingerprint.svg';

export default function NumericUnit({
  containerStyle,
  numberStyle,
  number,
  iconDelete,
  iconFingerprint,
  onPress,
  bigDelete
}) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple($BLUE, true)}
      onPress={onPress || null}
    >
      <View style={containerStyle}>
        {iconDelete && bigDelete && <BigDelete />}
        {iconDelete && !bigDelete && <SmallDelete />}
        {iconFingerprint && <Fingerprint />}
        {number && <Text style={numberStyle}>{number}</Text>}
      </View>
    </TouchableNativeFeedback>
  );
}
