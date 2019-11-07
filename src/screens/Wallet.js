/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { $BLUE, $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import OpenOperationModalBtn from '../components/OpenOperationModalBtn';
import TransactionModal from '../components/TransactionModal';
import BillModal from '../components/BillModal';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import withSideScreen from '../components/SideScreenHOC';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    width: '100%',
    ...StyleSheet.absoluteFillObject,
    elevation: 8
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 125
  },
  transactionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '85%',
    justifyContent: 'flex-start',
    marginTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: 358
  },
  clearHistory: {
    textAlign: 'center',
    marginTop: 'auto',
    width: 250,
    marginBottom: 'auto',
    color: $MEDIUMSILVER,
    fontSize: 14
  }
});

function Wallet() {
  const walletTransactions = useSelector(state => state.wallet);
  const [isTransactionModalVisible, makeTransaction] = useState(false);
  const toggleTransactionModal = () =>
    makeTransaction(!isTransactionModalVisible);
  const [isBillModalVisible, makeBill] = useState(false);
  const toggleBillModal = () => makeBill(!isBillModalVisible);

  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        title="Кошелёк"
        billTitle="Счет"
        hasLeftMenu
        hasBudget
        onPressCreateBill={toggleBillModal}
      />
      {walletTransactions.length ? (
        <FlatList
          data={walletTransactions}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => (
            <Transaction
              purpose={item.purpose}
              about={item.description}
              amount={item.amount}
              date={item.date}
              time={item.time}
              type={item.type}
            />
          )}
          keyExtractor={transaction => transaction.time}
        />
      ) : (
        <Text style={styles.clearHistory}>
          Платежная история чиста. Чтобы добавить платеж - нажмите на кнопку
          снизу.
        </Text>
      )}
      <OpenOperationModalBtn expandModal={toggleTransactionModal} />

      <TransactionModal
        isVisible={isTransactionModalVisible}
        toggleTransactionModal={toggleTransactionModal}
      />
      <BillModal
        isVisible={isBillModalVisible}
        toggleBillModal={toggleBillModal}
      />
    </View>
  );
}

export default withSideScreen(Wallet);
