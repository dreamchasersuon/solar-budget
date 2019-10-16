/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { $BLUE, $LIGHTSILVER, $WHITE } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import MakeTransactionButton from '../components/MakeTransactionButton';
import TransactionsContainer from '../components/TransactionsContainer';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER
  },
  transactionsContainer: {
    width: '90%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '62%'
  },
  buttonStyle: {
    backgroundColor: $BLUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 4,
    width: 100,
    height: 26
  },
  buttonTextStyle: {
    color: $WHITE
  },
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 135,
    justifyContent: 'space-between'
  }
});

export default function Wallet() {
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        title="Кошелёк"
        hasLeftMenu
      />
      <TransactionsContainer containerStyle={styles.transactionsContainer}>
        <Transaction />
      </TransactionsContainer>
      <MakeTransactionButton />
    </View>
  );
}
