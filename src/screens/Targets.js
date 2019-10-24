import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { $BLUE, $LIGHTSILVER, $WHITE } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import OpenOperationModalBtn from '../components/OpenOperationModalBtn';
import TransactionsContainer from '../components/TransactionsContainer';
import ProgressBar from '../components/ProgressBar';
import CreateTargetModal from '../components/CreateTargetModal';
import SendMoneyToTargetModal from '../components/SendMoneyToTargetModal';
import withSideScreen from '../components/SideScreenHOC';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject,
    elevation: 8
  },
  transactionsContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '20.1%'
  },
  buttonStyle: {
    backgroundColor: $BLUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 4,
    width: 100,
    height: 26
  },
  buttonTextStyle: {
    color: $WHITE
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    color: $WHITE
  },
  transactionsContainerTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'normal'
  },
  circleTitle: {
    fontSize: 24,
    color: $BLUE,
    marginLeft: 70,
    marginTop: 68
  },
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    justifyContent: 'space-between'
  }
});

function Targets() {
  const [isCreateTargetModalVisible, makeTarget] = useState(false);
  const toggleCreateTargetModal = () => makeTarget(!isCreateTargetModalVisible);
  const [isSendMoneyToTargetModalVisible, makeTransactionToTarget] = useState(
    false
  );
  const toggleSendMoneyToTargetModal = () =>
    makeTransactionToTarget(!isSendMoneyToTargetModalVisible);
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasLeftMenu
        title="Цели"
        hasBudget
        onPressCreateBill={toggleCreateTargetModal}
      />
      <ProgressBar
        isTargetCircle
        circleTitle="12%"
        circleTitleStyle={styles.circleTitle}
      />
      <TransactionsContainer
        hasTitle
        title="История платежей"
        titleStyle={styles.transactionsContainerTitle}
        containerStyle={styles.transactionsContainer}
      >
        <Transaction />
      </TransactionsContainer>
      <OpenOperationModalBtn expandModal={toggleSendMoneyToTargetModal} />
      <CreateTargetModal
        isVisible={isCreateTargetModalVisible}
        toggleCreateTargetModal={toggleCreateTargetModal}
      />
      <SendMoneyToTargetModal
        isVisible={isSendMoneyToTargetModalVisible}
        toggleSendMoneyToTargetModal={toggleSendMoneyToTargetModal}
      />
    </View>
  );
}

export default withSideScreen(Targets);
