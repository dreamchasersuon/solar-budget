import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import Wallet from '../screens/Wallet';

const WalletScreen = createStackNavigator({
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            title: 'Кошелёк'
        }
    }
});

export default AppNavigator = createAppContainer(WalletScreen);