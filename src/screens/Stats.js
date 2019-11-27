/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { $BLUE, $LIGHTSILVER, $WHITE } from '../constants/colorLiterals';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setBillActive } from '../redux/features/billFeatureSlice';
import dotSeparation from '../utils/dotSeparation';
import Transaction from '../components/Transaction';

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
  moneyFlowContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    width: '100%'
  },
  moneyFlowInfo: {
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 80,
    borderRadius: 10,
    backgroundColor: $WHITE,
    elevation: 5,
    marginBottom: 15
  },
  moneyFlowDropDownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  moneyFlowHeaderTitle: {
    fontSize: 18
  },
  moneyFlowByCategoryContainer: {
    padding: 15
  },
  moneyFlowTransaction: {
    height: 40,
    borderWidth: 1,
    borderBottomColor: $LIGHTSILVER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexRow: {
    flexDirection: 'row'
  },
  moneyFlowAverageAndAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
  },
  moneyFlowAverageAndAmountText: {
    fontSize: 14,
    marginRight: 5
  },
  blueColor: {
    color: $BLUE
  }
});

export default function Statistics() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('StatsScreen');

  const transactions = useSelector(state => state.wallet);
  const user = useSelector(state => state.user.find(user => user.active));
  const billState = useSelector(state => state.bill);
  const bills = billState.filter(bill => bill.userId === user.id);

  const [isVisibleMoneyFlow, toggleMoneyFlowVisibility] = useState(false);

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
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasStats
        blueBackgroundStyle
        title={t('screenName')}
        hasBudget
        periodOfTime={t('periodOfTime')}
        hasCalendar
        handleOnPress={selectBill}
        list={bills}
        deposit={activeBillDeposit}
      />
      <View style={styles.moneyFlowContainer}>
        <View style={styles.moneyFlowInfo}>
          <TouchableOpacity
            onPress={() => toggleMoneyFlowVisibility(!isVisibleMoneyFlow)}
            style={styles.moneyFlowDropDownHeader}
          >
            <Text style={styles.moneyFlowHeaderTitle}>{t('outcome')}</Text>
          </TouchableOpacity>
          {isVisibleMoneyFlow && (
            <FlatList
              data={activeBillTransactions}
              contentContainerStyle={styles.moneyFlowByCategoryContainer}
              renderItem={({ item }) => {
                if (item.type === 'outcome') {
                  return (
                    <View style={styles.moneyFlowTransaction}>
                      <Text>{item.purpose}</Text>
                      <Text>{dotSeparation(item.amount) + ' Р'}</Text>
                    </View>
                  );
                }
              }}
              keyExtractor={item => item.id}
            />
          )}
          <View style={styles.moneyFlowAverageAndAmount}>
            <View style={styles.flexRow}>
              <Text style={styles.moneyFlowAverageAndAmountText}>
                {t('average')}
              </Text>
              <Text
                style={[styles.moneyFlowAverageAndAmountText, styles.blueColor]}
              >
                {dotSeparation('3000')}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.moneyFlowAverageAndAmountText}>
                {t('common')}
              </Text>
              <Text
                style={[styles.moneyFlowAverageAndAmountText, styles.blueColor]}
              >
                {dotSeparation('6000')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
