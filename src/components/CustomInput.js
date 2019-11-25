/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import HiddenPassword from '../../assets/toggle-pass.svg';
import VisiblePassword from '../../assets/visible-pass.svg';

const styles = StyleSheet.create({
  hiddenPassword: { marginTop: 15, position: 'absolute', right: 10 },
  visiblePassword: { marginTop: 19, position: 'absolute', right: 10 }
});

export default function CustomInput({
  label,
  placeholder,
  placeholderColor,
  labelStyle,
  password,
  inputStyle,
  multiline,
  initial,
  isEditable,
  handleChange
}) {
  const [isHiddenPassword, togglePassword] = useState(true);
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
            style={inputStyle}
            placeholder={placeholder}
            onChangeText={handleChange}
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
          editable={isEditable}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          multiline={multiline}
          onChangeText={handleChange}
        />
      )}
    </React.Fragment>
  );
}
