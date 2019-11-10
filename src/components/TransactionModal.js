import {
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  // eslint-disable-next-line react-native/split-platform-components
  TimePickerAndroid,
  // eslint-disable-next-line react-native/split-platform-components
  DatePickerAndroid
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  $BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import BlueButton from './BlueButton';
import React, { useState } from 'react';
import NumericBoard from './NumericBoard';
import SecondaryButton from './SecondaryButton';
import CustomInput from './Input';
import ModalHeader from './ModalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/features/walletFeatureSlice';
import { withdrawDepositing } from '../redux/features/billFeatureSlice';
import { depositingToTarget } from '../redux/features/targetFeatureSlice';

import uuid from 'uuid';

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
    marginLeft: 80,
    width: 30
  },
  dateInput: {
    borderColor: $MEDIUMSILVER,
    borderRadius: 3,
    borderWidth: 1,
    color: $MEDIUMSILVER,
    fontSize: 10,
    height: 35,
    paddingLeft: 10,
    width: '48%'
  },
  dateInputAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateInputContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },
  dateInputLabel: {
    color: $MEDIUMSILVER,
    fontSize: 10,
    marginTop: 10
  },
  descriptionInput: {
    borderColor: $MEDIUMSILVER,
    borderRadius: 3,
    borderWidth: 1,
    color: $MEDIUMSILVER,
    fontSize: 10,
    height: 55,
    paddingLeft: 10,
    width: '100%'
  },
  descriptionInputContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
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
    marginLeft: 120,
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
    maxWidth: '99%'
  },
  transactionInputWrapper: {
    marginTop: 15,
    paddingBottom: 20
  }
});

export default function TransactionModal({
  isVisible,
  toggleTransactionModal
}) {
  const dispatch = useDispatch();
  const [isValid, setValidity] = useState(true);
  const [isValidPurpose, setPurposeValidity] = useState(true);
  const [isValidAmount, setAmountValidity] = useState(true);
  const bills = useSelector(state => state.bill);
  const targets = useSelector(state => state.target);
  const [purpose, selectPurpose] = useState('');
  const [type, setTransactionType] = useState('income');
  const [amount, setTransactionAmount] = useState('');
  const [date, chooseDate] = useState(
    `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
  );
  const [time, chooseTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [description, writeDescription] = useState('Описание');

  const setAmount = value => () => {
    const updateOperationValue = amount + value;
    setAmountValidity(true);
    if (value === 'delete') {
      if (!amount.slice(0, -1).length) {
        setAmountValidity(false);
      }
      return setTransactionAmount(amount.slice(0, -1));
    }
    setTransactionAmount(updateOperationValue);
  };

  async function timepicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false
      });
      chooseTime(`${hour}:${minute}`);
    } catch ({ code, message }) {
      throw new Error(`Cannot open time picker ${message}`);
    }
  }

  async function datepicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      chooseDate(`${day}.${month}.${year}`);
    } catch ({ code, message }) {
      throw new Error(`Cannot open date picker ${message}`);
    }
  }

  function onSelectPurpose(value) {
    setPurposeValidity(true);
    selectPurpose(value);
  }

  const createTransaction = () => {
    if (!amount.length) {
      setAmountValidity(false);
    }
    if (!purpose.length) {
      setPurposeValidity(false);
    }
    if (!amount.length || !purpose.length) {
      return setValidity(false);
    }
    const id = uuid(date);
    const activeBill = bills.find(bill => bill.active);
    const isTarget = targets.find(target => target.id === purpose);
    const billId = activeBill.id;
    let targetId;
    if (isTarget) {
      targetId = purpose;
      dispatch(depositingToTarget({ targetId, amount }));
    } else {
      targetId = null;
    }

    let targetName;
    if (isTarget) {
      const target = targets.find(target => target.id === targetId);
      targetName = target.name;
    }

    dispatch(
      addTransaction({
        id,
        billId,
        targetId: isTarget ? purpose : null,
        purpose: isTarget ? targetName : purpose,
        description,
        date,
        time,
        type: isTarget ? 'outcome' : type,
        amount
      })
    );
    dispatch(
      withdrawDepositing({ type: isTarget ? 'outcome' : type, amount, billId })
    );
    selectPurpose('');
    setTransactionAmount('');
    toggleTransactionModal();
  };

  const mappedTargetsForPicker = [];
  targets.forEach(target => {
    const pickerItem = {
      label: target.name,
      value: target.id
    };
    return mappedTargetsForPicker.push(pickerItem);
  });

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleTransactionModal}
            title="Транзакция"
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.purposeInputContainer}>
              <Text style={isValidPurpose ? styles.label : styles.labelInvalid}>
                Назначение
              </Text>
              <View
                style={
                  isValidPurpose
                    ? styles.purposeInput
                    : [styles.purposeInput, { color: $RED, borderColor: $RED }]
                }
              >
                <RNPickerSelect
                  onValueChange={(value, index) => onSelectPurpose(value)}
                  style={{
                    inputAndroid: {
                      backgroundColor: 'transparent',
                      top: 2,
                      fontSize: 10
                    },
                    iconContainer: {
                      top: 5,
                      right: 15
                    }
                  }}
                  useNativeAndroidPickerStyle={false}
                  items={[
                    { value: 'products', label: 'Продукты' },
                    ...mappedTargetsForPicker
                  ]}
                  placeholder={{
                    label: 'Выберите назначение',
                    value: null
                  }}
                />
              </View>
            </View>
            <View style={styles.descriptionInputContainer}>
              <CustomInput
                inputStyle={styles.descriptionInput}
                placeholder="Добавьте описание"
                multiline
                label="Описание"
                labelStyle={styles.label}
                handleChange={value => writeDescription(value)}
              />
            </View>
            <View style={styles.dateInputContainer}>
              <Text style={styles.label}>Дата и время</Text>
              <View style={styles.dateInputAlignment}>
                <TouchableOpacity style={styles.dateInput} onPress={datepicker}>
                  <Text style={styles.dateInputLabel}>{date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateInput} onPress={timepicker}>
                  <Text style={styles.dateInputLabel}>{time}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Сумма</Text>
              <View style={styles.operationTypeBtnsContainer}>
                <BlueButton
                  handleOnPress={() => setTransactionType('income')}
                  buttonStyle={
                    type === 'income'
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    type === 'income'
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Доход"
                />
                <BlueButton
                  handleOnPress={() => setTransactionType('outcome')}
                  buttonStyle={
                    type === 'outcome'
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    type === 'outcome'
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Расход"
                />
              </View>
              <View style={styles.transactionInputWrapper}>
                <CustomInput
                  inputStyle={
                    isValidAmount
                      ? styles.transactionInput
                      : [
                          styles.transactionInput,
                          { color: $RED, borderColor: $RED }
                        ]
                  }
                  placeholder={type === 'income' ? '+ 0' : '- 0'}
                  placeholderColor={isValidAmount ? $BLUE : $RED}
                  initial={amount}
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
                    onPressNumber={value => setAmount(value)}
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
            handleOnPress={createTransaction}
            buttonStyle={styles.buttonFinish}
            buttonText="Создать"
          />
        </View>
      </View>
    </Modal>
  );
}
