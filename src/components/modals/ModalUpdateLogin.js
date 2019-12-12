import { Modal, View, StyleSheet, Vibration, Text } from 'react-native';
import mapColorsToTheme, {
  $BLACK_FADE,
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $RED,
  $WHITE
} from '../../constants/colorLiterals';
import React, { useState, useRef } from 'react';
import CustomInput from '../CustomInput';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLoginThunk } from '../../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';
import setRef from '../../constants/refs';
import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  modalHeader: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalActiveArea: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    height: '100%',
    width: '100%'
  },
  buttonFinish: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle: { color: $LIGHT_BLUE, fontSize: 16 },
  headerTitleModalStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20
  },
  label: { color: $LIGHT_BLUE, fontSize: 14, marginBottom: 10 },
  labelInvalid: {
    color: $RED,
    fontSize: 14,
    marginBottom: 10
  },
  purposeInput: {
    borderColor: $MEDIUMSILVER,
    borderRadius: 3,
    borderWidth: 1,
    color: $MEDIUMSILVER,
    fontSize: 10,
    height: 35,
    paddingLeft: 10,
    width: '100%'
  },
  purposeInputContainer: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  }
});

export default function UpdateLoginModal() {
  const ref = useRef();
  setRef({ name: 'update_login', ref });

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ModalUpdateLogin');

  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [isValidLogin, setLoginValidity] = useState(true);
  const [login, setLogin] = useState('');
  const { background_top, accent, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    modalActiveAreaBackground: {
      backgroundColor: background_top
    },
    textColorMain: {
      color: text_main
    },
    textColorAccent: {
      color: accent
    }
  });

  function onTypeLogin(value) {
    setLoginValidity(true);
    setLogin(value);
  }

  const updateLogin = () => {
    if (!login.length) {
      setLoginValidity(false);
    }
    if (!login.length) {
      Vibration.vibrate(500);
      return setValidity(false);
    }

    dispatch(
      updateUserLoginThunk({ password: user.password, login, userId: user.id })
    );

    setLogin('');
    ref.current.snapTo(0);
  };

  const clearInputs = () => {
    setLogin('');
  };
  const renderHeader = () => {
    return (
      <View style={[themeStyles.modalActiveAreaBackground, styles.modalHeader]}>
        <Text style={[styles.headerTitleModalStyle, themeStyles.textColorMain]}>
          {t('headerTitle')}
        </Text>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View
        style={[styles.modalActiveArea, themeStyles.modalActiveAreaBackground]}
      >
        <View style={styles.purposeInputContainer}>
          <CustomInput
            inputStyle={
              isValidLogin
                ? styles.purposeInput
                : [styles.purposeInput, { color: $RED, borderColor: $RED }]
            }
            label={t('loginInputLabel')}
            placeholder={t('loginInputText')}
            labelStyle={
              isValidLogin
                ? [styles.label, themeStyles.textColorAccent]
                : styles.labelInvalid
            }
            handleChange={value => onTypeLogin(value)}
          />
        </View>
        <ButtonSecondary
          buttonTextStyle={
            isValid
              ? [styles.buttonTextStyle, themeStyles.textColorAccent]
              : [styles.buttonTextStyle, { color: $RED }]
          }
          handleOnPress={updateLogin}
          buttonStyle={styles.buttonFinish}
          buttonText={t('updateButtonLabel')}
        />
      </View>
    );
  };
  return (
    <BottomSheet
      ref={ref}
      enabledContentGestureInteraction={false}
      snapPoints={[0, 200]}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onCloseEnd={clearInputs}
    />
  );
}
