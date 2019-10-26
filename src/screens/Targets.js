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
    height: '25%'
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
