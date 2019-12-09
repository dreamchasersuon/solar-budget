/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { $WHITE } from '../../constants/colorLiterals';

const styles = StyleSheet.create({
  text: {
    color: $WHITE
  }
});

export default function ButtonWithFeedbackBlue({
  handleOnPress,
  buttonText,
  buttonStyle
}) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={handleOnPress}
    >
      <View style={buttonStyle}>
        <Text style={styles.text}>{buttonText}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
