import React from 'react';
import { Platform, StyleSheet, Text, Animated, View } from 'react-native';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { $BLUE, $LIGHTSILVER, $WHITE } from '../constants/colorLiterals';

export default function withSideScreen(Component) {
  return class SideScreen extends React.Component {
    constructor(props) {
      super(props);
    }
    renderParallaxDrawer = progressValue => {
      const parallax = progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
      });
      const animatedStyles = {
        transform: [{ translateX: parallax }]
      };
      return (
        <Animated.View style={[styles.drawerContainer, animatedStyles]}>
          <Text style={styles.drawerText}>I am in the drawer!</Text>
          <Text style={styles.drawerText}>
            Watch parallax animation while you pull the drawer!
          </Text>
        </Animated.View>
      );
    };

    render() {
      return (
        <View style={styles.container}>
          <DrawerLayout
            drawerWidth={300}
            keyboardDismissMode="on-drag"
            drawerPosition={DrawerLayout.positions.Left}
            drawerType={'back'}
            drawerBackgroundColor="#ddd"
            renderNavigationView={this.renderParallaxDrawer}
            contentContainerStyle={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 60
              },
              android: {
                elevation: 100,
                backgroundColor: '#000'
              }
            })}
          >
            <Component {...this.props} />
          </DrawerLayout>
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 10
  },
  drawerText: {
    margin: 10,
    fontSize: 15,
    textAlign: 'left'
  },
  container: {
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject
  },
  transactionsContainer: {
    width: '90%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '59%'
  },
  buttonStyle: {
    backgroundColor: $BLUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 4,
    width: 100,
    height: 26
  },
  buttonTextStyle: {
    color: $WHITE
  },
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 135,
    justifyContent: 'space-between'
  }
});
