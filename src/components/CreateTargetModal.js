import { Modal, Text, ScrollView, View, StyleSheet } from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import BlueButton from './BlueButton';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from './Input';
import NumericBoard from './NumericBoard';
import SecondaryButton from './SecondaryButton';
import { useDispatch } from 'react-redux';
import {
  addTarget,
  setTargetActive
} from '../redux/features/targetFeatureSlice';
import uuid from 'uuid';
import bringInCash from '../utils/dotSeparation';

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
    marginLeft: 110,
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
    marginLeft: 150,
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
    height: '95%',
    width: '100%'
  },
  modalHiddenArea: {
    alignItems: 'flex-end',
    backgroundColor: $TRANSPARENT,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end'
  },
  numericBoard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 60,
    paddingRight: 60,
    width: '100%'
  },
  numericBoardContainerStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 55,
    justifyContent: 'center',
    width: 55
  },
  numericBoardContainerWithMarginsStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 55,
    justifyContent: 'center',
    marginLeft: 72,
    width: 55
  },
  numericBoardNumberStyle: { fontSize: 28 },
  numericBoardWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  operationTypeBtnActive: {
    alignItems: 'center',
    backgroundColor: $BLUE,
    borderRadius: 4,
    flexDirection: 'row',
    height: 26,
    justifyContent: 'center',
    width: 100
  },
  operationTypeBtnInactive: {
    alignItems: 'center',
    backgroundColor: $TRANSPARENT,
    borderRadius: 4,
    flexDirection: 'row',
    height: 26,
    justifyContent: 'center',
    width: 100
  },
  operationTypeBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 210
  },
  operationTypeTextActive: { color: $WHITE, fontSize: 12 },
  operationTypeTextInactive: { color: $MEDIUMSILVER, fontSize: 12 },
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
  scrollView: { alignItems: 'center' },
  transactionFormWrapper: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },
  transactionInput: {
    borderBottomWidth: 1,
    borderColor: $MEDIUMSILVER,
    color: $BLUE,
    fontSize: 28,
    height: 55,
    textAlign: 'right',
    width: '100%'
  },
  transactionInputWrapper: {
    paddingBottom: 20
  }
});

export default function CreateTargetModal({
  isVisible,
  toggleCreateTargetModal
}) {
  const dispatch = useDispatch();
  const [isValid, setValidity] = useState(true);
  const [isValidName, setNameValidity] = useState(true);
  const [isValidAmount, setAmountValidity] = useState(true);
  const [currency, setCurrency] = useState('rub');
  const [name, setTargetName] = useState('');
  const [depositAmount, setTargetPrice] = useState('');

  const setOperation = value => () => {
    const updateOperationValue = depositAmount + value;
    setAmountValidity(true);
    if (value === 'delete') {
      if (!depositAmount.slice(0, -1).length) {
        setAmountValidity(false);
      }
      return setTargetPrice(depositAmount.slice(0, -1));
    }
    setTargetPrice(updateOperationValue);
  };

  function onTypeName(value) {
    setNameValidity(true);
    setTargetName(value);
  }

  const createTarget = () => {
    if (!depositAmount.length) {
      setAmountValidity(false);
    }
    if (!name.length) {
      setNameValidity(false);
    }
    if (!depositAmount.length || !name.length) {
      return setValidity(false);
    }
    const id = uuid(name);
    dispatch(
      addTarget({
        id,
        name,
        currency,
        depositAmount,
        deposit: [],
        active: true
      })
    );
    dispatch(setTargetActive({ id }));
    setTargetPrice('');
    setTargetName('');
    toggleCreateTargetModal();
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleCreateTargetModal}
            title="Цель"
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.purposeInputContainer}>
              <CustomInput
                inputStyle={
                  isValidName
                    ? styles.purposeInput
                    : [styles.purposeInput, { color: $RED, borderColor: $RED }]
                }
                placeholder="Напишите название цели"
                label="Название"
                labelStyle={isValidName ? styles.label : styles.labelInvalid}
                handleChange={value => onTypeName(value)}
              />
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Валюта</Text>
              <View style={styles.operationTypeBtnsContainer}>
                <BlueButton
                  handleOnPress={() => setCurrency('rub')}
                  buttonStyle={
                    currency === 'rub'
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    currency === 'rub'
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Рубли"
                />
                <BlueButton
                  handleOnPress={() => setCurrency('usd')}
                  buttonStyle={
                    currency === 'usd'
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    currency === 'usd'
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Доллары"
                />
                <BlueButton
                  handleOnPress={() => setCurrency('eur')}
                  buttonStyle={
                    currency === 'eur'
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    currency === 'eur'
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Евро"
                />
              </View>
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={isValidAmount ? styles.label : styles.labelInvalid}>
                Сумма
              </Text>
              <View style={styles.transactionInputWrapper}>
                <CustomInput
                  inputStyle={
                    isValidAmount
                      ? styles.transactionInput
                      : [styles.transactionInput, { borderColor: $RED }]
                  }
                  placeholder="+ 0"
                  placeholderColor={isValidAmount ? $BLUE : $RED}
                  initial={bringInCash(depositAmount)}
                  isEditable={false}
                />
                <View style={styles.numericBoard}>
                  <NumericBoard
                    wrapperStyle={styles.numericBoardWrapperStyle}
                    containerStyle={styles.numericBoardContainerStyle}
                    containerWithMarginStyle={
                      styles.numericBoardContainerWithMarginsStyle
                    }
                    numberStyle={styles.numericBoardNumberStyle}
                    hasDelete
                    needNullAlignment
                    onPressNumber={value => setOperation(value)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <SecondaryButton
            buttonTextStyle={
              isValid
                ? styles.buttonTextStyle
                : [styles.buttonTextStyle, { color: $RED }]
            }
            handleOnPress={createTarget}
            buttonStyle={styles.buttonFinish}
            buttonText="Создать"
          />
        </View>
      </View>
    </Modal>
  );
}
