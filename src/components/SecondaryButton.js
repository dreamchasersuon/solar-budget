/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  note: {
    fontSize: 12,
    color: $MEDIUMSILVER
  }
});

export default function SecondaryButton({
  hasNote,
  handleOnPress,
  buttonText,
  noteText,
  buttonTextStyle,
  buttonStyle
}) {
  return (
    <View style={styles.container}>
      {hasNote && <Text style={styles.note}>{noteText}</Text>}
      <TouchableOpacity style={buttonStyle} onPress={handleOnPress}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
