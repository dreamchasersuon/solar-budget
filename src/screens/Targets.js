import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Transaction from '../components/Transaction';
import Header from '../components/Header';
import CreateTargetModal from '../components/CreateTargetModal';
import withSideScreen from '../components/SideScreenHOC';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetActive } from '../redux/features/targetFeatureSlice';

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
    justifyContent: 'flex-start',
    marginTop: 40,
    paddingTop: 5,
    paddingBottom: 60,
    paddingLeft: 15,
    paddingRight: 15,
    width: 358
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

  const targetState = useSelector(state => state.target);
  const user = useSelector(state => state.user.find(user => user.active));
  const targets = targetState.filter(target => target.userId === user.id);

  let activeTarget;
  let activeTargetPrice;
  let transactions = [];
  if (targets.length) {
    activeTarget = targets.find(target => target.active);
    transactions = activeTarget.deposit;
    activeTargetPrice = activeTarget.depositAmount;
  } else {
    activeTargetPrice = '0';
  }

  const [isCreateTargetModalVisible, makeTarget] = useState(false);
  const toggleCreateTargetModal = () => makeTarget(!isCreateTargetModalVisible);

  const selectTarget = id => {
    dispatch(setTargetActive({ id }));
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
      {targets.length === 0 && (
        <Text style={styles.clearHistory}>
          Создайте цель с помощью кнопки с плюсом в правом верхнем углу
        </Text>
      )}
      {targets.length > 0 && !transactions.length && (
        <Text style={styles.clearHistory}>
          У цели нет ни одного платежа. Для создания платежа по цели необходимо
          указать название цели в поле "Назначение" транзакции
        </Text>
      )}
      {transactions.length ? (
        <FlatList
          data={transactions}
          extraData={transactions}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => (
            <Transaction
              purpose={activeTarget.name}
              about="Платеж по цели"
              amount={item.amount}
              date={item.date}
              time={item.time}
              type={item.type}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : null}
      <CreateTargetModal
        isVisible={isCreateTargetModalVisible}
        toggleCreateTargetModal={toggleCreateTargetModal}
      />
    </View>
  );
}

export default withSideScreen(Targets);
