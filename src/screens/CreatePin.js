import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationService from '../navigation/service';
import SecurePin from '../components/SecurePin';
import NumericBoard from '../components/NumericBoard';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});

export default function CreatePinCode() {
  const goTo = routeName => () => NavigationService.navigate(routeName);
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <SecurePin />
      <NumericBoard
        hasDelete
        hasFingerprint
        onPressDevNavigation={goTo('AcceptPin')}
        onPressDevNavBack={goBack}
      />
    </View>
  );
}
