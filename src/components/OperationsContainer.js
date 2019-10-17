/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from '../../assets/card.svg';

const styles = StyleSheet.create({
  operation: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
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
        <Card />
        <View style={styles.operationContainer}>
          <Text style={styles.operationTitle}>{props.operationTitle}</Text>
          <Text style={props.operationAmountStyle}>{props.operationType}</Text>
        </View>
      </View>
    </View>
  );
}
