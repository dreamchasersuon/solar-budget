/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import RateInfo from '../../assets/rate_info.svg';
import { $BLUE } from '../constants/colorLiterals';
import SelectedRatePair from '../../assets/selected_rate-pair.svg';
import UnselectedRatePair from '../../assets/unselected_rate-pair.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addRate, removeRate } from '../redux/features/rateFeatureSlice';

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
export default function ModalRatePair({
  title,
  ratePercent,
  rateValue,
  rateNote
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const rate = useSelector(state => state.rate);
  const currentRate = rate.find(rate => rate.pair === title);

  const onSelectRatePair = () => {
    let select;

    if (!currentRate) {
      select = true;
    } else {
      select = !currentRate.selected;
    }

    !select
      ? dispatch(removeRate({ pair: title }))
      : dispatch(
          addRate({
            userId: user.id,
            pair: title,
            percent: ratePercent,
            value: rateValue,
            note: rateNote,
            selected: select
          })
        );
  };

  const renderSelectButton = () => {
    if (currentRate === undefined) {
      return <UnselectedRatePair />;
    }
    return currentRate ? <SelectedRatePair /> : <UnselectedRatePair />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <RateInfo />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple($BLUE, true)}
        onPress={onSelectRatePair}
      >
        <View style={styles.button}>{renderSelectButton()}</View>
      </TouchableNativeFeedback>
    </View>
  );
}
