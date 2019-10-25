/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  note: {
    fontSize: 12,
    color: $MEDIUMSILVER
  },
  buttonText: {
    color: $BLUE,
    textAlign: 'center',
    fontSize: 12
  },
  marginLeft: {
    marginLeft: 5
  }
});

export default function SecondaryButton({
  hasNote,
  handleOnPress,
  buttonText,
  noteText
}) {
  return (
    <View style={styles.container}>
      {hasNote && <Text style={styles.note}>{noteText}</Text>}
      <TouchableOpacity onPress={handleOnPress}>
        <Text
          style={
            hasNote ? [styles.buttonText, styles.marginLeft] : styles.buttonText
          }
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
