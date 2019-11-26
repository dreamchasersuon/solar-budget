import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import NavigationService from '../navigation/service';
import ButtonWithFeedbackBlue from '../components/buttons/ButtonWithFeedbackBlue';
import Slider from '../components/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import { useTranslation } from 'react-i18next';
import { setLocale } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';

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
  languageSelection: {
    alignItems: 'center',
    marginRight: 30,
    height: 80
  },
  language: {
    fontSize: 16,
    width: 30,
    textAlign: 'center'
  },
  activeLanguage: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
    color: $BLUE
  },
  languagesContainer: {
    width: 30,
    height: 'auto',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: $MEDIUMSILVER,
    borderLeftColor: $MEDIUMSILVER,
    borderBottomColor: $MEDIUMSILVER,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: 5
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

// TODO: import from i18n config
const languages = ['en', 'ru'];

export default function Welcome() {
  const dispatch = useDispatch();

  const dropDownRef = useRef(null);

  const users = useSelector(state => state.user);
  let activeUser;
  let locale = 'en';
  if (users.length) {
    activeUser = users.find(user => user.active);
    locale = activeUser.locale;
  }

  const { t, i18n } = useTranslation([
    'WelcomeScreen',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);

  const [isLanguagesVisible, showLanguages] = useState(false);

  const changeLanguage = language => async () => {
    if (language === locale) {
      return null;
    }
    try {
      dispatch(setLocale({ locale: language, userId: activeUser.id }));
      await i18n.changeLanguage(language);

      dropDownRef.current.alertWithType(
        'success',
        `${t('ApplicationSuccessMessages:setLocaleSuccessMsg')}`,
        ''
      );
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:setLocaleFailedMsg')}`,
        ''
      );
    }
  };

  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.languageSelection}>
          <TouchableOpacity onPress={() => showLanguages(!isLanguagesVisible)}>
            <Text style={styles.language}>{locale.toUpperCase()}</Text>
          </TouchableOpacity>
          {isLanguagesVisible && (
            <FlatList
              data={languages}
              extraData={locale}
              contentContainerStyle={styles.languagesContainer}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={changeLanguage(item)}>
                  <Text
                    style={
                      locale === item ? styles.activeLanguage : styles.language
                    }
                  >
                    {item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          )}
        </View>
      </View>
      <Slider />
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={goTo('Creation')}
          buttonText={t('WelcomeScreen:createAccountLabel')}
        />
        <ButtonWithFeedbackBlue
          buttonStyle={styles.buttonFeedback}
          handleOnPress={users.length > 1 ? goTo('Accounts') : goTo('LoginPin')}
          buttonText={t('WelcomeScreen:loginLabel')}
        />
      </View>
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row'
        }}
        updateStatusBar={false}
        ref={dropDownRef}
      />
    </View>
  );
}
