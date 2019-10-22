/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { $BLUE, $WHITE, $SILVER } from '../constants/colorLiterals';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import StatsBtn from '../../assets/statsBtn.svg';
import { View, StyleSheet, Text } from 'react-native';
import BlueButton from '../components/BlueButton';
import PropTypes from 'prop-types';
import CreateBillButton from './CreateBillButton';
import BackButton from './BackButton';
import NavigationService from '../navigation/service';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 45
  },
  headerTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  headerLeftSideMenu: {
    height: 50,
    width: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $BLUE
  },
  headerRightSideMenu: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSideMenu: {
    transform: [{ rotate: '90deg' }],
    fontSize: 25
  },
  titleText: {
    fontSize: 20
  },
  buttonStyle: {
    backgroundColor: $BLUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: 100,
    height: 26,
    flexDirection: 'row'
  },
  buttonBillsStyle: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  buttonTextStyle: {
    color: $WHITE
  },
  iconBalance: {
    marginRight: 10,
    marginLeft: 10
  },
  iconStats: {
    color: $SILVER,
    fontSize: 26,
    marginRight: 15
  },
  headerBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  billsContainer: {
    width: '70%',
    marginLeft: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    color: $WHITE
  },
  headerTopRightSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsBtnWrapper: {
    marginRight: 15
  }
});
//TODO: make it readable by separating components
export default function Header({
  hasStats,
  title,
  hasLeftMenu,
  headerTopLeftSideStyle,
  hasBudget
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
            <BackButton />
          )}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {hasBudget && (
          <View style={styles.headerTopRightSide}>
            {hasStats && (
              <View style={styles.statsBtnWrapper}>
                <StatsBtn onPress={goToStats} />
              </View>
            )}
            <BlueButton
              iconStyle={styles.iconBalance}
              title="29.000"
              icon
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
            />
          </View>
        )}
      </View>
      {hasBudget && (
        <View style={styles.headerBottomContainer}>
          <View style={styles.billsContainer}>
            <BlueButton
              title="Счёт"
              icon
              iconStyle={styles.icon}
              buttonStyle={[styles.buttonStyle, styles.buttonBillsStyle]}
              buttonTextStyle={styles.buttonTextStyle}
            />
          </View>
          {hasLeftMenu && (
            <React.Fragment>
              <CreateBillButton />
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
