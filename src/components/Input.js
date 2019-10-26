/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import HiddenPassword from '../../assets/toggle-pass.svg';
import VisiblePassword from '../../assets/visible-pass.svg';

const styles = StyleSheet.create({
  hiddenPassword: { position: 'absolute', right: 10, marginTop: 15 },
  visiblePassword: { position: 'absolute', right: 10, marginTop: 19 }
});

export default function CustomInput({
  label,
  placeholder,
  placeholderColor,
  labelStyle,
  password,
  inputStyle,
  multiline
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
      {label && <Text style={labelStyle}>{label}</Text>}
      {password ? (
        <View>
          <TextInput
            value={initial}
            onChange={validate}
            style={inputStyle}
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
          style={inputStyle}
          value={initial}
          onChange={validate}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          multiline={multiline}
        />
      )}
    </React.Fragment>
  );
}