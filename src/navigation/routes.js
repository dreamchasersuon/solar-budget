import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Animated, Easing } from 'react-native';
// eslint-disable-next-line import/named
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Wallet from '../screens/Wallet';
import Targets from '../screens/Targets';
import Rates from '../screens/Rates';
import Settings from '../screens/Settings';
import Statistics from '../screens/Stats';
import Welcome from '../screens/Welcome';
import LoginCredentials from '../screens/LoginCredentials';
import CreateAccount from '../screens/CreateAccount';
import CreatePinCode from '../screens/CreatePin';
import AcceptPinCode from '../screens/AcceptPin';
import Fingerprint from '../screens/Fingerprint';
import LoginPin from '../screens/LoginPin';
import SelectAccount from '../screens/SelectAccount';
import ChangePinCode from '../screens/ChangePinCode';
import ForgotPassword from '../screens/ForgotPassword';
import ValidatePinCode from '../screens/ValidatePinCode';
import ChangeLanguage from '../screens/ChangeLanguage';
import BottomTabNavigator from '../components/BottomTabNavigator';
import {
  WalletIcon,
  RatesIcon,
  SettingsIcon,
  TargetsIcon
} from '../components/TabIcons';

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

      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      // We can access our navigation params on the scene's 'route' property
      const thisSceneParams = scene.route.params || {};

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1]
      });

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const scaleWithOpacity = {
        opacity,
        transform: [{ scaleX: scale }, { scaleY: scale }]
      };
      const slideInFromBottom = { transform: [{ translateY }] };

      if (thisSceneParams.plain) return slideFromRight;
      else if (index < 5) return slideInFromBottom;
      return scaleWithOpacity;
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

WalletScreen.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

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
      },
      tabBarVisible: false
    }
  },
  ChangePinCode: {
    screen: ChangePinCode,
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
  ChangeLanguage: {
    screen: ChangeLanguage,
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

SettingsScreen.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const BottomTabsBarNavigator = createBottomTabNavigator(
  {
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }) => <WalletIcon focused={focused} />
      }
    },
    Targets: {
      screen: TargetsScreen,
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }) => <TargetsIcon focused={focused} />
      }
    },
    Rates: {
      screen: RatesScreen,
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }) => <RatesIcon focused={focused} />
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} />
      }
    }
  },
  {
    initialRouteName: 'Wallet',
    resetOnBlur: true,
    // eslint-disable-next-line react/display-name
    tabBarComponent: props => <BottomTabNavigator {...props} />,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      iconStyle: {
        marginTop: 4
      }
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    Accounts: {
      screen: SelectAccount
    },
    LoginCredentials: {
      screen: LoginCredentials
    },
    ForgotPassword: {
      screen: ForgotPassword
    },
    ValidatePinCode: {
      screen: ValidatePinCode
    },
    Creation: {
      screen: CreateAccount
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
    initialRouteName: 'App'
  }
);

export default createAppContainer(AppStack);
