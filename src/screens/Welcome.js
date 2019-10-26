import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Pros from '../../assets/pros.svg';
import NavigationService from '../navigation/service';
import InfoPost from '../components/InfoPost';
import MajorBlueButton from '../components/MajorBlueButton';
import { $MEDIUMSILVER } from '../constants/colorLiterals';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 50
  },
  language: {
    fontSize: 16,
    marginRight: 30
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 100,
    width: '100%'
  },
  aboutContainer: {
    alignItems: 'center'
  },
  paginationContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $MEDIUMSILVER
  }
});

export default function Welcome() {
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>RU</Text>
      </View>
      <View style={styles.aboutContainer}>
        <InfoPost
          title="Анализируйте статистику"
          note="Получайте точные статистические данные по вашему бюджету в реальном
          времени"
        >
          <Pros />
        </InfoPost>
        <View style={styles.paginationContainer}>
          <View style={styles.pagination} />
          <View style={styles.pagination} />
          <View style={styles.pagination} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          handleOnPress={goTo('Creation')}
          buttonText="Создать аккаунт"
        />
        <MajorBlueButton handleOnPress={goTo('LoginPin')} buttonText="Войти" />
      </View>
    </View>
  );
}
