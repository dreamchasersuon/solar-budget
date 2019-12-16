/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import mapColorsToTheme, { $MEDIUMSILVER } from '../constants/colorLiterals';
import Header from '../components/Header';
import ButtonOpenModalRound from '../components/buttons/ButtonOpenModalRound';
import RatePair from '../components/RatePair';
import withSideScreen from '../components/HOCSideScreen';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { refs } from '../constants/refs';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    elevation: 8
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto'
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
  const { background_bottom } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    background: {
      backgroundColor: background_bottom
    }
  });

  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = event => {
    const scrollOffsetY = event.contentOffset.y;
    setScrollPosition(scrollOffsetY);
    if (scrollPosition > scrollOffsetY) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  const toggleAddRatePairModal = () => {
    refs.rate.current.snapTo(1);
  };

  function hideRoundBtn() {
    return setScrollDirection('down');
  }
  function showRoundBtn() {
    return setScrollDirection('up');
  }
  return (
    <View style={[styles.container, themeStyles.background]}>
      <Header
        headerTopLeftSideStyle={styles.headerTopLeftSide}
        title={t('screenName')}
        hasLeftMenu
        theme={user.theme}
      />
      {rates.length ? (
        <FlatList
          data={rates}
          contentContainerStyle={styles.transactionsContainer}
          onScroll={event => handleScroll(event.nativeEvent)}
          renderItem={({ item }) => (
            <RatePair
              theme={user.theme}
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
      <ButtonOpenModalRound
        hideOrShow={scrollDirection}
        isActive
        expandModal={toggleAddRatePairModal}
        theme={user.theme}
      />
    </View>
  );
}

export default withSideScreen(Rates);
