/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';
import mapColorsToTheme from '../constants/colorLiterals';
import { StyleSheet } from 'react-native';

export default function BottomTabNavigator(props) {
  const user = useSelector(state => state.user.find(user => user.active));
  const { background_top } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    background: {
      backgroundColor: background_top,
      elevation: 10,
      borderTopWidth: 0,
      height: 60
    }
  });

  return <BottomTabBar {...props} style={themeStyles.background} />;
}
