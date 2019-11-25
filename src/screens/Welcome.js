import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationService from '../navigation/service';
import ButtonWithFeedbackBlue from '../components/buttons/ButtonWithFeedbackBlue';
import Slider from '../components/Slider';
import { useSelector } from 'react-redux';
import { $BLUE } from '../constants/colorLiterals';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    width: '100%'
  },
  language: {
    fontSize: 16,
    marginRight: 30
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

export default function Welcome() {
  const users = useSelector(state => state.user);
  const { t, i18n } = useTranslation('WelcomeScreen');

  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>EN</Text>
      </View>
      <Slider />
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={goTo('Creation')}
          buttonText={t('createAccountLabel')}
        />
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={users.length > 1 ? goTo('Accounts') : goTo('LoginPin')}
          buttonText={t('loginLabel')}
        />
      </View>
    </View>
  );
}
