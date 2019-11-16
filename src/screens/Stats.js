/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  $GREEN,
  $LIGHTSILVER,
  $RED,
  $SILVER
} from '../constants/colorLiterals';
import Header from '../components/Header';
import FROZEN_ProgressBar from '../components/FROZEN_ProgressBar';
import FROZEN_OperationsContainer from '../components/FROZEN_OperationsContainer';
import Saldo from '../components/Saldo';

const styles = StyleSheet.create({
  circleTitle: {
    color: $SILVER,
    fontSize: 16,
    marginLeft: 75,
    marginTop: 75
  },
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER
  },
  leftOperationsContainer: {
    borderColor: $SILVER,
    borderRightWidth: 1,
    paddingRight: 5,
    width: '50%'
  },
  operationAmountCredit: {
    color: $RED,
    fontSize: 20
  },
  operationAmountDebit: {
    color: $GREEN,
    fontSize: 20
  },
  operationsContainer: {
    flexDirection: 'row',
    height: '31%',
    justifyContent: 'space-between',
    marginTop: -20,
    padding: 10,
    width: '100%'
  },
  rightOperationsContainer: {
    borderColor: $SILVER,
    borderLeftWidth: 1,
    paddingLeft: 5,
    width: '50%'
  },
  statsHeaderTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: 160
  }
});

export default function Statistics() {
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.statsHeaderTopLeftSide}
        title="Статистика"
        billTitle="Счет"
        hasBudget
      />
      <FROZEN_ProgressBar
        circleTitle="май"
        circleTitleStyle={styles.circleTitle}
      />
      <View style={styles.operationsContainer}>
        <FROZEN_OperationsContainer
          operationsContainerStyle={styles.leftOperationsContainer}
          operationAmountStyle={styles.operationAmountDebit}
          operationType="+ 1200"
          operationTitle="Входящие переводы"
        />
        <FROZEN_OperationsContainer
          operationsContainerStyle={styles.rightOperationsContainer}
          operationAmountStyle={styles.operationAmountCredit}
          operationType="- 1200"
          operationTitle="Исходящие переводы"
        />
      </View>
      <Saldo creditAmount={1200} debitAmount={1200} saldo={0} />
    </View>
  );
}
