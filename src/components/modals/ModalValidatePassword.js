import { Modal, View, StyleSheet, Vibration } from 'react-native';
import {
  $BLACK_FADE,
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $RED,
  $WHITE
} from '../../constants/colorLiterals';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from '../CustomInput';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { useDispatch, useSelector } from 'react-redux';
import { validateUserPassword } from '../../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  buttonFinish: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  buttonTextStyle: { color: $LIGHT_BLUE, fontSize: 16 },
  closeModal: {
    alignItems: 'center',
    borderColor: $LIGHT_BLUE,
    borderRadius: 50,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    marginLeft: 60,
    width: 30
  },
  headerModalStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5
  },
  headerTitleModalStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 80,
    marginTop: 20
  },
  label: { color: $LIGHT_BLUE, fontSize: 14, marginBottom: 10 },
  labelInvalid: {
    color: $RED,
    fontSize: 14,
    marginBottom: 10
  },
  modalActiveArea: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
    height: '31%',
    width: '100%'
  },
  modalHiddenArea: {
    alignItems: 'flex-end',
    backgroundColor: $BLACK_FADE,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end'
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

export default function ValidatePasswordModal({
  isVisible,
  toggleValidatePasswordModal
}) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ModalValidatePassword');

  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [isValidPassword, setPasswordValidity] = useState(true);
  const [password, setPassword] = useState('');

  function onTypePassword(value) {
    setPasswordValidity(true);
    setPassword(value);
  }

  const validatePassword = () => {
    if (!password.length) {
      Vibration.vibrate(500);
      return setValidity(false);
    }

    try {
      dispatch(
        validateUserPassword({
          password,
          userId: user.id
        })
      );
      toggleValidatePasswordModal();
    } catch (e) {
      Vibration.vibrate(500);
    }

    setPassword('');
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleValidatePasswordModal}
            title={t('headerTitle')}
          />
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
              labelStyle={isValidPassword ? styles.label : styles.labelInvalid}
              handleChange={value => onTypePassword(value)}
            />
          </View>
          <ButtonSecondary
            buttonTextStyle={
              isValid
                ? styles.buttonTextStyle
                : [styles.buttonTextStyle, { color: $RED }]
            }
            handleOnPress={validatePassword}
            buttonStyle={styles.buttonFinish}
            buttonText={t('validateButtonLabel')}
          />
        </View>
      </View>
    </Modal>
  );
}
