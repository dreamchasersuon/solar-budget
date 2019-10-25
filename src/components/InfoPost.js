import React from 'react';
import Pros from '../../assets/pros.svg';
import { View, StyleSheet, Text } from 'react-native';

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
  }
});

export default function InfoPost() {
  return (
    <View style={styles.container}>
      <Pros />
      <Text style={styles.title}>Анонимность</Text>
      <Text style={styles.note}>
        Только вы можете просматривать свои данные. Никакой привязки к соц.
        сетям и сквозной аналитики
      </Text>
    </View>
  );
}
