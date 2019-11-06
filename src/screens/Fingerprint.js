import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import Fingerprint from '../../assets/big-fingerprint.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';

const styles = StyleSheet.create({
  buttonText: {
    color: $BLUE,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center'
  },
  buttonsContainer: {
    height: 80,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%'
  },
  fingerprint: {
    alignItems: 'center',
    borderColor: $MEDIUMSILVER,
    borderRadius: 50,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 100,
    justifyContent: 'center',
    marginBottom: 20,
    width: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 50,
    width: '100%'
  }
});

export default function AddFingerprint() {
  const goBack = () => NavigationService.goBack();
  const goTo = roteName => () => NavigationService.navigate(roteName);
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <InfoPost
        title="Использовать отпечаток пальца для входа?"
        note="Используйте отпечаток пальца для более быстрого и легкого доступа к
          своей учетной записи"
      >
        <TouchableOpacity style={styles.fingerprint} onPress={goBack}>
          <Fingerprint />
        </TouchableOpacity>
      </InfoPost>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={goTo('App')}
          buttonText="Использовать"
        />
        <SecondaryButton
          handleOnPress={goTo('App')}
          buttonTextStyle={styles.buttonText}
          buttonText="Позже"
        />
      </View>
    </View>
  );
}
