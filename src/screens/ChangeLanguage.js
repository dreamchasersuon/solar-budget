import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import NavigationService from '../navigation/service';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useSelector, useDispatch } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { useTranslation } from 'react-i18next';
import { setLocale } from '../redux/features/userFeatureSlice';
import { supportedLanguages } from '../i18n/i18n';
import SelectedRatePair from '../../assets/selected_rate-pair.svg';
import UnselectedRatePair from '../../assets/unselected_rate-pair.svg';
import mapColorsToTheme from '../constants/colorLiterals';

const styles = StyleSheet.create({
  backArrow: {
    width: '100%',
    marginTop: 60,
    paddingLeft: 20
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  languagesContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  },
  language: {
    width: 300,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default function ChangeLanguage() {
  const dropDownRef = useRef(null);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation([
    'ChangeLanguageScreen',
    'ApplicationErrorMessages',
    'ApplicationSuccessMessages'
  ]);

  const users = useSelector(state => state.user);
  const user = users.find(user => user.active);
  const { background_bottom, text_main, accent } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    containerBackground: {
      backgroundColor: background_bottom
    },
    textMain: {
      color: text_main
    }
  });

  const locale = user.locale;
  const languages = supportedLanguages;

  const changeLanguage = language => async () => {
    if (language === locale) {
      return null;
    }
    try {
      dispatch(setLocale({ locale: language, userId: user.id }));
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

  const localeToLanguageNameMapping = {
    en: t('ChangeLanguageScreen:englishLanguage'),
    ru: t('ChangeLanguageScreen:russianLanguage')
  };

  const goBack = () => NavigationService.goBack();
  return (
    <View style={[styles.container, themeStyles.containerBackground]}>
      <View style={styles.backArrow}>
        <ArrowLeft onPress={goBack} fill={text_main} />
      </View>
      <FlatList
        data={languages}
        extraData={user}
        contentContainerStyle={styles.languagesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={changeLanguage(item)}
            style={styles.language}
          >
            <Text style={themeStyles.textMain}>
              {localeToLanguageNameMapping[item]}
            </Text>
            {locale === item ? (
              <SelectedRatePair fill={accent} />
            ) : (
              <UnselectedRatePair fill={text_main} />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
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
