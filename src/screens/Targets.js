import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { $LIGHTSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import TransactionsContainer from '../components/TransactionsContainer';
import CreateTargetModal from '../components/CreateTargetModal';
import withSideScreen from '../components/SideScreenHOC';

const styles = StyleSheet.create({
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
    marginTop: 20,
    height: '60%',
    justifyContent: 'flex-start',
    width: '90%'
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
      <TransactionsContainer
        hasTitle
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
