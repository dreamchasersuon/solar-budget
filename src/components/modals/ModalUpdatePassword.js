import { Modal, View, StyleSheet, Vibration } from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../../constants/colorLiterals';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from '../CustomInput';
import SecondaryButton from '../SecondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserPasswordThunk,
  setPasswordUpdatePermissionsDenied
} from '../../redux/features/userFeatureSlice';

const styles = StyleSheet.create({
  buttonFinish: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  buttonTextStyle: { color: $BLUE, fontSize: 16 },
  closeModal: {
    alignItems: 'center',
    borderColor: $BLUE,
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
  label: { color: $BLUE, fontSize: 14, marginBottom: 10 },
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
    height: '45%',
    width: '100%'
  },
  modalHiddenArea: {
    alignItems: 'flex-end',
    backgroundColor: $TRANSPARENT,
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

export default function UpdatePasswordModal({
  isVisible,
  toggleUpdatePasswordModal
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [isValidPassword, setPasswordValidity] = useState(true);
  const [password, setPassword] = useState('');

  const [isValidRepeatedPassword, setRepeatedPasswordValidity] = useState(true);
  const [repeatedPassword, setRepeatedPassword] = useState('');

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
    toggleUpdatePasswordModal();
  };

  const closeModal = () => {
    dispatch(setPasswordUpdatePermissionsDenied({ login: user.login }));
    toggleUpdatePasswordModal();
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={closeModal}
            title="Изменение пароля"
          />
          <View style={styles.purposeInputContainer}>
            <CustomInput
              inputStyle={
                isValidPassword
                  ? styles.purposeInput
                  : [styles.purposeInput, { color: $RED, borderColor: $RED }]
              }
              initial={password}
              placeholder="Введите новый пароль"
              label="Новый пароль"
              password
              labelStyle={isValidPassword ? styles.label : styles.labelInvalid}
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
              placeholder="Подтвердите пароль"
              label="Подтверждение пароля"
              password
              labelStyle={
                isValidRepeatedPassword ? styles.label : styles.labelInvalid
              }
              handleChange={value => onTypeRepeatedPassword(value)}
            />
          </View>
          <SecondaryButton
            buttonTextStyle={
              isValid
                ? styles.buttonTextStyle
                : [styles.buttonTextStyle, { color: $RED }]
            }
            handleOnPress={updatePassword}
            buttonStyle={styles.buttonFinish}
            buttonText="Обновить"
          />
        </View>
      </View>
    </Modal>
  );
}
