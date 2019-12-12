/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import mapColorsToTheme, { $MEDIUMSILVER } from '../constants/colorLiterals';
import TargetsImg from '../../assets/target.svg';
import SettingsImg from '../../assets/settings.svg';
import RatesImg from '../../assets/rates.svg';
import WalletImg from '../../assets/wallet.svg';

export function WalletIcon({ focused }) {
  const user = useSelector(state => state.user.find(user => user.active));
  const { accent } = mapColorsToTheme(user.theme);

  return <WalletImg fill={focused ? accent : $MEDIUMSILVER} />;
}

export function TargetsIcon({ focused }) {
  const user = useSelector(state => state.user.find(user => user.active));
  const { accent } = mapColorsToTheme(user.theme);

  return <TargetsImg fill={focused ? accent : $MEDIUMSILVER} />;
}

export function RatesIcon({ focused }) {
  const user = useSelector(state => state.user.find(user => user.active));
  const { accent } = mapColorsToTheme(user.theme);

  return <RatesImg fill={focused ? accent : $MEDIUMSILVER} />;
}

export function SettingsIcon({ focused }) {
  const user = useSelector(state => state.user.find(user => user.active));
  const { accent } = mapColorsToTheme(user.theme);

  return <SettingsImg fill={focused ? accent : $MEDIUMSILVER} />;
}
