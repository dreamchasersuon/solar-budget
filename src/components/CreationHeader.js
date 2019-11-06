/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ArrowLeft from '../../assets/left-arrow.svg';

const styles = StyleSheet.create({
  backArrow: {
    marginLeft: 20
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20
  }
});

export default function CreationHeader({ goBack }) {
  return (
    <View style={styles.header}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} />
      <Text style={styles.headerText}>Новый аккаунт</Text>
    </View>
  );
}
