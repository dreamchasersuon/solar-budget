/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  $BRANDY_PUNCH,
  $LIGHTSILVER,
  $MEDIUMSILVER,
  $RED,
  $WHITE
} from '../constants/colorLiterals';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setBillActive } from '../redux/features/billFeatureSlice';
import MoneyFlow from '../components/MoneyFlow';
import { VictoryPie } from 'victory-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    width: '100%'
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: 160
  },
  clearHistory: {
    textAlign: 'center',
    width: 250,
    marginTop: '50%',
    color: $MEDIUMSILVER,
    fontSize: 14
  }
});

export default function Statistics() {
  const dispatch = useDispatch();

  const transactions = useSelector(state => state.wallet);
  const user = useSelector(state => state.user.find(user => user.active));
  const billState = useSelector(state => state.bill);
  const bills = billState.filter(bill => bill.userId === user.id);
  const purposes = useSelector(state => state.purposes);

  const { t, i18n } = useTranslation('StatsScreen');
  const language = user.locale;

  const [isVisibleIncomeMoneyFlow, toggleIncomeMoneyFlowVisibility] = useState(
    false
  );
  const [
    isVisibleOutcomeMoneyFlow,
    toggleOutcomeMoneyFlowVisibility
  ] = useState(false);

  const [selectedTypeOfTransactions, changeTypeOfTransactions] = useState(
    'outcome'
  );

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

  const selectBill = id => {
    dispatch(setBillActive({ id, userId: user.id }));
  };

  const filteredTransactionsByType = [];
  const purposesColors = [];
  if (activeBillTransactions.length) {
    activeBillTransactions.forEach(transaction => {
      if (transaction.type === selectedTypeOfTransactions) {
        const transactionToPieDiagram = {
          y: transaction.amount
        };
        filteredTransactionsByType.push(transactionToPieDiagram);
        purposesColors.push(purposes[transaction.purpose].color);
      }
    });
  }
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        blueBackgroundStyle
        title={t('screenName')}
        hasBudget
        periodOfTime={'Ноябрь'}
        hasCalendar
        handleOnPress={selectBill}
        list={bills}
        deposit={activeBillDeposit}
      />
      {activeBillTransactions.length ? (
        <VictoryPie
          data={[...filteredTransactionsByType]}
          colorScale={purposesColors.reverse()}
          height={300}
          innerRadius={50}
          style={{ labels: { fill: $WHITE } }}
        />
      ) : null}
      {activeBillTransactions.length ? (
        <React.Fragment>
          <MoneyFlow
            hasTransactions={isVisibleOutcomeMoneyFlow}
            transactions={activeBillTransactions}
            typeOfTransactions={'outcome'}
            language={language}
            purposes={purposes}
            handleOnPressToggleTransactions={() =>
              toggleOutcomeMoneyFlowVisibility(!isVisibleOutcomeMoneyFlow)
            }
            headerTitle={t('outcome')}
            averageTitle={t('average')}
            totalTitle={t('total')}
            noTransactionsNote={t('noOutcomeTransactions')}
          />
          <MoneyFlow
            hasTransactions={isVisibleIncomeMoneyFlow}
            typeOfTransactions={'income'}
            transactions={activeBillTransactions}
            language={language}
            purposes={purposes}
            handleOnPressToggleTransactions={() =>
              toggleIncomeMoneyFlowVisibility(!isVisibleIncomeMoneyFlow)
            }
            headerTitle={t('income')}
            averageTitle={t('average')}
            totalTitle={t('total')}
            noTransactionsNote={t('noIncomeTransactions')}
          />
        </React.Fragment>
      ) : (
        <Text style={styles.clearHistory}>{t('noteAboutTransactions')}</Text>
      )}
    </View>
  );
}
