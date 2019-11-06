/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import RateInfo from '../../assets/rate_info.svg';
import { $BLUE } from '../constants/colorLiterals';
import SelectedRatePair from '../../assets/selected_rate-pair.svg';
import UnselectedRatePair from '../../assets/unselected_rate-pair.svg';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 50,
    height: 25,
    justifyContent: 'center',
    width: 25
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 23,
    width: '100%'
  },
  left: { alignItems: 'center', flexDirection: 'row' },
  title: { fontSize: 14, marginLeft: 10 }
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
