/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Ruble from '../../assets/ruble.svg';

export default function BlueButton({
  buttonStyle,
  iconStyle,
  title,
  buttonTextStyle
}) {
  return (
    <TouchableOpacity style={buttonStyle}>
      <View style={iconStyle}>
        <Ruble />
      </View>
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

BlueButton.propTypes = {
  title: PropTypes.string,
  iconStyle: PropTypes.object,
  buttonStyle: PropTypes.object || PropTypes.array,
  buttonTextStyle: PropTypes.object
};
