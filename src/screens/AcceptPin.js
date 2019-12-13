import React, { useState, useRef } from 'react';
import { View, StyleSheet, Vibration, StatusBar } from 'react-native';
import NavigationService from '../navigation/service';
import ArrowLeft from '../../assets/left-arrow.svg';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import { useSelector } from 'react-redux';
import mapColorsToTheme, { $LIGHT_BLUE } from '../constants/colorLiterals';
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
    backgroundColor: $LIGHT_BLUE,
    borderRadius: 50,
    height: 10,
    width: 10
  }
});

export default function AcceptPinCode() {
  const { t, i18n } = useTranslation([
    'AcceptPinScreen',
    'ApplicationErrorMessages'
  ]);

  const users = useSelector(state => state.user);
  const user = users.find(user => user.active);
  const { background_bottom, accent, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    background: {
      backgroundColor: background_bottom
    },
    backgroundAccent: {
      backgroundColor: accent
    },
    textMain: {
      color: text_main
    }
  });

  const dropDownRef = useRef(null);

  const [pinCode, setPin] = useState('');
  const goBack = () => NavigationService.goBack();

  const setPinCode = value => () => {
    let updatePinCode = pinCode + value;
    if (value === 'delete') {
      updatePinCode = pinCode.slice(0, -1);
    }
    setPin(updatePinCode);
  };

  if (pinCode.length === 4) {
    setPin('');
    if (user.pinCode !== pinCode) {
      dropDownRef.current.alertWithType(
        'error',
        `${t('ApplicationErrorMessages:wrongPinMsg')}`,
        ''
      );
      return Vibration.vibrate(500);
    }

    NavigationService.navigate('AddFingerprint');
  }

  return (
    <View style={[styles.container, themeStyles.background]}>
      <ArrowLeft onPress={goBack} fill={text_main} style={styles.backArrow} />
      <SecurePin
        paginationIndicatorStyle={[
          styles.paginationActive,
          themeStyles.backgroundAccent
        ]}
        pinCodeLength={pinCode.length}
        title={t('AcceptPinScreen:headerTitle')}
        titleThemeStyle={themeStyles.textMain}
      />
      <NumericBoard
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        containerWithMarginStyle={styles.numericBoardContainerWithMarginStyle}
        onPressNumber={value => setPinCode(value)}
        hasDelete
        bigDelete
        needNullAlignment
        numberStyle={[styles.numberStyle, themeStyles.textMain]}
        rippleColor={accent}
        deleteColor={text_main}
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
