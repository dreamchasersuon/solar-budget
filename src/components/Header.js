/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { $BLUE, $MEDIUMSILVER, $WHITE } from '../constants/colorLiterals';
import { Ionicons } from '@expo/vector-icons';
import StatsBtn from '../../assets/statsBtn.svg';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ButtonMainBlue from './buttons/ButtonMainBlue';
import PropTypes from 'prop-types';
import ButtonCreateBill from './buttons/ButtonCreateBill';
import NavigationBackArrow from './NavigationBackArrow';
import NavigationService from '../navigation/service';
import bringInCash from '../utils/dotSeparation';

const styles = StyleSheet.create({
  billsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  billsContainerWrapper: {
    marginLeft: 40,
    width: '75%',
    marginRight: 5
  },
  buttonBillsStyle: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    marginRight: 5
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    flexDirection: 'row',
    height: 26,
    justifyContent: 'flex-start',
    width: 100
  },
  buttonStyleUnselected: {
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    flexDirection: 'row',
    height: 26,
    justifyContent: 'flex-start',
    width: 100
  },
  buttonTextStyle: {
    color: $WHITE
  },
  buttonTextStyleUnselected: {
    color: $MEDIUMSILVER
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 45,
    width: '100%'
  },
  headerBottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerLeftSideMenu: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    justifyContent: 'center',
    width: 15
  },
  headerTopContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%'
  },
  headerTopRightSide: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    color: $WHITE,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  iconBalance: {
    marginLeft: 10,
    marginRight: 10
  },
  iconSideMenu: {
    fontSize: 25,
    transform: [{ rotate: '90deg' }]
  },
  statsBtnWrapper: {
    marginRight: 15
  },
  titleText: {
    fontSize: 20,
    marginLeft: 25
  }
});

export default function Header({
  hasStats,
  title,
  hasLeftMenu,
  headerTopLeftSideStyle,
  hasBudget,
  toggleModal,
  list,
  handleOnPress,
  deposit
}) {
  const goToStats = () => NavigationService.navigate('Statistics');
  return (
    <View style={styles.container}>
      <View style={styles.headerTopContainer}>
        <View style={headerTopLeftSideStyle}>
          {hasLeftMenu ? (
            <View style={styles.headerLeftSideMenu}>
              <Ionicons
                name="ios-reorder"
                color="white"
                style={styles.iconSideMenu}
              />
            </View>
          ) : (
            <NavigationBackArrow />
          )}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {hasBudget && (
          <View style={styles.headerTopRightSide}>
            {hasStats && (
              <View style={styles.statsBtnWrapper}>
                <StatsBtn />
              </View>
            )}
            <ButtonMainBlue
              iconStyle={styles.iconBalance}
              title={bringInCash(deposit)}
              icon
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
            />
          </View>
        )}
      </View>
      {hasBudget && (
        <View style={styles.headerBottomContainer}>
          <View style={styles.billsContainerWrapper}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.billsContainer}
              data={list}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ButtonMainBlue
                  title={item.name}
                  icon={item.currency}
                  iconStyle={styles.icon}
                  buttonStyle={
                    item.active
                      ? [styles.buttonStyle, styles.buttonBillsStyle]
                      : [styles.buttonStyleUnselected, styles.buttonBillsStyle]
                  }
                  buttonTextStyle={
                    item.active
                      ? styles.buttonTextStyle
                      : styles.buttonTextStyleUnselected
                  }
                  handleOnPress={() => handleOnPress(item.id)}
                />
              )}
            />
          </View>
          {hasLeftMenu && (
            <React.Fragment>
              <ButtonCreateBill onPressCreateBill={toggleModal} />
            </React.Fragment>
          )}
        </View>
      )}
    </View>
  );
}

Header.propTypes = {
  hasStats: PropTypes.bool,
  title: PropTypes.string
};
