/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';
import TogglePassword from '../../assets/toggle-pass.svg';

const styles = StyleSheet.create({
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
  marginTop: {
    marginTop: 30
  },
  togglePassword: { position: 'absolute', right: 10, marginTop: 15 }
});

export default function CustomInput({
  label,
  placeholder,
  hasMargin,
  password
}) {
  return (
    <React.Fragment>
      <Text style={hasMargin ? [styles.label, styles.marginTop] : styles.label}>
        {label}
      </Text>
      {password ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            secureTextEntry
          />
          <TogglePassword style={styles.togglePassword} />
        </View>
      ) : (
        <TextInput style={styles.input} placeholder={placeholder} />
      )}
    </React.Fragment>
  );
}
