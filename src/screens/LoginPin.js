import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import NumericBoard from '../components/NumericBoard';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';
import SecurePin from '../components/SecurePin';
import { $BLUE } from '../constants/colorLiterals';

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
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 90,
    width: '100%'
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
  numberStyle: {
    fontSize: 40
  },
  buttonTextWithNote: {
    color: $BLUE,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 5
  }
});

export default function LoginPinCode() {
  const [pinCode, setPin] = useState('');
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);

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
    NavigationService.navigate('App');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <View>
        <InfoPost title="Добрый вечер">
          <Pros />
        </InfoPost>
        <SecurePin noMargins pinCodeLength={pinCode.length} />
      </View>
      <NumericBoard
        onPressNumber={value => setPinCode(value)}
        hasDelete
        bigDelete
        hasFingerprint
        wrapperStyle={styles.numericBoardWrapperStyle}
        containerStyle={styles.numericBoardContainerStyle}
        numberStyle={styles.numberStyle}
      />
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={goTo('LoginCredentials')}
          buttonText="Использовать логин и пароль"
        />
        <SecondaryButton
          buttonTextStyle={styles.buttonTextWithNote}
          handleOnPress={goTo('Creation')}
          buttonText="РЕГИСТРАЦИЯ"
          hasNote
          noteText="Не зарегистрированы?"
        />
      </View>
    </View>
  );
}
