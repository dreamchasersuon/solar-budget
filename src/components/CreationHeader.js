/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ArrowLeft from '../../assets/left-arrow.svg';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 50
  },
  headerText: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '500'
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
