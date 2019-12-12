import { Text, StyleSheet, ScrollView, View, Vibration } from 'react-native';
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $MEDIUMSILVER,
  $RED,
  $TRANSPARENT,
  $WHITE
} from '../../constants/colorLiterals';
import ButtonMainBlue from '../buttons/ButtonMainBlue';
import React, { useState, useRef } from 'react';
import ButtonSecondary from '../buttons/ButtonSecondary';
import CustomInput from '../CustomInput';
import NumericBoard from '../NumericBoard';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, setBillActive } from '../../redux/features/billFeatureSlice';
import uuid from 'uuid';
import bringInCash from '../../utils/dotSeparation';
import { useTranslation } from 'react-i18next';
import BottomSheet from 'reanimated-bottom-sheet';
import setRef from '../../constants/refs';

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
    backgroundColor: $WHITE,
    height: '100%',
    width: '100%'
  },
  buttonFinish: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  buttonTextStyle: { color: $LIGHT_BLUE, fontSize: 16 },
  headerTitleModalStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20
  },
  label: { color: $LIGHT_BLUE, fontSize: 14, marginBottom: 10 },
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
    backgroundColor: $LIGHT_BLUE,
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
    color: $LIGHT_BLUE,
    fontSize: 28,
    height: 55,
    textAlign: 'right',
    width: '100%'
  },
  transactionInputWrapper: {
    paddingBottom: 20
  }
});

export default function ModalCreateBill() {
  const ref = useRef();
  setRef({ name: 'bill', ref });

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('ModalCreateBill');

  const user = useSelector(state => state.user.find(user => user.active));
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
    ref.current.snapTo(0);
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

  const renderContent = () => {
    return (
      <View
        style={[styles.modalActiveArea, themeStyles.modalActiveAreaBackground]}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.transactionFormWrapper}>
            <Text style={[styles.label, themeStyles.textColorAccent]}>
              {t('selectCurrencyLabel')}
            </Text>
            <View style={styles.operationTypeBtnsContainer}>
              <ButtonMainBlue
                handleOnPress={() => setCurrency('rub')}
                buttonStyle={
                  currency === 'rub'
                    ? [
                        styles.operationTypeBtnActive,
                        themeStyles.backgroundColorAccent
                      ]
                    : styles.operationTypeBtnInactive
                }
                buttonTextStyle={
                  currency === 'rub'
                    ? styles.operationTypeTextActive
                    : styles.operationTypeTextInactive
                }
                title={t('selectCurrencyTextRub')}
              />
              <ButtonMainBlue
                handleOnPress={() => setCurrency('usd')}
                buttonStyle={
                  currency === 'usd'
                    ? [
                        styles.operationTypeBtnActive,
                        themeStyles.backgroundColorAccent
                      ]
                    : styles.operationTypeBtnInactive
                }
                buttonTextStyle={
                  currency === 'usd'
                    ? styles.operationTypeTextActive
                    : styles.operationTypeTextInactive
                }
                title={t('selectCurrencyTextUsd')}
              />
              <ButtonMainBlue
                handleOnPress={() => setCurrency('eur')}
                buttonStyle={
                  currency === 'eur'
                    ? [
                        styles.operationTypeBtnActive,
                        themeStyles.backgroundColorAccent
                      ]
                    : styles.operationTypeBtnInactive
                }
                buttonTextStyle={
                  currency === 'eur'
                    ? styles.operationTypeTextActive
                    : styles.operationTypeTextInactive
                }
                title={t('selectCurrencyTextEur')}
              />
            </View>
          </View>
          <View style={styles.transactionFormWrapper}>
            <Text
              style={
                isValid
                  ? [styles.label, themeStyles.textColorAccent]
                  : styles.labelInvalid
              }
            >
              {t('billAmountLabel')}
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
                placeholderColor={isValid ? text_main : $RED}
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
                  numberStyle={[
                    styles.numericBoardNumberStyle,
                    themeStyles.textColorMain
                  ]}
                  hasDelete
                  needNullAlignment
                  onPressNumber={value => setDepositAmount(value)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <ButtonSecondary
          buttonTextStyle={
            isValid
              ? [styles.operationTypeTextActive, themeStyles.textColorAccent]
              : [styles.buttonTextStyle, { color: $RED }]
          }
          handleOnPress={createBill}
          buttonStyle={styles.buttonFinish}
          buttonText={t('createBillButtonLabel')}
        />
      </View>
    );
  };
  return (
    <BottomSheet
      ref={ref}
      enabledContentGestureInteraction={false}
      snapPoints={[0, 230, 550]}
      renderHeader={renderHeader}
      renderContent={renderContent}
    />
  );
}
