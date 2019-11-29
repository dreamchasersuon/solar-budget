/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { $WHITE, $BLUE } from '../../constants/colorLiterals';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: $WHITE,
    borderRadius: 50,
    elevation: 8,
    height: 60,
    width: 60,
    marginBottom: 10,
    ...StyleSheet.absoluteFillObject,
    left: 'auto',
    right: 'auto',
    top: '88%'
  },
  icon: {
    fontSize: 35
  },
  touchableArea: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    width: 60
  }
});

export default function ButtonOpenModalRound({
  expandModal,
  isActive,
  hideOrShow
}) {
  console.log(hideOrShow);
  const hideButton = hideOrShow === 'down';
  return (
    <View
      style={
        hideButton
          ? [styles.buttonContainer, { transform: [{ translateY: 120 }] }]
          : styles.buttonContainer
      }
    >
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={isActive ? expandModal : null}
      >
        <Ionicons name="ios-add" color={$BLUE} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
