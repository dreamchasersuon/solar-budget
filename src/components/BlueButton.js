/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BlueButton({
  buttonStyle,
  iconStyle,
  title,
  buttonTextStyle
}) {
  return (
    <TouchableOpacity style={buttonStyle}>
      <Ionicons name="ios-heart" style={iconStyle} />
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
