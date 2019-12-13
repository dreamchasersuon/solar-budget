import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity
} from 'react-native';
import LogoLightTheme from '../../assets/logo.svg';
import LogoDarkTheme from '../../assets/logo_dark.svg';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $LIGHTSILVER,
  $MEDIUMSILVER
} from '../constants/colorLiterals';
import ButtonWithFeedbackBlue from './buttons/ButtonWithFeedbackBlue';
import ButtonSecondary from './buttons/ButtonSecondary';
import { Translation } from 'react-i18next';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
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
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

function withSideScreen(Component) {
  return class SideScreen extends React.Component {
    renderParallaxDrawer = progressValue => {
      // eslint-disable-next-line no-invalid-this
      const { accent, text_main } = mapColorsToTheme(this.props.user.theme);
      const themeStyles = StyleSheet.create({
        textAccent: {
          color: accent
        },
        textMain: {
          color: text_main
        },
        backgroundAccent: {
          backgroundColor: accent
        }
      });
      const parallax = progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
      });
      const animatedStyles = {
        transform: [{ translateX: parallax }]
      };
      return (
        <Animated.View style={animatedStyles}>
          <View style={styles.content}>
            <View>
              {/* eslint-disable-next-line no-invalid-this */}
              {this.props.user.theme === 'light' ? (
                <LogoLightTheme />
              ) : (
                <LogoDarkTheme />
              )}
              <Translation ns="HOCSideScreen">
                {(t, { i18n }) => (
                  <Text style={styles.note}>{t('headerTitle')}</Text>
                )}
              </Translation>
            </View>
            <View>
              <TouchableOpacity style={styles.termsOfUse}>
                <Translation ns="HOCSideScreen">
                  {(t, { i18n }) => (
                    <Text style={[styles.termsOfUseText, themeStyles.textMain]}>
                      {t('termsOfUseButtonLabel')}
                    </Text>
                  )}
                </Translation>
              </TouchableOpacity>
              <TouchableOpacity style={styles.termsOfUse}>
                <Text style={styles.termsOfUseText}>
                  <Translation ns="HOCSideScreen">
                    {(t, { i18n }) => (
                      <Text
                        style={[styles.termsOfUseText, themeStyles.textMain]}
                      >
                        {t('privacyPolicyButtonLabel')}
                      </Text>
                    )}
                  </Translation>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <Translation ns="HOCSideScreen">
                {(t, { i18n }) => (
                  <ButtonWithFeedbackBlue
                    buttonStyle={[
                      styles.buttonFeedback,
                      themeStyles.backgroundAccent
                    ]}
                    buttonText={t('giveFeedbackButtonLabel')}
                  />
                )}
              </Translation>
              <Translation ns="HOCSideScreen">
                {(t, { i18n }) => (
                  <ButtonWithFeedbackBlue
                    buttonStyle={[
                      styles.buttonFeedback,
                      themeStyles.backgroundAccent
                    ]}
                    buttonText={t('techSupportButtonLabel')}
                  />
                )}
              </Translation>
              <Translation ns="HOCSideScreen">
                {(t, { i18n }) => (
                  <ButtonSecondary
                    buttonText={t('donationButtonLabel')}
                    buttonTextStyle={themeStyles.textAccent}
                  />
                )}
              </Translation>
            </View>
          </View>
        </Animated.View>
      );
    };

    render() {
      const { background_top } = mapColorsToTheme(this.props.user.theme);
      return (
        <View style={styles.container}>
          <DrawerLayout
            drawerWidth={320}
            keyboardDismissMode="on-drag"
            drawerPosition={DrawerLayout.positions.Left}
            drawerType={'back'}
            drawerBackgroundColor={background_top}
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

const mapStateToProps = state => ({
  user: state.user.find(user => user.active)
});

const composedHOC = compose(connect(mapStateToProps, null), withSideScreen);
export default composedHOC;
