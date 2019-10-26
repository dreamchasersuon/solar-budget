/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Close from '../../assets/close.svg';

export default function CloseModalButton({ handleOnPress, buttonStyle }) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={handleOnPress}>
      <Close />
    </TouchableOpacity>
  );
}
