import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { $BLUE } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10
  },
  note: {
    textAlign: 'center',
    fontSize: 11,
    width: 250,
    marginTop: 5,
    opacity: 0.6
  },
  extendedNote: {
    color: $BLUE,
    fontSize: 11
  }
});

export default function InfoPost({ children, title, note, extendedNote }) {
  return (
    <View style={styles.container}>
      {children}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.note}>{note}</Text>
      {extendedNote && <Text style={styles.extendedNote}>{extendedNote}</Text>}
    </View>
  );
}
