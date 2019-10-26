import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';
import ArrowLeft from '../../assets/left-arrow.svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    top: 60
  },
  numericBoardWrapperStyle: {
    width: 240,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  numericBoardContainerStyle: {
    borderRadius: 50,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numericBoardContainerWithMarginStyle: {
    borderRadius: 50,
    width: 65,
    height: 65,
    marginLeft: 88,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberStyle: {
    fontSize: 40
  }
});

export default function CreatePinCode() {
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
    NavigationService.navigate('AcceptPin');
  }

  return (
    <View style={styles.container}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} />
      <SecurePin pinCodeLength={pinCode.length} title="Придумайте PIN-CODE" />
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
    </View>
  );
}
