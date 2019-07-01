import { 
    createStackNavigator, 
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import React from 'react';
import Wallet from '../screens/Wallet';
import Targets from '../screens/Targets';
import Rates from '../screens/Rates';
import Settings from '../screens/Settings';

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

const WalletScreen = createStackNavigator({
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            header: null,
            title: 'Кошелёк',
            headerStyle: {
                marginLeft: 30,
                marginTop: 20,
                borderBottomWidth: 0,
                elevation: 0
            }
        }
    }
});

const RatesScreen = createStackNavigator({
    Rates: {
        screen: Rates,
        navigationOptions: {
            title: 'Курсы валют'
        }
    }
});

const TargetsScreen = createStackNavigator({
    Targets: {
        screen: Targets,
        navigationOptions: {
            title: 'Цели'
        }
    }
});

const SettingsScreen = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Настройки'
        }
    }
});

const BottomTabsBarNavigator = createBottomTabNavigator(
    {
        Wallet: {
            screen: WalletScreen,
            navigationOptions: {
                tabBarIcon: <Image source={require('../../assets/wallet.png')} 
                                   style={styles.icon}
                            />
            }
        },
        Targets: {
            screen: TargetsScreen,
            navigationOptions: {
                tabBarIcon: <Image source={require('../../assets/targets.png')} 
                                   style={styles.icon} 
                            />
            }
        },
        Rates: {
            screen: RatesScreen,
            navigationOptions: {
                tabBarIcon: <Image source={require('../../assets/rates.png')} 
                                   style={styles.icon} 
                            />
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: <Image source={require('../../assets/settings.png')} 
                                   style={styles.icon} 
                            />
            }
        }
    },
    {
        initialRouteName: 'Wallet',
        tabBarOptions: {
            showLabel: false,
            style: {
                elevation: 8,
                borderTopWidth: 0
            }
        },
        defaultNavigationOptions: {
            headerStyle: {
                marginLeft: 30,
                borderBottomWidth: 0,
                elevation: 0
            },
            headerTitleStyle: {
                fontWeight: 'regular'
            }
        }
    }

);

// eslint-disable-next-line no-undef
export default AppNavigator = createAppContainer(BottomTabsBarNavigator);