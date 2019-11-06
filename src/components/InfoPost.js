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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    maxWidth: 220,
    textAlign: 'center'
  }
});

export default function InfoPost({ children, title, note, extendedNote }) {
  return (
    <View style={styles.container}>
      {children}
      <Text style={styles.title}>{title}</Text>
      {note && <Text style={styles.note}>{note}</Text>}
      {extendedNote && <Text style={styles.extendedNote}>{extendedNote}</Text>}
    </View>
  );
}
