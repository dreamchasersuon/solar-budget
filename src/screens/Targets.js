import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { $BLUE, $LIGHTSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import TransactionsContainer from '../components/TransactionsContainer';
import ProgressBar from '../components/ProgressBar';
import CreateTargetModal from '../components/CreateTargetModal';
import withSideScreen from '../components/SideScreenHOC';

const styles = StyleSheet.create({
  circleTitle: {
    color: $BLUE,
    fontSize: 24,
    marginLeft: 70,
    marginTop: 68
  },
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject,
    elevation: 8
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90
  },
  transactionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '25%',
    justifyContent: 'flex-start',
    width: '90%'
  },
  transactionsContainerTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 10
  }
});

function Targets() {
  const [isCreateTargetModalVisible, makeTarget] = useState(false);
  const toggleCreateTargetModal = () => makeTarget(!isCreateTargetModalVisible);
  return (
    <View
      style={
        isCreateTargetModalVisible
          ? [styles.container, { opacity: 0.8 }]
          : styles.container
      }
    >
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasLeftMenu
        title="Цели"
        billTitle="Машина"
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
      <CreateTargetModal
        isVisible={isCreateTargetModalVisible}
        toggleCreateTargetModal={toggleCreateTargetModal}
      />
    </View>
  );
}

export default withSideScreen(Targets);
