/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { $BLUE, $WHITE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    backgroundColor: $BLUE,
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: $WHITE
  }
});

export default function MajorBlueButton({ handleOnPress, buttonText }) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={handleOnPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{buttonText}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}