import React, { useState } from 'react';
import { $SILVER, $WHITE } from '../constants/colorLiterals';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Rate from '../../assets/rate.svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderRadius: 2,
    elevation: 8,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%'
  },
  content: {
    flexDirection: 'row',
    height: '60%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 10,
    width: '100%'
  },
  rateInfo: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderRadius: 2,
    elevation: 8,
    flexDirection: 'row',
    height: 150,
    justifyContent: 'center',
    marginTop: -2,
    width: '104.4%'
  },
  rateInfoContent: {
    flexDirection: 'row',
    height: '60%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%'
  },
  rateInfoText: {
    fontSize: 10,
    marginTop: 10
  },
  rateInfoTitle: {
    borderTopColor: $SILVER,
    borderTopWidth: 0.5,
    opacity: 5,
    width: '100%'
  },
  rateNationalCurrency: {
    color: $SILVER,
    fontSize: 12
  },
  rateNationalCurrencyValue: {
    color: $SILVER,
    fontSize: 14
  },
  ratePair: {
    fontSize: 14
  },
  ratePercent: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ratePercentage: {
    fontSize: 12
  },
  ratePrice: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rateWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
