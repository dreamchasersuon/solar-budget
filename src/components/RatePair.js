import React from 'react';
import mapColorsToTheme, { $SILVER, $WHITE } from '../constants/colorLiterals';
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
    width: '100%',
    marginBottom: 20
  },
  content: {
    flexDirection: 'row',
    height: '60%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 10,
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

export default function RatePair({
  ratePair,
  ratePercent,
  rate,
  rateNote,
  theme
}) {
  const { background_top, text_main, accent } = mapColorsToTheme(theme);
  const themeStyles = StyleSheet.create({
    background: {
      backgroundColor: background_top
    },
    textMain: {
      color: text_main
    }
  });
  return (
    <View style={styles.rateWrapper}>
      <TouchableOpacity style={[styles.container, themeStyles.background]}>
        <Rate fill={accent} />
        <View style={styles.content}>
          <View style={styles.ratePercent}>
            <Text style={[styles.ratePair, themeStyles.textMain]}>
              {ratePair}
            </Text>
            <Text style={[styles.ratePercentage, themeStyles.textMain]}>
              {ratePercent}
            </Text>
          </View>
          <View style={styles.ratePrice}>
            <Text style={styles.rateNationalCurrencyValue}>{rate}</Text>
            <Text style={styles.rateNationalCurrency}>{rateNote}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
