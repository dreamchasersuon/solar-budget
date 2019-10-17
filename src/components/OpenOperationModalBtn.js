/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { $WHITE, $BLUE } from '../constants/colorLiterals';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    elevation: 8,
    borderRadius: 50,
    backgroundColor: $WHITE,
    marginTop: 10
  },
  touchableArea: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 35
  }
});

export default function OpenOperationModalBtn() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableArea}>
        <Ionicons name="ios-add" color={$BLUE} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
