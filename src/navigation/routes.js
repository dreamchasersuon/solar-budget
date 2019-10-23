import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TargetsImg from '../../assets/target.svg';
import SettingsImg from '../../assets/settings.svg';
import RatesImg from '../../assets/rates.svg';
import WalletImg from '../../assets/wallet.svg';
import React from 'react';
import Wallet from '../screens/Wallet';
import Targets from '../screens/Targets';
import Rates from '../screens/Rates';
import Settings from '../screens/Settings';
import Statistics from '../screens/Stats';
import Welcome from '../screens/Welcome';
import LoginCredentials from '../screens/LoginCredentials';
import Creation from '../screens/Creation';
import CreatePinCode from '../screens/CreatePin';
import AcceptPinCode from '../screens/AcceptPin';
import Fingerprint from '../screens/Fingerprint';
import LoginPin from '../screens/LoginPin';

const WalletScreen = createStackNavigator({
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      header: null,
      headerStyle: {
        marginLeft: 30,
        marginTop: 20,
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  Statistics: {
    screen: Statistics,
    navigationOptions: {
      header: null,
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
      header: null,
      headerStyle: {
        marginLeft: 30,
        marginTop: 20,
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  }
});

const TargetsScreen = createStackNavigator({
  Targets: {
    screen: Targets,
    navigationOptions: {
      header: null,
      headerStyle: {
        marginLeft: 30,
        marginTop: 20,
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  }
});

const SettingsScreen = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      header: null,
      headerStyle: {
        marginLeft: 30,
        marginTop: 20,
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  }
});

const BottomTabsBarNavigator = createBottomTabNavigator(
  {
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarIcon: <WalletImg />
      }
    },
    Targets: {
      screen: TargetsScreen,
      navigationOptions: {
        tabBarIcon: <TargetsImg />
      }
    },
    Rates: {
      screen: RatesScreen,
      navigationOptions: {
        tabBarIcon: <RatesImg />
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: <SettingsImg />
      }
    }
  },
  {
    initialRouteName: 'Wallet',
    tabBarOptions: {
      showLabel: false,
      style: {
        elevation: 10,
        borderTopWidth: 0,
        height: 60
      }
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    LoginCredentials: {
      screen: LoginCredentials,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    Creation: {
      screen: Creation,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    CreatePin: {
      screen: CreatePinCode,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    AcceptPin: {
      screen: AcceptPinCode,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    AddFingerprint: {
      screen: Fingerprint,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
    LoginPin: {
      screen: LoginPin,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginLeft: 30,
          marginTop: 20,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    }
  },
  {
    initialRouteName: 'LoginPin'
  }
);

const AppStack = createStackNavigator(
  {
    Auth: {
      screen: AuthStack
    },
    App: {
      screen: BottomTabsBarNavigator
    }
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);
