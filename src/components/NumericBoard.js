/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import NumericUnit from './NumericUnit';

export default function NumericBoard({
  wrapperStyle,
  containerStyle,
  containerWithMarginStyle,
  numberStyle,
  hasDelete,
  bigDelete,
  hasFingerprint,
  needNullAlignment,
  onPressNumber,
  onPressFingerprint,
  deleteColor
}) {
  return (
    <View style={wrapperStyle}>
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('1')}
        number="1"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('2')}
        number="2"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('3')}
        number="3"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('4')}
        number="4"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('5')}
        number="5"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('6')}
        number="6"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('7')}
        number="7"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('8')}
        number="8"
      />
      <NumericUnit
        containerStyle={containerStyle}
        numberStyle={numberStyle}
        onPress={onPressNumber('9')}
        number="9"
      />
      {hasFingerprint && (
        <NumericUnit
          containerStyle={containerStyle}
          onPress={onPressFingerprint}
          iconFingerprint
        />
      )}
      <NumericUnit
        containerStyle={
          needNullAlignment ? containerWithMarginStyle : containerStyle
        }
        number="0"
        numberStyle={numberStyle}
        onPress={onPressNumber('0')}
      />
      {hasDelete && (
        <NumericUnit
          containerStyle={containerStyle}
          iconDelete
          bigDelete={bigDelete}
          onPress={onPressNumber('delete')}
          deleteColor={deleteColor}
        />
      )}
    </View>
  );
}
