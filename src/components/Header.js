/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $WHITE
} from '../constants/colorLiterals';
import { Ionicons } from '@expo/vector-icons';
import StatsBtn from '../../assets/statsBtn.svg';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import ButtonMainBlue from './buttons/ButtonMainBlue';
import ButtonCreateBill from './buttons/ButtonCreateBill';
import NavigationBackArrow from './NavigationBackArrow';
import NavigationService from '../navigation/service';
import bringInCash from '../utils/dotSeparation';
import Calendar from '../../assets/calendar.svg';

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
  billsContainerWrapperStats: {
    marginLeft: 50,
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
    backgroundColor: $LIGHT_BLUE,
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
  blueContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 45,
    paddingBottom: 15,
    width: '100%',
    backgroundColor: $LIGHT_BLUE,
    elevation: 8
  },
  headerBottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerLeftSideMenu: {
    alignItems: 'center',
    backgroundColor: $LIGHT_BLUE,
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
  },
  titleTextBlueBackground: {
    fontSize: 20,
    marginLeft: 10,
    color: $WHITE
  },
  whiteText: {
    color: $WHITE
  },
  blueText: {
    color: $LIGHT_BLUE
  },
  whiteBackground: {
    backgroundColor: $WHITE
  },
  calendarContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 50,
    paddingRight: 30
  },
  calendarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  periodOfTime: {
    marginLeft: 10,
    fontSize: 16,
    color: $WHITE
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
  deposit,
  blueBackgroundStyle,
  handleOnPressDeposit,
  hasCalendar,
  periodOfTime,
  saldo,
  theme
}) {
  const { accent, text_main } = mapColorsToTheme(theme);
  const themeStyles = StyleSheet.create({
    textColorMain: {
      color: text_main
    },
    backgroundAccent: {
      backgroundColor: accent
    }
  });

  const goToStats = () => NavigationService.navigate('Statistics');
  return (
    <View
      style={
        blueBackgroundStyle
          ? [styles.blueContainer, themeStyles.backgroundAccent]
          : styles.container
      }
    >
      <View style={styles.headerTopContainer}>
        <View style={headerTopLeftSideStyle}>
          {hasLeftMenu ? (
            <View
              style={[styles.headerLeftSideMenu, themeStyles.backgroundAccent]}
            >
              <Ionicons
                name="ios-reorder"
                color="white"
                style={styles.iconSideMenu}
              />
            </View>
          ) : (
            <NavigationBackArrow white={blueBackgroundStyle} />
          )}
          <Text
            style={
              blueBackgroundStyle
                ? styles.titleTextBlueBackground
                : [styles.titleText, themeStyles.textColorMain]
            }
          >
            {title}
          </Text>
        </View>
        {hasBudget && (
          <View style={styles.headerTopRightSide}>
            {hasStats && (
              <TouchableOpacity
                onPress={goToStats}
                style={styles.statsBtnWrapper}
              >
                <StatsBtn />
              </TouchableOpacity>
            )}
            <ButtonMainBlue
              iconStyle={styles.iconBalance}
              handleOnPress={handleOnPressDeposit}
              title={bringInCash(deposit)}
              isBlue={blueBackgroundStyle}
              icon
              buttonStyle={
                blueBackgroundStyle
                  ? [styles.buttonStyle, styles.whiteBackground]
                  : [styles.buttonStyle, themeStyles.backgroundAccent]
              }
              buttonTextStyle={
                blueBackgroundStyle
                  ? [styles.buttonTextStyle, styles.blueText]
                  : styles.buttonTextStyle
              }
            />
          </View>
        )}
      </View>
      {hasBudget && (
        <View style={styles.headerBottomContainer}>
          <View
            style={
              blueBackgroundStyle
                ? styles.billsContainerWrapperStats
                : styles.billsContainerWrapper
            }
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.billsContainer}
              data={list}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                if (blueBackgroundStyle) {
                  return (
                    <ButtonMainBlue
                      title={item.name}
                      icon={item.currency}
                      isBlue
                      iconStyle={styles.icon}
                      buttonStyle={
                        item.active
                          ? [
                              styles.buttonStyle,
                              styles.whiteBackground,
                              styles.buttonBillsStyle
                            ]
                          : [
                              styles.buttonStyleUnselected,
                              styles.buttonBillsStyle
                            ]
                      }
                      buttonTextStyle={
                        item.active
                          ? [styles.buttonTextStyle, styles.blueText]
                          : [styles.buttonTextStyleUnselected, styles.whiteText]
                      }
                      handleOnPress={() => handleOnPress(item.id)}
                    />
                  );
                }
                return (
                  <ButtonMainBlue
                    title={item.name}
                    icon={item.currency}
                    iconStyle={styles.icon}
                    buttonStyle={
                      item.active
                        ? [
                            styles.buttonStyle,
                            styles.buttonBillsStyle,
                            themeStyles.backgroundAccent
                          ]
                        : [
                            styles.buttonStyleUnselected,
                            styles.buttonBillsStyle
                          ]
                    }
                    buttonTextStyle={
                      item.active
                        ? styles.buttonTextStyle
                        : styles.buttonTextStyleUnselected
                    }
                    handleOnPress={() => handleOnPress(item.id)}
                  />
                );
              }}
            />
          </View>
          {hasLeftMenu && (
            <React.Fragment>
              <ButtonCreateBill theme={theme} onPressCreateBill={toggleModal} />
            </React.Fragment>
          )}
        </View>
      )}
      {hasCalendar && (
        <View style={styles.calendarContainer}>
          <View style={styles.calendarGroup}>
            <Calendar />
            <Text style={styles.periodOfTime}>{periodOfTime}</Text>
          </View>
          <Text style={styles.periodOfTime}>
            {bringInCash(saldo.toString())}
          </Text>
        </View>
      )}
    </View>
  );
}
