/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { $BLUE, $WHITE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    color: $WHITE
  }
});

export default function ButtonWithFeedbackBlue({ handleOnPress, buttonText }) {
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
