/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { $MEDIUMSILVER } from '../constants/colorLiterals';
import HiddenPassword from '../../assets/toggle-pass.svg';
import VisiblePassword from '../../assets/visible-pass.svg';

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
  hiddenPassword: { position: 'absolute', right: 10, marginTop: 15 },
  visiblePassword: { position: 'absolute', right: 10, marginTop: 19 }
});

export default function CustomInput({
  label,
  placeholder,
  hasMargin,
  password
}) {
  const [initial, setValue] = useState('');
  const [isHiddenPassword, togglePassword] = useState(true);

  const validate = e => {
    setValue(e.text);
  };

  const setSecureOnPassword = () => {
    togglePassword(!isHiddenPassword);
  };

  return (
    <React.Fragment>
      <Text style={hasMargin ? [styles.label, styles.marginTop] : styles.label}>
        {label}
      </Text>
      {password ? (
        <View>
          <TextInput
            value={initial}
            onChange={validate}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isHiddenPassword}
          />
          {isHiddenPassword && (
            <HiddenPassword
              onPress={setSecureOnPassword}
              style={styles.hiddenPassword}
            />
          )}
          {!isHiddenPassword && (
            <VisiblePassword
              onPress={setSecureOnPassword}
              style={styles.visiblePassword}
            />
          )}
        </View>
      ) : (
        <TextInput
          style={styles.input}
          value={initial}
          onChange={validate}
          placeholder={placeholder}
        />
      )}
    </React.Fragment>
  );
}
