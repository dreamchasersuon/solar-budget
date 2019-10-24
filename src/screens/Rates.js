/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { $BLUE, $LIGHTSILVER, $WHITE } from '../constants/colorLiterals';
import Header from '../components/Header';
import OpenOperationModalBtn from '../components/OpenOperationModalBtn';
import RatesContainer from '../components/RatesContainer';
import RatePair from '../components/RatePair';
import AddRatePairModal from '../components/AddRatePairModal';
import withSideScreen from '../components/SideScreenHOC';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject
  },
  transactionsContainer: {
    width: '90%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '62%'
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
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 175,
    justifyContent: 'space-between'
  }
});

function Rates() {
  const [isAddRatePairModalVisible, makeTarget] = useState(false);
  const toggleAddRatePairModal = () => makeTarget(!isAddRatePairModalVisible);
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        title="Курсы валют"
        hasLeftMenu
      />
      <RatesContainer containerStyle={styles.transactionsContainer}>
        <RatePair />
      </RatesContainer>
      <OpenOperationModalBtn expandModal={toggleAddRatePairModal} />
      <AddRatePairModal
        isVisible={isAddRatePairModalVisible}
        toggleAddRatePairModal={toggleAddRatePairModal}
      />
    </View>
  );
}

export default withSideScreen(Rates);
