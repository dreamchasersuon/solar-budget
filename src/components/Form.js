/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomInput from './Input';

const styles = StyleSheet.create({
  form: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default function Form({ hasPasswordApprove }) {
  return (
    <View style={styles.form}>
      <CustomInput label="Имя аккаунта" placeholder="Введите имя" />
      <CustomInput
        label="Пароль"
        placeholder="Создайте пароль"
        hasMargin
        password
      />
      {hasPasswordApprove && (
        <CustomInput
          label="Подтверждение"
          placeholder="Подтвердите пароль"
          hasMargin
          password
        />
      )}
    </View>
  );
}
