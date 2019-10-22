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
import ProgressBar from '../components/ProgressBar';
import OperationsContainer from '../components/OperationsContainer';
import Saldo from '../components/Saldo';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER
  },
  operationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '31%',
    marginTop: -20,
    padding: 10
  },
  operationContainer: {
    flexDirection: 'column'
  },
  leftOperationsContainer: {
    borderRightWidth: 1,
    borderColor: $SILVER,
    width: '50%',
    paddingRight: 5
  },
  rightOperationsContainer: {
    borderLeftWidth: 1,
    borderColor: $SILVER,
    width: '50%',
    paddingLeft: 5
  },
  icon: {
    width: 30,
    height: 30
  },
  operationTitle: {
    fontSize: 9,
    marginBottom: 10
  },
  operationAmountDebit: {
    color: $GREEN,
    fontSize: 20
  },
  operationAmountCredit: {
    color: $RED,
    fontSize: 20
  },
  operation: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circleTitle: {
    color: $SILVER,
    fontSize: 16,
    marginLeft: 75,
    marginTop: 75
  },
  statsHeaderTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    height: 50,
    justifyContent: 'space-between'
  }
});

export default function Statistics() {
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.statsHeaderTopLeftSide}
        title="Статистика"
        hasBudget
      />
      <ProgressBar circleTitle="май" circleTitleStyle={styles.circleTitle} />
      <View style={styles.operationsContainer}>
        <OperationsContainer
          operationsContainerStyle={styles.leftOperationsContainer}
          operationAmountStyle={styles.operationAmountDebit}
          operationType="+ 1200"
          operationTitle="Входящие переводы"
        />
        <OperationsContainer
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
