/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  operation: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    width: 30,
    height: 30
  },
  operationTitle: {
    fontSize: 9,
    marginBottom: 10
  },
  operationContainer: {
    flexDirection: 'column'
  }
});

export default function OperationsContainer(props) {
  return (
    <View style={props.operationsContainerStyle}>
      <View style={styles.operation}>
        <Image source={require('../../assets/card.png')} style={styles.icon} />
        <View style={styles.operationContainer}>
          <Text style={styles.operationTitle}>{props.operationTitle}</Text>
          <Text style={props.operationAmountStyle}>{props.operationType}</Text>
        </View>
      </View>
    </View>
  );
}
