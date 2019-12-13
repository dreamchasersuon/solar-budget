/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import mapColorsToTheme, {
  $LIGHTSILVER,
  $MEDIUMSILVER,
  $WHITE
} from '../constants/colorLiterals';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setBillActive } from '../redux/features/billFeatureSlice';
import MoneyFlow from '../components/MoneyFlow';
import { PieChart } from 'react-native-chart-kit';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  safeAreScrollView: {
    width: '100%'
  },
  scrollView: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    width: '100%',
    height: '100%'
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40
  },
  purposesTags: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    marginVertical: 5
  },
  pieChart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default function Statistics() {
  const dispatch = useDispatch();

  const transactions = useSelector(state => state.wallet);
  const user = useSelector(state => state.user.find(user => user.active));
  const billState = useSelector(state => state.bill);
  const bills = billState.filter(bill => bill.userId === user.id);
  const purposes = useSelector(state => state.purposes);
  const { background_bottom } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    containerBackground: {
      backgroundColor: background_bottom
    }
  });

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
      }
      const isExistInPieDataArray = groupedByPurposeTransactions.find(
        pieTransaction => {
          return pieTransaction.label === transaction.label;
        }
      );

      if (isExistInPieDataArray) {
        groupedByPurposeTransactions.forEach(pieTransaction => {
          if (pieTransaction.label === transaction.label) {
            return (pieTransaction.amount =
              Number(pieTransaction.amount) + Number(transaction.amount));
          }
        });
      } else {
        groupedByPurposeTransactions.push({
          label: transaction.label,
          amount: transaction.amount
        });
      }
    });
    groupedByPurposeTransactions.forEach(transaction => {
      const transactionToPieDiagram = {
        name: transaction.label,
        amount: transaction.amount,
        color: purposes[transaction.label].color
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
        theme={user.theme}
      />
      <SafeAreaView style={styles.safeAreScrollView}>
        <ScrollView
          bounces
          contentContainerStyle={[
            styles.scrollView,
            themeStyles.containerBackground
          ]}
        >
          {activeBillTransactions.length ? (
            <React.Fragment>
              <PieChart
                data={dataToPieDiagram}
                width={300}
                height={300}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                }}
                bezier
                style={styles.pieChart}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={false}
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
              theme={user.theme}
            />
          ) : (
            <Text style={styles.clearHistory}>
              {t('noteAboutTransactions')}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
