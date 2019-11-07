import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import CreateTargetModal from '../components/CreateTargetModal';
import withSideScreen from '../components/SideScreenHOC';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetActive } from '../redux/targetFeatureSlice';

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
  },
  clearHistory: {
    textAlign: 'center',
    marginTop: 'auto',
    width: 250,
    marginBottom: 'auto',
    color: $MEDIUMSILVER,
    fontSize: 14
  }
});

function Targets() {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.wallet.targetId);
  const targets = useSelector(state => state.target);

  let activeTarget;
  let activeTargetPrice;
  if (targets.length) {
    activeTarget = targets.find(target => target.active);
    activeTargetPrice = activeTarget.depositAmount;
  } else {
    activeTargetPrice = '0';
  }

  const [isCreateTargetModalVisible, makeTarget] = useState(false);
  const toggleCreateTargetModal = () => makeTarget(!isCreateTargetModalVisible);

  const selectTarget = depositAmount => {
    dispatch(setTargetActive({ depositAmount }));
  };
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        hasLeftMenu
        title="Цели"
        hasBudget
        toggleModal={toggleCreateTargetModal}
        handleOnPress={selectTarget}
        list={targets}
        deposit={activeTargetPrice}
      />
      {transactions !== undefined ? (
        <FlatList
          data={transactions}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => (
            <Transaction
              purpose={item.purpose}
              about={item.description}
              amount={item.amount}
              date={item.date}
              time={item.time}
              type={item.type}
            />
          )}
          keyExtractor={transaction => transaction.time}
        />
      ) : (
        <Text style={styles.clearHistory}>
          У цели нет ни одного платежа. Для создания платежа по цели необходимо
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          указать название цели в поле "Назначение" транзакции
        </Text>
      )}
      <CreateTargetModal
        isVisible={isCreateTargetModalVisible}
        toggleCreateTargetModal={toggleCreateTargetModal}
      />
    </View>
  );
}

export default withSideScreen(Targets);
