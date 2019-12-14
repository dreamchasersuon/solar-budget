import { View, StyleSheet, Vibration, Text } from 'react-native';
import mapColorsToTheme, {
  $BLACK,
  $MEDIUMSILVER,
  $RED
} from '../../constants/colorLiterals';
import React, { useState, useRef } from 'react';
import CustomInput from '../CustomInput';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserPasswordThunk,
  setPasswordUpdatePermissionsDenied
} from '../../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';
import setRef from '../../constants/refs';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

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
    height: '100%',
    width: '100%'
  },
  buttonFinish: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  buttonTextStyle: { fontSize: 12 },
  headerTitleModalStyle: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20
  },
  label: { fontSize: 14, marginBottom: 10 },
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
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: $BLACK
  }
});

export default function ModalUpdatePassword() {
  const ref = useRef();
  setRef({ name: 'update_password', ref });
  const fall = new Animated.Value(1);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ModalUpdatePassword');

  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [isValidPassword, setPasswordValidity] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidRepeatedPassword, setRepeatedPasswordValidity] = useState(true);
  const [repeatedPassword, setRepeatedPassword] = useState('');
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

  function onTypePassword(value) {
    setPasswordValidity(true);
    setPassword(value);
  }

  function onTypeRepeatedPassword(value) {
    setRepeatedPasswordValidity(true);
    setRepeatedPassword(value);
  }

  const updatePassword = () => {
    if (!password.length) {
      setPasswordValidity(false);
    }
    if (!repeatedPassword.length) {
      setRepeatedPasswordValidity(false);
    }
    if (!password.length || !repeatedPassword.length) {
      Vibration.vibrate(500);
      return setValidity(false);
    }

    if (
      !password.length ||
      !repeatedPassword.length ||
      password !== repeatedPassword
    ) {
      Vibration.vibrate(500);
      return setValidity(false);
    }

    dispatch(
      updateUserPasswordThunk({ login: user.login, password, userId: user.id })
    );

    setPassword('');
    setRepeatedPassword('');
    dispatch(setPasswordUpdatePermissionsDenied({ login: user.login }));
    ref.current.snapTo(0);
  };

  const denyPermissionsToUpdatePassword = () => {
    setPassword('');
    setRepeatedPassword('');
    dispatch(setPasswordUpdatePermissionsDenied({ login: user.login }));
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
              isValidPassword
                ? styles.purposeInput
                : [styles.purposeInput, { color: $RED, borderColor: $RED }]
            }
            initial={password}
            label={t('passwordInputLabel')}
            placeholder={t('passwordInputText')}
            password
            labelStyle={
              isValidPassword
                ? [styles.label, themeStyles.textColorAccent]
                : styles.labelInvalid
            }
            handleChange={value => onTypePassword(value)}
          />
        </View>
        <View style={styles.purposeInputContainer}>
          <CustomInput
            inputStyle={
              isValidRepeatedPassword
                ? styles.purposeInput
                : [styles.purposeInput, { color: $RED, borderColor: $RED }]
            }
            initial={repeatedPassword}
            label={t('confirmPasswordInputLabel')}
            placeholder={t('confirmPasswordInputText')}
            password
            labelStyle={
              isValidRepeatedPassword
                ? [styles.label, themeStyles.textColorAccent]
                : styles.labelInvalid
            }
            handleChange={value => onTypeRepeatedPassword(value)}
          />
        </View>
        <ButtonSecondary
          buttonTextStyle={
            isValid
              ? [styles.buttonTextStyle, themeStyles.textColorAccent]
              : [styles.buttonTextStyle, { color: $RED }]
          }
          handleOnPress={updatePassword}
          buttonStyle={styles.buttonFinish}
          buttonText={t('updateButtonLabel')}
        />
      </View>
    );
  };
  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0]
    });
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity
          }
        ]}
      />
    );
  };
  return (
    <>
      <BottomSheet
        ref={ref}
        enabledContentGestureInteraction={false}
        callbackNode={fall}
        snapPoints={[0, 300]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onCloseEnd={denyPermissionsToUpdatePassword}
      />
      {renderShadow()}
    </>
  );
}
