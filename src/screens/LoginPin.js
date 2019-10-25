import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pros from '../../assets/pros.svg';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import NumericBoard from '../components/NumericBoard';
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
  backArrow: {
    marginLeft: 20
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 50,
    width: '100%'
  }
});

export default function LoginPinCode() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <InfoPost hasPinCode title="Добрый вечер">
        <Pros />
      </InfoPost>
      <NumericBoard
        hasDelete
        hasFingerprint
        onPressDevNavigation={goTo('App')}
        onPressDevNavGoBack={goBack}
      />
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={goTo('LoginCredentials')}
          buttonText="Использовать логин и пароль"
        />
        <SecondaryButton
          handleOnPress={goTo('Creation')}
          buttonText="РЕГИСТРАЦИЯ"
          hasNote
          noteText="Не зарегистрированы?"
        />
      </View>
    </View>
  );
}
