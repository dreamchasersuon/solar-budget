/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Ruble from '../../../assets/ruble.svg';
import RubleBlue from '../../../assets/rubleBlue.svg';

export default function ButtonMainBlue({
  buttonStyle,
  iconStyle,
  title,
  buttonTextStyle,
  icon,
  handleOnPress,
  isBlue,
  iconColor
}) {
  return (
    <TouchableOpacity onPress={handleOnPress} style={buttonStyle}>
      <View style={iconStyle}>
        {icon && !isBlue && <Ruble />}
        {icon && isBlue && <RubleBlue fill={iconColor} />}
      </View>
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
