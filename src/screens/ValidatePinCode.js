import React, { useState, useRef } from 'react';
import { View, StyleSheet, Vibration, StatusBar } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import mapColorsToTheme, { $LIGHT_BLUE } from '../constants/colorLiterals';
import { validatePinCode } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';
import { timezone as Localization_timezone } from 'expo-localization';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
// eslint-disable-next-line import/no-commonjs
const CryptoJS = require('crypto-js');

const styles = StyleSheet.create({
  backArrow: {
    left: 20,
    position: 'absolute',
    top: 60
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  numberStyle: {
    fontSize: 40
  },
  numericBoardContainerStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    width: 65
  },
  numericBoardContainerWithMarginStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    marginLeft: 88,
    width: 65
  },
  numericBoardWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 240
  },
  paginationActive: {
    backgroundColor: $LIGHT_BLUE,
    borderRadius: 50,
    height: 10,
    width: 10
  }
});

export default function ValidatePinCode({ navigation }) {
  const dropDownRef = useRef(null);

  const timezone = Localization_timezone;

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation([
    'ValidatePinScreen',
    'ApplicationMessages',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);

  const users = useSelector(state => state.user);
  const multiAccUser = users.find(user => user.multiAccountSelect);
  let activeUser;
  if (multiAccUser) {
    activeUser = multiAccUser;
  } else {
    activeUser = users.find(user => user.active);
  }
  const { background_bottom, text_main, accent } = mapColorsToTheme(
    activeUser.theme
  );
  const themeStyles = StyleSheet.create({
    textMain: {
      color: text_main
    },
    backgroundMain: {
      backgroundColor: background_bottom
    },
    backgroundAccent: {
      backgroundColor: accent
    }
  });

  const [pinCode, setPin] = useState('');
  const goBack = () => NavigationService.goBack();

  const setPinCode = value => () => {
    const updatePinCode = pinCode + value;
    if (value === 'delete') {
      return setPin(pinCode.slice(0, -1));
    }
    setPin(updatePinCode);
  };

  const validatePin = () => {
    setPin('');
    try {
      const userId = navigation.getParam('userId', {});
      dispatch(validatePinCode({ pinCode, userId }));
      dropDownRef.current.alertWithType(
        'success',
        `${t('ApplicationSuccessMessages:sendNewPasswordMsg')}`,
        `${t('ApplicationSuccessMessages:sendNewPasswordMsgNote')}`
      );
      setTimeout(async () => {
        const user = users.find(user => user.id === userId);
        const date = moment(new Date())
          .tz(timezone)
          .format('LTS');
        const password = CryptoJS.AES.encrypt(pinCode, date)
          .toString()
          .substr(3, 6);
        await Notifications.presentLocalNotificationAsync({
          title: `${t('ApplicationMessages:passwordRecoveryMsg')}`,
          body: `${t(
            'ApplicationMessages:passwordRecoveryMsgNote'
          )} ${password}`,
          data: { password, login: user.login, userId: user.id }
        });
        goBack();
      }, 1000);
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:wrongPinMsg')}`,
        `${t('ApplicationErrorMessages:wrongPinMsgNote')}`
      );
      Vibration.vibrate(500);
    }
  };

  if (pinCode.length === 4) return validatePin();

  return (
    <View style={[styles.container, themeStyles.backgroundMain]}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} fill={text_main} />
      <SecurePin
        paginationIndicatorStyle={[
          styles.paginationActive,
          themeStyles.backgroundAccent
        ]}
        pinCodeLength={pinCode.length}
        title={t('ValidatePinScreen:headerTitle')}
        titleThemeStyle={themeStyles.textMain}
      />
      <NumericBoard
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        containerWithMarginStyle={styles.numericBoardContainerWithMarginStyle}
        onPressNumber={value => setPinCode(value)}
        hasDelete
        bigDelete
        needNullAlignment
        numberStyle={[styles.numberStyle, themeStyles.textMain]}
        deleteColor={text_main}
        rippleColor={accent}
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
