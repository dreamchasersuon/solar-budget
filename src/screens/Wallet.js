/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import OpenOperationModalBtn from '../components/OpenOperationModalBtn';
import TransactionModal from '../components/TransactionModal';
import BillModal from '../components/BillModal';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import withSideScreen from '../components/SideScreenHOC';
import { useDispatch, useSelector } from 'react-redux';
import { setBillActive } from '../redux/features/billFeatureSlice';

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
    justifyContent: 'flex-start',
    marginTop: 40,
    paddingTop: 5,
    paddingBottom: 60,
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
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.wallet);
  const user = useSelector(state => state.user.find(user => user.active));
  const billState = useSelector(state => state.bill);
  const bills = billState.filter(bill => bill.userId === user.id);

  let activeBill;
  let activeBillDeposit;

  if (bills.length) {
    activeBill = bills.find(bill => bill.active);
    activeBillDeposit = activeBill.depositAmount;
  } else {
    activeBillDeposit = '0';
  }

  let activeBillId;
  let activeBillTransactions = [];
  if (bills.length) {
    activeBillId = activeBill.id;
    activeBillTransactions = transactions.filter(
      transaction => transaction.billId === activeBillId
    );
  }

  const [isTransactionModalVisible, makeTransaction] = useState(false);
  const toggleTransactionModal = () =>
    makeTransaction(!isTransactionModalVisible);
  const [isBillModalVisible, makeBill] = useState(false);
  const toggleBillModal = () => makeBill(!isBillModalVisible);

  const selectBill = id => {
    dispatch(setBillActive({ id }));
  };
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        title="Кошелёк"
        hasLeftMenu
        hasBudget
        toggleModal={toggleBillModal}
        handleOnPress={selectBill}
        list={bills}
        deposit={activeBillDeposit}
      />
      {bills.length === 0 && (
        <Text style={styles.clearHistory}>
          Для использования кошелька создайте счет с помощью кнопки с плюсом в
          правом верхнем углу
        </Text>
      )}
      {bills.length > 0 && !activeBillTransactions.length && (
        <Text style={styles.clearHistory}>
          Платежная история чиста. Чтобы добавить платеж - нажмите на кнопку
          снизу.
        </Text>
      )}
      {bills.length > 0 && activeBillTransactions.length ? (
        <FlatList
          data={activeBillTransactions}
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
          keyExtractor={item => item.id}
        />
      ) : null}
      <OpenOperationModalBtn
        isActive={!!bills.length}
        expandModal={toggleTransactionModal}
      />

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
