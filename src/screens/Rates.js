/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { $LIGHTSILVER } from '../constants/colorLiterals';
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
    ...StyleSheet.absoluteFillObject,
    elevation: 8
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 166
  },
  transactionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '62%',
    justifyContent: 'flex-start',
    marginTop: 40,
    width: '90%'
  }
});

function Rates() {
  const [isAddRatePairModalVisible, makeTarget] = useState(false);
  const toggleAddRatePairModal = () => makeTarget(!isAddRatePairModalVisible);
  return (
    <View
      style={
        isAddRatePairModalVisible
          ? [styles.container, { opacity: 0.8 }]
          : styles.container
      }
    >
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
