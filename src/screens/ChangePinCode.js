import React, { useState, useRef } from 'react';
import { View, StyleSheet, Vibration, StatusBar } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  validatePinCode,
  updateUserPinCode
} from '../redux/features/userFeatureSlice';
import DropdownAlert from 'react-native-dropdownalert';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  backArrow: {
    left: 20,
    position: 'absolute',
    top: 60
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  numberStyle: {
    fontSize: 40
  },
  numericBoardContainerStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    width: 65
  },
  numericBoardContainerWithMarginStyle: {
    alignItems: 'center',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    marginLeft: 88,
    width: 65
  },
  numericBoardWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 240
  },
  paginationActive: {
    borderRadius: 50,
    height: 10,
    width: 10
  }
});

export default function ChangePinCode() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation([
    'ChangePinScreen',
    'ApplicationSuccessMessages',
    'ApplicationErrorMessages'
  ]);

  const dropDownRef = useRef(null);

  const user = useSelector(state => state.user.find(user => user.active));
  const [pinCode, setPin] = useState('');
  const [
    permissionsToUpdatePinCode,
    grantPermissionsToUpdatePinCode
  ] = useState(false);

  const goBack = () => NavigationService.goBack();

  const setPinCode = value => () => {
    if (pinCode.length === 4) return;
    const updatePinCode = pinCode + value;
    if (value === 'delete') {
      return setPin(pinCode.slice(0, -1));
    }
    setPin(updatePinCode);
  };

  if (pinCode.length === 4) {
    setPin('');
    if (!permissionsToUpdatePinCode) {
      try {
        dispatch(validatePinCode({ pinCode, userId: user.id }));
        dropDownRef.alertWithType(
          'success',
          `${t('ApplicationSuccessMessages:pinAcceptedMsg')}`,
          ''
        );
        return grantPermissionsToUpdatePinCode(true);
      } catch (e) {
        Vibration.vibrate(500);
        dropDownRef.alertWithType(
          'error',
          `${t('ApplicationSuccessMessages:pinUpdatedMsg')}`,
          ''
        );
      }
    }
    dispatch(updateUserPinCode({ pinCode, userId: user.id }));
    // dropDownRef.alertWithType('success', `${t('ApplicationSuccessMessages:wrongPinMsg')}`, '');
    return grantPermissionsToUpdatePinCode(false);
  }

  return (
    <View style={styles.container}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} />
      <SecurePin
        paginationIndicatorStyle={styles.paginationActive}
        pinCodeLength={pinCode.length}
        title={
          permissionsToUpdatePinCode
            ? t('ChangePinScreen:newPinText')
            : t('ChangePinScreen:oldPinText')
        }
      />
      <NumericBoard
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        containerWithMarginStyle={styles.numericBoardContainerWithMarginStyle}
        onPressNumber={value => setPinCode(value)}
        hasDelete
        bigDelete
        needNullAlignment
        numberStyle={styles.numberStyle}
      />
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
  );
}
