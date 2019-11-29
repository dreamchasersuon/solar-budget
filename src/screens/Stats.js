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
  },
  purposesTagsContainer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40
  },
  purposesTags: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    marginRight: 5
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

  const [isVisibleMoneyFlow, toggleMoneyFlowVisibility] = useState(false);

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
  const groupedByPurposeTransactions = [];
  const dataToPieDiagram = [];
  const purposesColors = [];
  let total = 0;
  let average = 0;

  if (activeBillTransactions.length) {
    activeBillTransactions.forEach(transaction => {
      if (transaction.type === selectedTypeOfTransactions) {
        filteredTransactionsByType.push({
          label: transaction.purpose,
          amount: transaction.amount
        });
      }
    });
    filteredTransactionsByType.forEach(transaction => {
      if (!groupedByPurposeTransactions.length) {
        groupedByPurposeTransactions.push({
          label: transaction.label,
          amount: transaction.amount
        });
        return purposesColors.push(purposes[transaction.label].color);
      }
      const isExistInPieDataArray = groupedByPurposeTransactions.find(
        pieTransaction => {
          return pieTransaction.label === transaction.label;
        }
      );

      if (isExistInPieDataArray) {
        groupedByPurposeTransactions.forEach(pieTransaction => {
          if (pieTransaction.label === transaction.label) {
            return (pieTransaction.amount = (
              Number(pieTransaction.amount) + Number(transaction.amount)
            ).toString());
          }
        });
      } else {
        groupedByPurposeTransactions.push({
          label: transaction.label,
          amount: transaction.amount
        });
        purposesColors.push(purposes[transaction.label].color);
      }
    });
    groupedByPurposeTransactions.forEach(transaction => {
      const transactionToPieDiagram = {
        y: transaction.amount
      };
      dataToPieDiagram.push(transactionToPieDiagram);
    });
  }
  if (filteredTransactionsByType.length) {
    total = filteredTransactionsByType.reduce(function(acc, transaction) {
      return acc + Number(transaction.amount);
    }, 0);
    average = total / filteredTransactionsByType.length;
    if (average.toString().length > 4) {
      average = average
        .toString()
        .split('')
        .splice(0, 3)
        .join('');
    }
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
        saldo={1000}
      />
      {activeBillTransactions.length ? (
        <React.Fragment>
          <VictoryPie
            data={dataToPieDiagram}
            colorScale={purposesColors.reverse()}
            height={300}
            innerRadius={50}
            style={{ labels: { fill: $WHITE } }}
          />
          <View style={styles.purposesTagsContainer}>
            {groupedByPurposeTransactions.map(transaction => {
              return (
                <View
                  key={transaction.label}
                  style={[
                    styles.purposesTags,
                    { backgroundColor: purposes[transaction.label].color }
                  ]}
                >
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <Text style={{ color: $WHITE, fontSize: 12 }}>
                    {purposes[transaction.label][language]}
                  </Text>
                </View>
              );
            })}
          </View>
        </React.Fragment>
      ) : null}
      {activeBillTransactions.length ? (
        <MoneyFlow
          hasTransactions={isVisibleMoneyFlow}
          transactions={filteredTransactionsByType}
          language={language}
          purposes={purposes}
          handleOnPressToggleTransactions={() =>
            toggleMoneyFlowVisibility(!isVisibleMoneyFlow)
          }
          headerTitle={
            selectedTypeOfTransactions === 'outcome'
              ? t('outcome')
              : t('income')
          }
          averageTitle={t('average')}
          totalTitle={t('total')}
          noTransactionsNote={
            selectedTypeOfTransactions === 'outcome'
              ? t('noOutcomeTransactions')
              : t('noIncomeTransactions')
          }
          total={total}
          average={average}
        />
      ) : (
        <Text style={styles.clearHistory}>{t('noteAboutTransactions')}</Text>
      )}
    </View>
  );
}
