/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import mapColorsToTheme, {
  $MEDIUMSILVER,
  $WHITE
} from '../constants/colorLiterals';
import ArrowCollapseEnabled from '../../assets/arrow-collapse-enabled.svg';
import ArrowCollapseDisabled from '../../assets/arrow-collapse-disabled.svg';
import TestPurposeIcon from '../../assets/purpose-test-icon.svg';
import dotSeparation from '../utils/dotSeparation';

const styles = StyleSheet.create({
  moneyFlowContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    width: '100%',
    marginTop: 10
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
    alignItems: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: $MEDIUMSILVER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexRow: {
    flexDirection: 'row'
  },
  purposeWithIcon: {
    flexDirection: 'row',
    alignItems: 'center'
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
  moneyFlowPurpose: {
    fontSize: 12,
    marginLeft: 5
  },
  historyClean: {
    fontSize: 14,
    color: $MEDIUMSILVER,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default function MoneyFlow({
  hasTransactions,
  transactions,
  total,
  handleOnPressToggleTransactions,
  headerTitle,
  totalTitle,
  noTransactionsNote,
  language,
  purposes,
  theme
}) {
  const { background_top, accent, text_main } = mapColorsToTheme(theme);
  const themeStyles = StyleSheet.create({
    backgroundMain: {
      backgroundColor: background_top
    },
    textMain: {
      color: text_main
    },
    textAccent: {
      color: accent
    }
  });
  function renderTransactions() {
    if (transactions.length) {
      return (
        <FlatList
          data={transactions}
          contentContainerStyle={styles.moneyFlowByCategoryContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.moneyFlowTransaction}>
                <View style={styles.purposeWithIcon}>
                  <TestPurposeIcon />
                  <Text style={[styles.moneyFlowPurpose, themeStyles.textMain]}>
                    {purposes[item.purpose][language]}
                  </Text>
                </View>
                <Text style={[styles.moneyFlowPurpose, themeStyles.textMain]}>
                  {'Р ' + dotSeparation(item.amount.toString())}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      );
    }
    return <Text style={styles.historyClean}>{noTransactionsNote}</Text>;
  }
  return (
    <View style={styles.moneyFlowContainer}>
      <View style={[styles.moneyFlowInfo, themeStyles.backgroundMain]}>
        <TouchableOpacity
          onPress={handleOnPressToggleTransactions}
          style={styles.moneyFlowDropDownHeader}
        >
          <Text style={[styles.moneyFlowHeaderTitle, themeStyles.textMain]}>
            {headerTitle}
          </Text>
          {hasTransactions ? (
            <ArrowCollapseEnabled fill={text_main} />
          ) : (
            <ArrowCollapseDisabled fill={text_main} />
          )}
        </TouchableOpacity>
        {hasTransactions && renderTransactions()}
        <View style={styles.moneyFlowAverageAndAmount}>
          <View style={styles.flexRow}>
            <Text
              style={[
                styles.moneyFlowAverageAndAmountText,
                themeStyles.textMain
              ]}
            >
              {totalTitle}
            </Text>
            <Text
              style={[
                styles.moneyFlowAverageAndAmountText,
                themeStyles.textAccent
              ]}
            >
              {'Р ' + dotSeparation(total.toString())}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
