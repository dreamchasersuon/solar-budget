/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View } from 'react-native';
import CloseModalButton from './CloseModalButton';

export default function ModalHeader({
  containerStyle,
  title,
  titleStyle,
  handleOnClose,
  closeModalStyle
}) {
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <CloseModalButton
        handleOnPress={handleOnClose}
        buttonStyle={closeModalStyle}
      />
    </View>
  );
}
