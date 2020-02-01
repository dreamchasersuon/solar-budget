import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  // eslint-disable-next-line react-native/split-platform-components
  TimePickerAndroid,
  // eslint-disable-next-line react-native/split-platform-components
  DatePickerAndroid,
  Vibration
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import mapColorsToTheme, {
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../../constants/colorLiterals';
import ButtonMainBlue from '../buttons/ButtonMainBlue';
import React, { useState, useRef } from 'react';
import { timezone as Localization_timezone } from 'expo-localization';
import NumericBoard from '../NumericBoard';
import ButtonSecondary from '../buttons/ButtonSecondary';
import CustomInput from '../CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/features/walletFeatureSlice';
import { withdrawDepositing } from '../../redux/features/billFeatureSlice';
import { depositingToTarget } from '../../redux/features/targetFeatureSlice';
import uuid from 'uuid';
import bringInCash from '../../utils/dotSeparation';
import { useTranslation } from 'react-i18next';
import setRef from '../../constants/refs';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import moment from 'moment-timezone';
import PickerIcon from '../../../assets/picker.svg';

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
  buttonTextStyle: { fontSize: 14 },
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
  headerTitleModalStyle: {
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

export default function ModalCreateTransaction() {
  const ref = useRef();
  setRef({ name: 'transaction', ref });
  const fall = new Animated.Value(1);

  const timezone = Localization_timezone;

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ModalCreateTransaction');

  const targets = useSelector(state => state.target);
  const user = useSelector(state => state.user.find(user => user.active));
  const bills = useSelector(state =>
    state.bill.filter(bill => bill.userId === user.id)
  );
  const purposes = useSelector(state => state.purposes);
  const language = user.locale;
  const { background_top, accent, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    modalActiveAreaBackground: {
      backgroundColor: background_top
    },
    textColorAccent: {
      color: accent
    },
    backgroundColorAccent: {
      backgroundColor: accent
    },
    textColorMain: {
      color: text_main
    }
  });

  const [isValid, setValidity] = useState(true);
  const [isValidPurpose, setPurposeValidity] = useState(true);
  const [isValidAmount, setAmountValidity] = useState(true);

  const [purpose, selectPurpose] = useState(null);
  const [type, setTransactionType] = useState('outcome');
  const [amount, setTransactionAmount] = useState('');
  const [date, chooseDate] = useState('');
  const [time, chooseTime] = useState('');
  const [description, setDescription] = useState('');

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
      const { hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false
      });
      const locatedTime = moment(new Date()).tz(timezone);
      chooseTime(
        locatedTime
          .hour(hour)
          .minutes(minute)
          .format('LT')
      );
    } catch ({ code, message }) {
      throw new Error(`Cannot open time picker ${message}`);
    }
  }

  async function datepicker() {
    try {
      const { year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      chooseDate(`${day}.${month}.${year}`);
    } catch ({ code, message }) {
      throw new Error(`Cannot open date picker ${message}`);
    }
  }

  function onSelectPurpose(purpose) {
    setPurposeValidity(true);
    selectPurpose(purpose);
  }

  const createTransaction = () => {
    if (!amount.length) {
      setAmountValidity(false);
    }

    if (!purpose) {
      setPurposeValidity(false);
    }
    if (!amount.length || !purpose) {
      Vibration.vibrate(500);
      return setValidity(false);
    }
    const id = uuid(date);
    const activeBill = bills.find(bill => bill.active);
    const isTarget = targets.find(target => target.id === purpose);
    const billId = activeBill.id;
    let targetId;
    if (isTarget) {
      targetId = purpose;
      dispatch(
        depositingToTarget({ id, targetId, amount, date, time, type: 'income' })
      );
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
        userId: user.id,
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
    selectPurpose(null);
    setTransactionAmount('');
    ref.current.snapTo(0);
  };

  const mappedPurposesDependOnLanguage = [];
  const mappedTargetsForPicker = [];
  targets.forEach(target => {
    if (target.userId === user.id) {
      const pickerItem = {
        label: target.name,
        value: target.id
      };
      return mappedTargetsForPicker.push(pickerItem);
    }
  });

  Object.keys(purposes).forEach(key => {
    if (Array.isArray(purposes[key])) {
      const userPurposes = purposes[key].find(
        userPurposes => userPurposes.userId === user.id
      );
      if (!userPurposes) {
        return;
      }
      userPurposes.purposes.forEach(purpose => {
        mappedPurposesDependOnLanguage.push({
          value: purposes.indexOf(purpose),
          label: purpose
        });
      });
    }
    mappedPurposesDependOnLanguage.push({
      value: key,
      label: purposes[key][language]
    });
  });
  const purposeInputDefaultText = t('purposeInputDefaultText');

  const clearModal = () => {
    selectPurpose(null);
    setDescription('');
    setTransactionAmount('');
    setTransactionType('outcome');
    setAmountValidity(true);
    setPurposeValidity(true);
    setValidity(true);
  };
  const prepareModal = () => {
    chooseDate(
      moment(new Date())
        .tz(timezone)
        .format('L')
    );
    chooseTime(
      moment(new Date())
        .tz(timezone)
        .format('LT')
    );
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

  function ComponentPickerIcon() {
    return <PickerIcon fill={text_main} />;
  }
  function renderContent() {
    return (
      <View
        style={[styles.modalActiveArea, themeStyles.modalActiveAreaBackground]}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.purposeInputContainer}>
            <Text
              style={
                isValidPurpose
                  ? [styles.label, themeStyles.textColorAccent]
                  : styles.labelInvalid
              }
            >
              {t('purposeInputLabel')}
            </Text>
            <View
              style={
                isValidPurpose
                  ? styles.purposeInput
                  : [styles.purposeInput, { color: $RED, borderColor: $RED }]
              }
            >
              <RNPickerSelect
                value={purpose}
                onValueChange={value => onSelectPurpose(value)}
                style={{
                  inputAndroid: {
                    backgroundColor: 'transparent',
                    top: 2,
                    fontSize: 10,
                    color: text_main
                  },
                  iconContainer: {
                    top: 5,
                    right: 15
                  }
                }}
                useNativeAndroidPickerStyle={false}
                items={[
                  ...mappedPurposesDependOnLanguage,
                  ...mappedTargetsForPicker
                ]}
                placeholder={{
                  label: purposeInputDefaultText,
                  value: null
                }}
                Icon={ComponentPickerIcon}
              />
            </View>
          </View>
          <View style={styles.descriptionInputContainer}>
            <CustomInput
              initial={description}
              inputStyle={styles.descriptionInput}
              label={t('descriptionInputLabel')}
              placeholder={t('descriptionInputText')}
              multiline
              labelStyle={[styles.label, themeStyles.textColorAccent]}
              handleChange={value => setDescription(value)}
            />
          </View>
          <View style={styles.dateInputContainer}>
            <Text style={[styles.label, themeStyles.textColorAccent]}>
              {t('dateAndTimeLabel')}
            </Text>
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
            <Text style={[styles.label, themeStyles.textColorAccent]}>
              {t('amountLabel')}
            </Text>
            <View style={styles.operationTypeBtnsContainer}>
              <ButtonMainBlue
                handleOnPress={() => setTransactionType('outcome')}
                buttonStyle={
                  type === 'outcome'
                    ? [
                        styles.operationTypeBtnActive,
                        themeStyles.backgroundColorAccent
                      ]
                    : styles.operationTypeBtnInactive
                }
                buttonTextStyle={
                  type === 'outcome'
                    ? styles.operationTypeTextActive
                    : styles.operationTypeTextInactive
                }
                title={t('operationTypeOutcomeText')}
              />
              <ButtonMainBlue
                handleOnPress={() => setTransactionType('income')}
                buttonStyle={
                  type === 'income'
                    ? [
                        styles.operationTypeBtnActive,
                        themeStyles.backgroundColorAccent
                      ]
                    : styles.operationTypeBtnInactive
                }
                buttonTextStyle={
                  type === 'income'
                    ? styles.operationTypeTextActive
                    : styles.operationTypeTextInactive
                }
                title={t('operationTypeIncomeText')}
              />
            </View>
            <View style={styles.transactionInputWrapper}>
              <CustomInput
                inputStyle={
                  isValidAmount
                    ? [styles.transactionInput, themeStyles.textColorMain]
                    : [
                        styles.transactionInput,
                        { color: $RED, borderColor: $RED }
                      ]
                }
                placeholder={type === 'income' ? '+ 0' : '- 0'}
                placeholderColor={isValidAmount ? text_main : $RED}
                initial={bringInCash(amount)}
                isEditable={false}
              />
              <View style={styles.numericBoard}>
                <NumericBoard
                  wrapperStyle={styles.numericBoardWrapperStyle}
                  containerStyle={styles.numericBoardContainerStyle}
                  containerWithMarginStyle={
                    styles.numericBoardContainerWithMarginsStyle
                  }
                  numberStyle={[
                    styles.numericBoardNumberStyle,
                    themeStyles.textColorMain
                  ]}
                  hasDelete
                  needNullAlignment
                  onPressNumber={value => setAmount(value)}
                  deleteColor={text_main}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <ButtonSecondary
          buttonTextStyle={
            isValid
              ? [styles.buttonTextStyle, themeStyles.textColorAccent]
              : [styles.buttonTextStyle, { color: $RED }]
          }
          handleOnPress={createTransaction}
          buttonStyle={styles.buttonFinish}
          buttonText={t('createButtonLabel')}
        />
      </View>
    );
  }
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
        snapPoints={[0, 350, 605]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onCloseEnd={clearModal}
        onOpenStart={prepareModal}
      />
      {/* renderShadow() */}
    </>
  );
}
