import {
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Vibration
} from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../../constants/colorLiterals';
import ButtonMainBlue from '../ButtonMainBlue';
import React, { useState } from 'react';
import SecondaryButton from '../SecondaryButton';
import CustomInput from '../CustomInput';
import NumericBoard from '../NumericBoard';
import ModalHeader from './ModalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, setBillActive } from '../../redux/features/billFeatureSlice';
import uuid from 'uuid';
import bringInCash from '../../utils/dotSeparation';

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
    height: '80%',
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

export default function ModalCreateBill({ isVisible, toggleBillModal }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const [isValid, setValidity] = useState(true);
  const [currency, setCurrency] = useState('rub');
  const [depositAmount, setDeposit] = useState('');

  const setDepositAmount = value => () => {
    const updateOperationValue = depositAmount + value;
    setValidity(true);
    if (value === 'delete') {
      if (!depositAmount.slice(0, -1).length) {
        setValidity(false);
      }
      return setDeposit(depositAmount.slice(0, -1));
    }
    setDeposit(updateOperationValue);
  };

  const createBill = () => {
    const id = uuid(currency + depositAmount);
    if (!isValid || !depositAmount.length) {
      Vibration.vibrate(500);
      return setValidity(false);
    }
    dispatch(
      addBill({
        id,
        name: currency,
        userId: user.id,
        currency,
        depositAmount,
        active: true
      })
    );
    dispatch(setBillActive({ id, userId: user.id }));
    setDeposit('');
    toggleBillModal();
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleBillModal}
            title="Счет"
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Валюта</Text>
              <View style={styles.operationTypeBtnsContainer}>
                <ButtonMainBlue
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
                <ButtonMainBlue
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
                <ButtonMainBlue
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
              <Text style={isValid ? styles.label : styles.labelInvalid}>
                Сумма
              </Text>
              <View style={styles.transactionInputWrapper}>
                <CustomInput
                  inputStyle={
                    isValid
                      ? styles.transactionInput
                      : [
                          styles.transactionInput,
                          { color: $RED, borderColor: $RED }
                        ]
                  }
                  placeholder="+ 0"
                  placeholderColor={isValid ? $BLUE : $RED}
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
                    onPressNumber={value => setDepositAmount(value)}
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
            handleOnPress={createBill}
            buttonStyle={styles.buttonFinish}
            buttonText="Создать"
          />
        </View>
      </View>
    </Modal>
  );
}
