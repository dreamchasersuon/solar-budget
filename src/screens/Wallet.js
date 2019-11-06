/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { $LIGHTSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import OpenOperationModalBtn from '../components/OpenOperationModalBtn';
import TransactionsContainer from '../components/TransactionsContainer';
import TransactionModal from '../components/TransactionModal';
import BillModal from '../components/BillModal';
import { StyleSheet, View } from 'react-native';
import withSideScreen from '../components/SideScreenHOC';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
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
    height: '59%',
    justifyContent: 'flex-start',
    marginTop: 40,
    width: '90%'
  }
});

function Wallet() {
  const [isTransactionModalVisible, makeTransaction] = useState(false);
  const toggleTransactionModal = () =>
    makeTransaction(!isTransactionModalVisible);
  const [isBillModalVisible, makeBill] = useState(false);
  const toggleBillModal = () => makeBill(!isBillModalVisible);

  return (
    <View
      style={
        isBillModalVisible || isTransactionModalVisible
          ? [styles.container, { opacity: 0.8 }]
          : styles.container
      }
    >
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        title="Кошелёк"
        billTitle="Счет"
        hasLeftMenu
        hasBudget
        onPressCreateBill={toggleBillModal}
      />
      <TransactionsContainer containerStyle={styles.transactionsContainer}>
        <Transaction />
      </TransactionsContainer>
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
