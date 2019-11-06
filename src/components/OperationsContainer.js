/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from '../../assets/card.svg';

const styles = StyleSheet.create({
  operation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    width: '90%'
  },
  operationContainer: {
    flexDirection: 'column'
  },
  operationTitle: {
    fontSize: 9,
    marginBottom: 10
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
