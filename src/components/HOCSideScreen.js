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
  $BLUE,
  $LIGHTSILVER,
  $MEDIUMSILVER,
  $WHITE
} from '../constants/colorLiterals';
import ButtonWithFeedbackBlue from './buttons/ButtonWithFeedbackBlue';
import ButtonSecondary from './buttons/ButtonSecondary';

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: $BLUE
  },
  buttonsContainer: {
    alignItems: 'center',
    height: 140,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: 20,
    width: '100%'
  },
  container: {
    backgroundColor: $LIGHTSILVER,
    ...StyleSheet.absoluteFillObject
  },
  content: {
    height: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingTop: 140
  },
  note: {
    color: $MEDIUMSILVER,
    fontSize: 11,
    marginTop: 10,
    width: 180
  },
  termsOfUse: {
    borderBottomWidth: 1,
    borderColor: $MEDIUMSILVER,
    height: 27,
    marginTop: 20,
    width: 270
  },
  termsOfUseText: {
    fontSize: 16
  },
  buttonFeedback: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
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
              <ButtonWithFeedbackBlue
                buttonStyle={styles.buttonFeedback}
                buttonText="Оставить отзыв"
              />
              <ButtonWithFeedbackBlue
                buttonStyle={styles.buttonFeedback}
                buttonText="Техническая поддержка"
              />
              <ButtonSecondary
                buttonText="Пожертвование"
                buttonTextStyle={styles.buttonTextStyle}
              />
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
