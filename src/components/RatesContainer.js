import React from 'react';
import { View } from 'react-native';

export default function RatesContainer({ containerStyle, children }) {
  return <View style={containerStyle}>{children}</View>;
}
