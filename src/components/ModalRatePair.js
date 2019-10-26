/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import RateInfo from '../../assets/rate_info.svg';
import { $BLUE } from '../constants/colorLiterals';
import SelectRatePair from '../../assets/select_rate-pair.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 23,
    paddingLeft: 30,
    marginTop: 20
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 14, marginLeft: 10 },
  button: {
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default function ModalRatePair({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <RateInfo />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple($BLUE, true)}
      >
        <View style={styles.button}>
          <SelectRatePair />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
