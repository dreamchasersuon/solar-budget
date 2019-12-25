/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { createSelector } from 'redux-starter-kit';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import mapColorsToTheme, {
  $LIGHT_GREEN,
  $MEDIUMSILVER,
  $RED,
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
    flex: 1,
    width: '100%'
  },
  safeArea: { flex: 1, width: '100%' },
  scrollView: {
    alignItems: 'center',
    width: '100%'
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: 160
  },
  cleanHistory: {
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
    borderRadius: 16,
    position: 'relative',
    left: 90
  },
  btnActive: {
    fontSize: 14,
    paddingBottom: 20,
    paddingTop: 20
  },
  btn: {
    fontSize: 12,
    color: $MEDIUMSILVER,
    paddingBottom: 20,
    paddingTop: 20
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
    elevation: 9
  }
});

const groupBy = (objectArray, property) => {
  return objectArray.reduce(function(acc, obj) {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const userSelector = createSelector(
  state => state.user,
  users => users.find(user => user.active)
);

export default function Statistics() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const transactions = useSelector(state => state.wallet);

  const bills = useSelector(state => state.bill).filter(
    bill => bill.userId === user.id
  );
  const purposes = useSelector(state => state.purposes);
  const { background_bottom, background_top, accent } = mapColorsToTheme(
    user.theme
  );
  const themeStyles = StyleSheet.create({
    backgroundBottom: {
      backgroundColor: background_bottom
    },
    backgroundTop: {
      backgroundColor: background_top
    },
    textAccent: {
      color: accent
    }
  });

  const { t, i18n } = useTranslation('StatsScreen');
  const language = user.locale;

  const [isVisibleMoneyFlow, toggleMoneyFlowVisibility] = useState(false);

  const [transactionType, changeTypeOfTransactions] = useState('outcome');

  let activeBill;
  let activeBillDeposit;

  if (bills.length) {
    activeBill = bills.find(bill => bill.active);
    activeBillDeposit = activeBill.depositAmount;
  } else {
    activeBillDeposit = '0';
  }

  let activeBillId;
  if (bills.length) {
    activeBillId = activeBill.id;
  }

  const activeBillTransactions = transactions.filter(
    transaction => transaction.billId === activeBillId
  );
  const outcomeTransactions = activeBillTransactions.filter(
    transaction => transaction.type === 'outcome'
  );
  const incomeTransactions = activeBillTransactions.filter(
    transaction => transaction.type === 'income'
  );
  const groupedOutcomeTransactions = groupBy(outcomeTransactions, 'purpose');
  const groupedIncomeTransactions = groupBy(incomeTransactions, 'purpose');

  const groupedAndFoldedOutcomeTransactions = [];
  for (const key in groupedOutcomeTransactions) {
    groupedOutcomeTransactions[key].map(transaction => {
      return groupedAndFoldedOutcomeTransactions.push({
        ...transaction,
        amount: groupedOutcomeTransactions[key].reduce((acc, curr) => {
          return acc + Number(curr.amount);
        }, 0),
        color: purposes[transaction.purpose].color
      });
    });
  }

  const groupedAndFoldedIncomeTransactions = [];
  for (const key in groupedIncomeTransactions) {
    groupedIncomeTransactions[key].map(transaction => {
      return groupedAndFoldedIncomeTransactions.push({
        ...transaction,
        amount: groupedIncomeTransactions[key].reduce((acc, curr) => {
          return acc + Number(curr.amount);
        }, 0),
        color: purposes[transaction.purpose].color
      });
    });
  }

  const groupedIncomeAndOutcomeTransactions = [];
  for (const key in groupedIncomeTransactions) {
    groupedIncomeTransactions[key].map(transaction => {
      return groupedIncomeAndOutcomeTransactions.push({
        ...transaction,
        amount: groupedIncomeTransactions[key].reduce((acc, curr) => {
          return acc + Number(curr.amount);
        }, 0),
        color: $LIGHT_GREEN
      });
    });
  }
  for (const key in groupedOutcomeTransactions) {
    groupedOutcomeTransactions[key].map(transaction => {
      return groupedIncomeAndOutcomeTransactions.push({
        ...transaction,
        amount: groupedOutcomeTransactions[key].reduce((acc, curr) => {
          return acc + Number(curr.amount);
        }, 0),
        color: $RED
      });
    });
  }

  const totalOutcome = groupedAndFoldedOutcomeTransactions.reduce(
    (acc, curr) => {
      return acc + curr.amount;
    },
    0
  );
  const totalIncome = groupedAndFoldedIncomeTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const totalSaldo = totalIncome - totalOutcome;

  const selectBill = id => {
    dispatch(setBillActive({ id, userId: user.id }));
  };

  let transactionsToPreview;
  let totalTransactions;
  let amountToPreview;
  if (transactionType === 'income') {
    transactionsToPreview = groupedAndFoldedIncomeTransactions;
    amountToPreview = totalIncome;
    totalTransactions = incomeTransactions;
  }
  if (transactionType === 'outcome') {
    transactionsToPreview = groupedAndFoldedOutcomeTransactions;
    amountToPreview = totalOutcome;
    totalTransactions = outcomeTransactions;
  }
  if (transactionType === 'total') {
    transactionsToPreview = groupedIncomeAndOutcomeTransactions;
    amountToPreview = totalSaldo;
    totalTransactions = [...incomeTransactions, ...outcomeTransactions];
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
      <SafeAreaView style={[styles.safeArea, themeStyles.backgroundBottom]}>
        <ScrollView
          bounces
          contentContainerStyle={[
            styles.scrollView,
            themeStyles.backgroundBottom
          ]}
        >
          {activeBillTransactions.length ? (
            <React.Fragment>
              <PieChart
                data={transactionsToPreview}
                width={430}
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
                hideLegend
                hasLegend={false}
              />
              <View style={styles.purposesTagsContainer}>
                {transactionsToPreview.map((transaction, i) => {
                  return (
                    <View
                      key={i}
                      style={[
                        styles.purposesTags,
                        {
                          backgroundColor: purposes[transaction.purpose].color
                        }
                      ]}
                    >
                      {/* eslint-disable-next-line react-native/no-inline-styles */}
                      <Text style={{ color: $WHITE, fontSize: 12 }}>
                        {purposes[transaction.purpose][language]}
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
              transactions={totalTransactions}
              language={language}
              purposes={purposes}
              handleOnPressToggleTransactions={() =>
                toggleMoneyFlowVisibility(!isVisibleMoneyFlow)
              }
              headerTitle={t(transactionType)}
              totalTitle={t('total')}
              noTransactionsNote={t(`${transactionType}NoTransactions`)}
              total={amountToPreview}
              theme={user.theme}
            />
          ) : (
            <Text style={styles.cleanHistory}>
              {t('noteAboutTransactions')}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
      <View style={[styles.btnsContainer, themeStyles.backgroundTop]}>
        <TouchableOpacity onPress={() => changeTypeOfTransactions('outcome')}>
          <Text
            style={
              transactionType === 'outcome'
                ? [styles.btnActive, themeStyles.textAccent]
                : [styles.btn]
            }
          >
            {t('outcome')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTypeOfTransactions('total')}>
          <Text
            style={
              transactionType === 'total'
                ? [styles.btnActive, themeStyles.textAccent]
                : [styles.btn]
            }
          >
            {t('total')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTypeOfTransactions('income')}>
          <Text
            style={
              transactionType === 'income'
                ? [styles.btnActive, themeStyles.textAccent]
                : [styles.btn]
            }
          >
            {t('income')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
