import { Modal, Text, ScrollView, View, StyleSheet } from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import BlueButton from './BlueButton';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import CustomInput from './Input';
import NumericBoard from './NumericBoard';
import SecondaryButton from './SecondaryButton';

const styles = StyleSheet.create({
  modalHiddenArea: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    backgroundColor: $TRANSPARENT
  },
  modalActiveArea: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8
  },
  headerModalStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  headerTitleModalStyle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '700',
    marginLeft: 150
  },
  closeModal: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: $BLUE,
    width: 30,
    marginLeft: 110,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: { alignItems: 'center' },
  purposeInputContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30,
    width: '100%'
  },
  purposeInput: {
    height: 35,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderWidth: 1,
    borderRadius: 3,
    color: $MEDIUMSILVER,
    paddingLeft: 10,
    fontSize: 10
  },
  operationTypeBtnsContainer: {
    flexDirection: 'row',
    width: 210,
    justifyContent: 'space-between'
  },
  operationTypeBtnActive: {
    backgroundColor: $BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 100,
    height: 26,
    flexDirection: 'row'
  },
  operationTypeBtnInactive: {
    backgroundColor: $TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 100,
    height: 26,
    flexDirection: 'row'
  },
  operationTypeTextActive: { color: $WHITE, fontSize: 12 },
  operationTypeTextInactive: { color: $MEDIUMSILVER, fontSize: 12 },
  transactionFormWrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    width: '100%'
  },
  label: { fontSize: 14, color: $BLUE, marginBottom: 10 },
  transactionInputWrapper: {
    marginTop: 15,
    paddingBottom: 20
  },
  transactionInput: {
    height: 55,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderBottomWidth: 1,
    color: $BLUE,
    textAlign: 'right',
    fontSize: 28
  },
  numericBoard: {
    paddingLeft: 60,
    paddingRight: 60,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numericBoardWrapperStyle: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  numericBoardContainerStyle: {
    borderRadius: 50,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numericBoardContainerWithMarginsStyle: {
    borderRadius: 50,
    width: 55,
    height: 55,
    marginLeft: 72,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numericBoardNumberStyle: { fontSize: 28 },
  buttonFinish: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonTextStyle: { color: $BLUE, fontSize: 16 }
});

export default function CreateTargetModal({
  isVisible,
  toggleCreateTargetModal
}) {
  const [rub, setRUB] = useState(true);
  const [usd, setUSD] = useState(false);
  const [eur, setEUR] = useState(false);
  const [operationValue, setOperationValue] = useState('');

  const chooseOperationType = type => () => {
    if (type === 'rub') {
      setUSD(false);
      setEUR(false);
      setRUB(true);
    }
    if (type === 'usd') {
      setEUR(false);
      setRUB(false);
      setUSD(true);
    }
    if (type === 'eur') {
      setUSD(false);
      setRUB(false);
      setEUR(true);
    }
  };

  const setOperation = value => () => {
    const updateOperationValue = operationValue + value;
    if (value === 'delete') {
      return setOperationValue(operationValue.slice(0, -1));
    }
    setOperationValue(updateOperationValue);
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
                inputStyle={styles.purposeInput}
                placeholder="Напишите название цели"
                label="Название"
                labelStyle={styles.label}
              />
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Валюта</Text>
              <View style={styles.operationTypeBtnsContainer}>
                <BlueButton
                  handleOnPress={chooseOperationType('rub')}
                  buttonStyle={
                    rub
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    rub
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Рубли"
                />
                <BlueButton
                  handleOnPress={chooseOperationType('usd')}
                  buttonStyle={
                    usd
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    usd
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Доллары"
                />
                <BlueButton
                  handleOnPress={chooseOperationType('eur')}
                  buttonStyle={
                    eur
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    eur
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Евро"
                />
              </View>
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Сумма</Text>
              <View style={styles.transactionInputWrapper}>
                <CustomInput
                  inputStyle={styles.transactionInput}
                  placeholder="+ 0"
                  placeholderColor={$BLUE}
                  initial={operationValue}
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
            buttonTextStyle={styles.buttonTextStyle}
            handleOnPress={toggleCreateTargetModal}
            buttonStyle={styles.buttonFinish}
            buttonText="Завершить"
          />
        </View>
      </View>
    </Modal>
  );
}
