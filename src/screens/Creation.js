import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import NavigationService from '../navigation/service';
import CreationHeader from '../components/CreationHeader';
import InfoPost from '../components/InfoPost';
import Form from '../components/Form';
import MajorBlueButton from '../components/MajorBlueButton';
import SecondaryButton from '../components/SecondaryButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  }
});

export default function Creation() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <CreationHeader goBack={goBack} />
      <InfoPost />
      <Form hasPasswordApprove />
      <View style={styles.buttonsContainer}>
        <MajorBlueButton
          buttonText="Создать"
          handleOnPress={goTo('CreatePin')}
        />
        <SecondaryButton
          handleOnPress={goTo('LoginCredentials')}
          buttonText="ВОЙТИ"
          hasNote
          noteText="Уже зарегистрированы?"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
