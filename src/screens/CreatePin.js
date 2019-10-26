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
        onPressNumber={value => setPinCode(value)}
        hasDelete
        needNullAlignment
      />
    </View>
  );
}
