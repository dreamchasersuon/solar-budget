import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from '../navigation/service';
import ArrowLeft from '../../assets/left-arrow.svg';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';

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

export default function AcceptPinCode() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <ArrowLeft onPress={goBack} style={styles.backArrow} />
      <SecurePin />
      <NumericBoard
        hasDelete
        needNullAlignment
        onPressDevNavigation={goTo('AddFingerprint')}
      />
    </View>
  );
}
