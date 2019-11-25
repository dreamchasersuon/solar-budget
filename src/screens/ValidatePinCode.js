import React, { useState, useRef } from 'react';
import { View, StyleSheet, Vibration, StatusBar } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { $BLUE } from '../constants/colorLiterals';
import { validatePinCode } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';
import { useTranslation } from 'react-i18next';
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
    backgroundColor: $BLUE,
    borderRadius: 50,
    height: 10,
    width: 10
  }
});

export default function ValidatePinCode({ navigation }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ValidatePinScreen');

  const users = useSelector(state => state.user);
  const dropDownRef = useRef(null);

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
        'Отправили новый пароль',
        'Дождитесь уведомления от приложения'
      );
      setTimeout(async () => {
        const user = users.find(user => user.id === userId);
        const date = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getMinutes()}}`;
        const password = CryptoJS.AES.encrypt(pinCode, date)
          .toString()
          .substr(3, 6);
        await Notifications.presentLocalNotificationAsync({
          title: 'Восстановление пароля',
          body: `Ваш пароль: ${password}`,
          data: { password, login: user.login, userId: user.id }
        });
        goBack();
      }, 1000);
    } catch (e) {
      dropDownRef.current.alertWithType(
        'error',
        'Неверный PIN-CODE',
        'Попробуйте еще раз'
      );
      Vibration.vibrate(500);
    }
  };

  if (pinCode.length === 4) return validatePin();

  return (
    <View style={styles.container}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} />
      <SecurePin
        paginationIndicatorStyle={styles.paginationActive}
        pinCodeLength={pinCode.length}
        title={t('headerTitle')}
      />
      <NumericBoard
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        containerWithMarginStyle={styles.numericBoardContainerWithMarginStyle}
        onPressNumber={value => setPinCode(value)}
        hasDelete
        bigDelete
        needNullAlignment
        numberStyle={styles.numberStyle}
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
