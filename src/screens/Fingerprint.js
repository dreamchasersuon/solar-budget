import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TextInput
} from 'react-native';
import Pros from '../../assets/pros.svg';
import { $BLUE, $MEDIUMSILVER, $WHITE } from '../constants/colorLiterals';
import Fingerprint from '../../assets/big-fingerprint.svg';
import TogglePassword from '../../assets/toggle-pass.svg';
import NavigationService from '../navigation/service';

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
  backArrow: {
    marginLeft: 20
  },
  pros: {
    alignItems: 'center'
  },
  prosTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: 220,
    marginTop: 10
  },
  prosText: {
    textAlign: 'center',
    fontSize: 11,
    width: 250,
    marginTop: 5,
    opacity: 0.6
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 110,
    width: '100%'
  },
  button: {
    backgroundColor: $BLUE,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: $WHITE
  },
  remindPassword: {
    color: $BLUE,
    textAlign: 'center'
  },
  remindPasswordSmall: {
    color: $BLUE,
    fontSize: 11
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  },
  label: {
    fontSize: 10
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: $MEDIUMSILVER,
    borderBottomWidth: 1,
    fontSize: 13
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
  },
  togglePassword: { position: 'absolute', right: 10, marginTop: 15 }
});

//TODO: refactor into smaller components, remove unused styles
export default function AddFingerprint() {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.pros}>
        <View style={styles.fingerprint}>
          <Fingerprint />
        </View>

        <Text style={styles.prosTitle}>
          Использовать отпечаток пальца для входа?
        </Text>
        <Text style={styles.prosText}>
          Используйте отпечаток пальца для более быстрого и легкого доступа к
          своей учетной записи
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Использовать</Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={styles.remindPassword}>Позже</Text>
      </View>
    </View>
  );
}
