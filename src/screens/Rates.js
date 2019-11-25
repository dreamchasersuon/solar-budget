/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Header from '../components/Header';
import ButtonOpenModalRound from '../components/buttons/ButtonOpenModalRound';
import RatePair from '../components/RatePair';
import ModalCreateRatePair from '../components/modals/ModalCreateRatePair';
import withSideScreen from '../components/HOCSideScreen';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
    height: 'auto',
    justifyContent: 'flex-start',
    marginTop: 40,
    width: '90%',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 120
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

function Rates() {
  const { t, i18n } = useTranslation('RatesScreen');

  const rateState = useSelector(state => state.rate);
  const user = useSelector(state => state.user.find(user => user.active));
  const rates = rateState.filter(rate => rate.userId === user.id);

  const [isAddRatePairModalVisible, makeTarget] = useState(false);
  const toggleAddRatePairModal = () => makeTarget(!isAddRatePairModalVisible);
  return (
    <View style={styles.container}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        title={t('screenName')}
        hasLeftMenu
      />
      {rates.length ? (
        <FlatList
          data={rates}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => (
            <RatePair
              ratePair={item.pair}
              rate={item.value}
              rateNote={item.note}
              ratePercent={item.percent}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.clearHistory}>{t('ratesNotSelectedNote')}</Text>
      )}
      <ButtonOpenModalRound isActive expandModal={toggleAddRatePairModal} />
      <ModalCreateRatePair
        isVisible={isAddRatePairModalVisible}
        toggleAddRatePairModal={toggleAddRatePairModal}
      />
    </View>
  );
}

export default withSideScreen(Rates);
