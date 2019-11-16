import { Modal, View, StyleSheet, Vibration } from 'react-native';
import {
  $BLACK_FADE,
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $WHITE
} from '../../constants/colorLiterals';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from '../CustomInput';
import ButtonSecondary from '../buttons/ButtonSecondary';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLoginThunk } from '../../redux/features/userFeatureSlice';

const styles = StyleSheet.create({
  buttonFinish: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
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

export default function UpdateLoginModal({
  isVisible,
  toggleUpdateLoginModal
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [isValidLogin, setLoginValidity] = useState(true);
  const [login, setLogin] = useState('');

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
    toggleUpdateLoginModal();
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleUpdateLoginModal}
            title="Изменение логина"
          />
          <View style={styles.purposeInputContainer}>
            <CustomInput
              inputStyle={
                isValidLogin
                  ? styles.purposeInput
                  : [styles.purposeInput, { color: $RED, borderColor: $RED }]
              }
              placeholder="Введите новый логин"
              label="Новый логин"
              labelStyle={isValidLogin ? styles.label : styles.labelInvalid}
              handleChange={value => onTypeLogin(value)}
            />
          </View>
          <ButtonSecondary
            buttonTextStyle={
              isValid
                ? styles.buttonTextStyle
                : [styles.buttonTextStyle, { color: $RED }]
            }
            handleOnPress={updateLogin}
            buttonStyle={styles.buttonFinish}
            buttonText="Обновить"
          />
        </View>
      </View>
    </Modal>
  );
}
