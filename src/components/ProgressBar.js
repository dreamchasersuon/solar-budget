import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { $BLUE, $GREEN, $SILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  amount: {
    color: $GREEN,
    fontSize: 22
  },
  amountContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  currency: {
    color: $SILVER,
    fontSize: 20
  },
  svgContainer: {
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    marginTop: -10,
    width: 320
  }
});

export default function ProgressBar({
  circleTitle,
  isTargetCircle,
  circleTitleStyle
}) {
  return (
    <View style={styles.svgContainer}>
      <Svg height="55%" width="55%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={$BLUE}
          strokeWidth="2.5"
          fill="transparent"
        />
        <Text style={circleTitleStyle}>{circleTitle}</Text>
      </Svg>
      {isTargetCircle && (
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>{'Р '}</Text>
          <Text style={styles.amount}>1200</Text>
        </View>
      )}
    </View>
  );
}
