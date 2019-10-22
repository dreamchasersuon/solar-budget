import React, { useState } from 'react';
import { $SILVER, $WHITE } from '../constants/colorLiterals';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Rate from '../../assets/rate.svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: $WHITE,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingRight: 25,
    paddingLeft: 25
  },
  ratePair: {
    fontSize: 14
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '60%',
    paddingRight: 10,
    paddingLeft: 15
  },
  ratePrice: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  ratePercent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  ratePercentage: {
    fontSize: 12
  },
  rateNationalCurrency: {
    color: $SILVER,
    fontSize: 12
  },
  rateNationalCurrencyValue: {
    color: $SILVER,
    fontSize: 14
  },
  rateWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  rateInfo: {
    backgroundColor: $WHITE,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    width: '104.4%',
    height: 150,
    marginTop: -2
  },
  rateInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '60%',
    paddingRight: 15,
    paddingLeft: 15
  },
  rateInfoTitle: {
    borderTopColor: $SILVER,
    opacity: 5,
    width: '100%',
    borderTopWidth: 0.5
  },
  rateInfoText: {
    fontSize: 10,
    marginTop: 10
  }
});
//TODO: refactor into smaller components
export default function RatePair() {
  const [expanded, expandRateInfo] = useState(false);
  const expandRateCard = () => expandRateInfo(!expanded);
  return (
    <View style={styles.rateWrapper}>
      <TouchableOpacity style={styles.container}>
        <Rate />
        <View style={styles.content}>
          <View style={styles.ratePercent}>
            <Text style={styles.ratePair}>USD/CAN</Text>
            <Text style={styles.ratePercentage}>0.23%</Text>
          </View>
          <View style={styles.ratePrice}>
            <Text style={styles.rateNationalCurrencyValue}>{`1.23`}</Text>
            <Text style={styles.rateNationalCurrency}>{`Цена Can`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.rateInfo}>
          <View style={styles.rateInfoContent}>
            <View style={styles.rateInfoTitle}>
              <Text style={styles.rateInfoText}>
                Динамика курса USD / CAN за последний месяц
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
