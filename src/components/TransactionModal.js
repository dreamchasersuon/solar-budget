import {
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Picker,
  TouchableOpacity,
  // eslint-disable-next-line react-native/split-platform-components
  TimePickerAndroid,
  // eslint-disable-next-line react-native/split-platform-components
  DatePickerAndroid
} from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import BlueButton from './BlueButton';
import React, { useState } from 'react';
import NumericBoard from './NumericBoard';
import SecondaryButton from './SecondaryButton';
import CustomInput from './Input';
import ModalHeader from './ModalHeader';

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
    marginLeft: 120
  },
  closeModal: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: $BLUE,
    width: 30,
    marginLeft: 80,
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
  purposeInputItem: {
    color: $MEDIUMSILVER,
    fontSize: 3
  },
  descriptionInputContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    width: '100%'
  },
  descriptionInput: {
    height: 55,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderWidth: 1,
    borderRadius: 3,
    color: $MEDIUMSILVER,
    paddingLeft: 10,
    fontSize: 10
  },
  dateInputContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    width: '100%'
  },
  label: { fontSize: 14, color: $BLUE, marginBottom: 10 },
  dateInputAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateInput: {
    height: 35,
    width: '48%',
    borderColor: $MEDIUMSILVER,
    borderWidth: 1,
    borderRadius: 3,
    color: $MEDIUMSILVER,
    paddingLeft: 10,
    fontSize: 10
  },
  dateInputLabel: {
    marginTop: 10,
    color: $MEDIUMSILVER,
    fontSize: 10
  },
  transactionFormWrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    width: '100%'
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

export default function TransactionModal({
  isVisible,
  toggleTransactionModal
}) {
  const [income, setIncome] = useState(true);
  const [outcome, setOutcome] = useState(false);
  const [operationValue, setOperationValue] = useState('');

  const chooseOperationType = type => () => {
    if (type === 'income') {
      setOutcome(false);
      setIncome(true);
    } else {
      setOutcome(true);
      setIncome(false);
    }
  };

  const setOperation = value => () => {
    const updateOperationValue = operationValue + value;
    if (value === 'delete') {
      return setOperationValue(operationValue.slice(0, -1));
    }
    setOperationValue(updateOperationValue);
  };

  async function timepicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      throw new Error(`Cannot open time picker ${message}`);
    }
  }

  async function datepicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      throw new Error(`Cannot open date picker ${message}`);
    }
  }
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
              <Text style={styles.label}>Назначение</Text>
              <View style={styles.purposeInput}>
                <Picker
                  style={styles.purposeInput}
                  itemStyle={styles.purposeInputItem}
                >
                  <Picker.Item label="Выберите назначение платежа" />
                  <Picker.Item label="Продукты" value="products" />
                </Picker>
              </View>
            </View>
            <View style={styles.descriptionInputContainer}>
              <CustomInput
                inputStyle={styles.descriptionInput}
                placeholder="Добавьте описание"
                multiline
                label="Описание"
                labelStyle={styles.label}
              />
            </View>
            <View style={styles.dateInputContainer}>
              <Text style={styles.label}>Дата и время</Text>
              <View style={styles.dateInputAlignment}>
                <TouchableOpacity style={styles.dateInput} onPress={datepicker}>
                  <Text style={styles.dateInputLabel}>Дата</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateInput} onPress={timepicker}>
                  <Text style={styles.dateInputLabel}>Время</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.transactionFormWrapper}>
              <Text style={styles.label}>Сумма</Text>
              <View style={styles.operationTypeBtnsContainer}>
                <BlueButton
                  handleOnPress={chooseOperationType('income')}
                  buttonStyle={
                    income
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    income
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Доход"
                />
                <BlueButton
                  handleOnPress={chooseOperationType('outcome')}
                  buttonStyle={
                    outcome
                      ? styles.operationTypeBtnActive
                      : styles.operationTypeBtnInactive
                  }
                  buttonTextStyle={
                    outcome
                      ? styles.operationTypeTextActive
                      : styles.operationTypeTextInactive
                  }
                  title="Расход"
                />
              </View>
              <View style={styles.transactionInputWrapper}>
                <CustomInput
                  inputStyle={styles.transactionInput}
                  placeholder={income ? '+ 0' : '- 0'}
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
            handleOnPress={toggleTransactionModal}
            buttonStyle={styles.buttonFinish}
            buttonText="Завершить"
          />
        </View>
      </View>
    </Modal>
  );
}
