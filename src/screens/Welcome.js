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
import mapColorsToTheme from '../constants/colorLiterals';
import { useTranslation } from 'react-i18next';
import { setLocale } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import { supportedLanguages } from '../i18n/i18n';

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
    minHeight: 100,
    width: 40
  },
  language: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
    marginBottom: 5
  },
  activeLanguage: {
    fontSize: 16,
    width: 30,
    textAlign: 'center'
  },
  languagesContainer: {
    width: 30,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
    height: 'auto',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: 5,
    elevation: 6
  },
  buttonFeedback: {
    alignItems: 'center',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function Welcome() {
  const dispatch = useDispatch();

  const dropDownRef = useRef(null);

  const users = useSelector(state => state.user);
  let activeUser;
  if (users.length) {
    activeUser = users.find(user => user.active);
  }
  const {
    background_bottom,
    background_top,
    accent,
    text_main
  } = mapColorsToTheme(activeUser.theme);
  const themeStyles = StyleSheet.create({
    backgroundMainBottom: {
      backgroundColor: background_bottom
    },
    backgroundMainTop: {
      backgroundColor: background_top
    },
    textMain: {
      color: text_main
    },
    backgroundAccent: {
      backgroundColor: accent
    },
    textAccent: {
      color: accent
    }
  });

  const { t, i18n } = useTranslation([
    'WelcomeScreen',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);
  const locale = i18n.languages[0].slice(0, 2);
  const languages = supportedLanguages;
  const [isLanguagesVisible, showLanguages] = useState(false);

  const changeLanguage = language => async () => {
    if (language === locale) {
      return null;
    }
    try {
      dispatch(setLocale({ locale: language, userId: activeUser.id }));
      await i18n.changeLanguage(language);
      showLanguages(!isLanguagesVisible);

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
    <View style={[styles.container, themeStyles.backgroundMainBottom]}>
      <View style={styles.header}>
        <View style={styles.languageSelection}>
          <TouchableOpacity onPress={() => showLanguages(!isLanguagesVisible)}>
            <Text style={[styles.language, themeStyles.textMain]}>
              {locale.toUpperCase()}
            </Text>
          </TouchableOpacity>
          {isLanguagesVisible && (
            <FlatList
              data={languages}
              extraData={locale}
              contentContainerStyle={[
                styles.languagesContainer,
                themeStyles.backgroundMainTop
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={changeLanguage(item)}>
                  <Text
                    style={
                      locale === item
                        ? [styles.activeLanguage, themeStyles.textAccent]
                        : [styles.language, themeStyles.textMain]
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
      <Slider backgroundAccent={accent} textMain={text_main} />
      <View style={styles.buttonsContainer}>
        <ButtonWithFeedbackBlue
          buttonStyle={[styles.buttonFeedback, themeStyles.backgroundAccent]}
          handleOnPress={goTo('Creation')}
          buttonText={t('WelcomeScreen:createAccountLabel')}
        />
        <ButtonWithFeedbackBlue
          buttonStyle={[styles.buttonFeedback, themeStyles.backgroundAccent]}
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
