/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import RateInfo from '../../assets/rate_info.svg';
import { $BLUE } from '../constants/colorLiterals';
import SelectedRatePair from '../../assets/selected_rate-pair.svg';
import UnselectedRatePair from '../../assets/unselected_rate-pair.svg';

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
  const [isSelected, selectPair] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <RateInfo />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple($BLUE, true)}
        onPress={() => selectPair(!isSelected)}
      >
        <View style={styles.button}>
          {isSelected ? <SelectedRatePair /> : <UnselectedRatePair />}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
