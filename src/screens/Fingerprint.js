import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';
import Fingerprint from '../../assets/big-fingerprint.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 50
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 20,
    height: 80,
    width: '100%'
  },
  fingerprint: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 50,
    width: 100,
    borderColor: $MEDIUMSILVER,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
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
        <SecondaryButton buttonText="Позже" />
      </View>
    </View>
  );
}
