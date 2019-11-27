/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import ButtonOpenModalRound from '../components/buttons/ButtonOpenModalRound';
import ModalCreateTransaction from '../components/modals/ModalCreateTransaction';
import ModalCreateBill from '../components/modals/ModalCreateBill';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import withSideScreen from '../components/HOCSideScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setBillActive } from '../redux/features/billFeatureSlice';
import { useTranslation } from 'react-i18next';
import NavigationService from '../navigation/service';

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
    width: 'auto'
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
  const purposes = useSelector(state => state.purposes);

  const { t, i18n } = useTranslation('WalletScreen');
  const language = user.locale;

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
    dispatch(setBillActive({ id, userId: user.id }));
  };
  const goToStats = () => NavigationService.navigate('Statistics');
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        title={t('screenName')}
        hasLeftMenu
        hasBudget
        toggleModal={toggleBillModal}
        handleOnPressDeposit={goToStats}
        handleOnPress={selectBill}
        list={bills}
        deposit={activeBillDeposit}
      />
      {bills.length === 0 && (
        <Text style={styles.clearHistory}>{t('noteToCreateBill')}</Text>
      )}
      {bills.length > 0 && !activeBillTransactions.length && (
        <Text style={styles.clearHistory}>{t('noteAboutTransactions')}</Text>
      )}
      {bills.length > 0 && activeBillTransactions.length ? (
        <FlatList
          data={activeBillTransactions}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => {
            const purposeLabel = purposes[item.purpose][language];
            return (
              <Transaction
                purpose={purposeLabel}
                about={item.description}
                amount={item.amount}
                date={item.date}
                time={item.time}
                type={item.type}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : null}
      <ButtonOpenModalRound
        isActive={!!bills.length}
        expandModal={toggleTransactionModal}
      />

      <ModalCreateTransaction
        isVisible={isTransactionModalVisible}
        toggleTransactionModal={toggleTransactionModal}
      />
      <ModalCreateBill
        isVisible={isBillModalVisible}
        toggleBillModal={toggleBillModal}
      />
    </View>
  );
}

export default withSideScreen(Wallet);
