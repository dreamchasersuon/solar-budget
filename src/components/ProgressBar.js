import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { $BLUE, $GREEN, $SILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 320,
    height: 300
  },
  amount: {
    color: $GREEN,
    fontSize: 22
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currency: {
    color: $SILVER,
    fontSize: 20
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
