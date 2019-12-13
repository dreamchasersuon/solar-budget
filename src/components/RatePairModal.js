/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import RateInfo from '../../assets/rate_info.svg';
import mapColorsToTheme from '../constants/colorLiterals';
import SelectedRatePair from '../../assets/selected_rate-pair.svg';
import UnselectedRatePair from '../../assets/unselected_rate-pair.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addRate, removeRate } from '../redux/features/rateFeatureSlice';
import uuid from 'uuid';

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
export default function RatePairModal({
  title,
  ratePercent,
  rateValue,
  rateNote
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const rateState = useSelector(state => state.rate);
  const { text_main, accent } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    textColorMain: {
      color: text_main
    }
  });

  function onSelectRatePair() {
    if (rateState.length) {
      if (
        rateState.find(rate => rate.pair === title && rate.userId === user.id)
      ) {
        return dispatch(removeRate({ pair: title, userId: user.id }));
      }
    }
    dispatch(
      addRate({
        id: uuid(title),
        userId: user.id,
        pair: title,
        percent: ratePercent,
        value: rateValue,
        note: rateNote
      })
    );
  }

  function renderSelectButton() {
    return rateState.find(
      rate => rate.pair === title && rate.userId === user.id
    ) ? (
      <SelectedRatePair />
    ) : (
      <UnselectedRatePair />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <RateInfo />
        <Text style={[styles.title, themeStyles.textColorMain]}>{title}</Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(accent, true)}
        onPress={onSelectRatePair}
      >
        <View style={styles.button}>{renderSelectButton()}</View>
      </TouchableNativeFeedback>
    </View>
  );
}
