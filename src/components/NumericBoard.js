/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  hasDelete,
  hasFingerprint,
  needNullAlignment,
  onPressNumber
}) {
  return (
    <View style={styles.wrapper}>
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('1')}
        number="1"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('2')}
        number="2"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('3')}
        number="3"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('4')}
        number="4"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('5')}
        number="5"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('7')}
        number="6"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('7')}
        number="7"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('8')}
        number="8"
      />
      <NumericUnit
        containerStyle={styles.container}
        onPress={onPressNumber('9')}
        number="9"
      />
      {hasFingerprint && (
        <NumericUnit containerStyle={styles.container} iconFingerprint />
      )}
      <NumericUnit
        containerStyle={
          needNullAlignment ? styles.containerWithMargin : styles.container
        }
        number="0"
        onPress={onPressNumber('0')}
      />
      {hasDelete && (
        <NumericUnit
          containerStyle={styles.container}
          iconDelete
          onPress={onPressNumber('delete')}
        />
      )}
    </View>
  );
}
