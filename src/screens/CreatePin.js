import React, { useState } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import ArrowLeft from '../../assets/left-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createPinCode } from '../redux/features/userFeatureSlice';
import mapColorsToTheme, { $LIGHT_BLUE } from '../constants/colorLiterals';
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

export default function CreatePinCode({ navigation }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user);
  let user;
  if (users.length) {
    const multiSelectUser = users.find(user => user.multiAccountSelect);
    if (multiSelectUser) {
      user = multiSelectUser;
    } else {
      user = users.find(user => user.active);
    }
  }
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
  const { t, i18n } = useTranslation('CreatePinScreen');

  const [pinCode, setPin] = useState('');
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
    try {
      const login = navigation.getParam('login', {});
      dispatch(createPinCode({ pinCode, login }));
      NavigationService.navigate('AcceptPin');
    } catch (e) {
      Vibration.vibrate(500);
    }
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
        title={t('headerTitle')}
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
        deleteColor={text_main}
        rippleColor={accent}
      />
    </View>
  );
}
