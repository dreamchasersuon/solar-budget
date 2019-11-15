import { Modal, View, StyleSheet, Vibration, StatusBar } from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import React, { useState, useRef } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from './Input';
import SecondaryButton from './SecondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { validateUserPassword } from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';

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
    height: '31%',
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

export default function ValidatePasswordModal({
  isVisible,
  toggleValidatePasswordModal
}) {
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

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
      dropDownRef.alertWithType('success', 'Обновление разрешено', '');
    } catch (e) {
      dropDownRef.alertWithType(
        'error',
        'Неверный пароль',
        'Попробуйте еще раз.'
      );
    }

    setPassword('');
    toggleValidatePasswordModal();
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleValidatePasswordModal}
            title="Подтвердите пароль"
          />
          <View style={styles.purposeInputContainer}>
            <CustomInput
              inputStyle={
                isValidPassword
                  ? styles.purposeInput
                  : [styles.purposeInput, { color: $RED, borderColor: $RED }]
              }
              initial={password}
              placeholder="Введите старый пароль"
              label="Старый пароль"
              password
              labelStyle={isValidPassword ? styles.label : styles.labelInvalid}
              handleChange={value => onTypePassword(value)}
            />
          </View>
          <SecondaryButton
            buttonTextStyle={
              isValid
                ? styles.buttonTextStyle
                : [styles.buttonTextStyle, { color: $RED }]
            }
            handleOnPress={validatePassword}
            buttonStyle={styles.buttonFinish}
            buttonText="Проверить"
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
    </Modal>
  );
}
