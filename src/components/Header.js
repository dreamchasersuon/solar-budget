/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { $BLUE, $WHITE, $SILVER, $RED } from '../constants/colorLiterals';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
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
    marginTop: 40
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
    fontSize: 20,
    marginLeft: 35
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
    color: $WHITE,
    fontSize: 20,
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
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTopRightSide: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default function Header({ hasStats, title, hasLeftMenu }) {
  const goToStats = () => NavigationService.navigate('Statistics');
  return (
    <View style={styles.container}>
      <View style={styles.headerTopContainer}>
        <View style={styles.headerTopLeftSide}>
          {hasLeftMenu ? (
            <View style={styles.headerLeftSideMenu}>
              <Ionicons
                name="ios-reorder"
                color="white"
                style={styles.iconSideMenu}
                onPress={goToStats}
              />
            </View>
          ) : (
            <BackButton />
          )}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.headerTopRightSide}>
          {hasStats && <Ionicons name="ios-pie" style={styles.iconStats} />}
          <BlueButton
            iconStyle={styles.iconBalance}
            title="29.000"
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
      <View style={styles.headerBottomContainer}>
        <View style={styles.billsContainer}>
          <BlueButton
            title="Счёт"
            iconStyle={styles.icon}
            buttonStyle={[styles.buttonStyle, styles.buttonBillsStyle]}
            buttonTextStyle={styles.buttonTextStyle}
          />
        </View>
        <View>
          <CreateBillButton />
        </View>
      </View>
    </View>
  );
}

Header.propTypes = {
  hasStats: PropTypes.bool,
  title: PropTypes.string
};
