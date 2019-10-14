import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function TransactionsContainer({
  containerStyle,
  titleStyle,
  children,
  hasTitle,
  title
}) {
  return (
    <View style={containerStyle}>
      {hasTitle && <Text style={titleStyle}>{title}</Text>}
      {children}
    </View>
  );
}