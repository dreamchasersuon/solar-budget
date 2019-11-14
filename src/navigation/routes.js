import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Animated, Easing } from 'react-native';
// eslint-disable-next-line import/named
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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
import { $WHITE } from '../constants/colorLiterals';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };

      const lastSceneIndex = scenes[scenes.length - 1].index;

      if (lastSceneIndex - toIndex > 1) {
        if (scene.index === toIndex) return;

        if (scene.index !== lastSceneIndex) return { opacity: 0 };

        return slideFromBottom;
      }

      return slideFromRight;
    }
  };
};

const WalletScreen = createStackNavigator(
  {
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
  },
  {
    transitionConfig
  }
);

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
    initialRouteName: 'Settings',
    resetOnBlur: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      iconStyle: {
        marginTop: 4
      },
      style: {
        elevation: 10,
        borderTopWidth: 0,
        backgroundColor: $WHITE,
        height: 60
      }
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    LoginCredentials: {
      screen: LoginCredentials
    },
    Creation: {
      screen: Creation
    },
    CreatePin: {
      screen: CreatePinCode
    },
    AcceptPin: {
      screen: AcceptPinCode
    },
    AddFingerprint: {
      screen: Fingerprint
    },
    LoginPin: {
      screen: LoginPin
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
    transitionConfig
  }
);

const AppStack = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack
    },
    App: {
      screen: BottomTabsBarNavigator
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(AppStack);
