import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $BLUE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  extendedNote: {
    color: $BLUE,
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

export default function InfoPost({
  children,
  title,
  note,
  extendedNote,
  titleStyle
}) {
  return (
    <View style={styles.container}>
      {children}
      <Text style={titleStyle}>{title}</Text>
      {note && <Text style={styles.note}>{note}</Text>}
      {extendedNote && <Text style={styles.extendedNote}>{extendedNote}</Text>}
    </View>
  );
}
