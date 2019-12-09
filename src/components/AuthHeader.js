import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $LIGHT_BLUE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  extendedNote: {
    color: $LIGHT_BLUE,
    fontSize: 11
  },
  note: {
    fontSize: 11,
    marginTop: 5,
    opacity: 0.6,
    textAlign: 'center',
    width: 250
  }
});

export default function AuthHeader({
  children,
  title,
  note,
  extendedNote,
  titleStyle,
  handleOnPress
}) {
  return (
    <View style={styles.container}>
      {children}
      <Text style={titleStyle}>{title}</Text>
      {note && <Text style={styles.note}>{note}</Text>}
      {extendedNote && (
        <Text onPress={handleOnPress} style={styles.extendedNote}>
          {extendedNote}
        </Text>
      )}
    </View>
  );
}
