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
  billsAndButtonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  billsContainer: {
    width: '70%',
    marginLeft: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  transactionsContainer: {
    width: '90%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '35%'
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
  icon: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    color: $WHITE
  },
  transactionsContainerTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'normal'
  }
});

export default function Targets() {
  return (
    <View style={styles.container}>
      <Header title="Цели" />
      <TransactionsContainer
        hasTitle
        title="История платежей"
        titleStyle={styles.transactionsContainerTitle}
        containerStyle={styles.transactionsContainer}
      >
        <Transaction />
      </TransactionsContainer>
      <MakeTransactionButton />
    </View>
  );
}
