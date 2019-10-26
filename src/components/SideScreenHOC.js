import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity
} from 'react-native';
import Logo from '../../assets/logo.svg';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {
  $LIGHTSILVER,
  $MEDIUMSILVER,
  $WHITE
} from '../constants/colorLiterals';
import MajorBlueButton from './MajorBlueButton';
import SecondaryButton from './SecondaryButton';

const styles = StyleSheet.create({
  content: {
    paddingTop: 140,
    paddingLeft: 30,
    justifyContent: 'space-between',
    height: '100%'
  },
  container: {
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject
  },
  note: {
    fontSize: 11,
    color: $MEDIUMSILVER,
    marginTop: 10,
    width: 180
  },
  termsOfUse: {
    borderBottomWidth: 1,
    borderColor: $MEDIUMSILVER,
    height: 27,
    width: 270,
    marginTop: 20
  },
  termsOfUseText: {
    fontSize: 16
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 20,
    height: 140,
    width: '100%'
  }
});

export default function withSideScreen(Component) {
  return class SideScreen extends React.Component {
    renderParallaxDrawer = progressValue => {
      const parallax = progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
      });
      const animatedStyles = {
        transform: [{ translateX: parallax }]
      };
      return (
        <Animated.View style={[animatedStyles]}>
          <View style={styles.content}>
            <View>
              <Logo />
              <Text style={styles.note}>
                Следите за своими финансами и исполняйте мечты вместе с нами
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.termsOfUse}>
                <Text style={styles.termsOfUseText}>Условия и положения</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.termsOfUse}>
                <Text style={styles.termsOfUseText}>
                  Политика конфиденциальности
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <MajorBlueButton buttonText="Оставить отзыв" />
              <MajorBlueButton buttonText="Техническая поддержка" />
              <SecondaryButton buttonText="Пожертвование" />
            </View>
          </View>
        </Animated.View>
      );
    };

    render() {
      return (
        <View style={styles.container}>
          <DrawerLayout
            drawerWidth={320}
            keyboardDismissMode="on-drag"
            drawerPosition={DrawerLayout.positions.Left}
            drawerType={'back'}
            drawerBackgroundColor={$WHITE}
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
