import React from 'react';
import {
  //$RED,
  $GREEN,
  $SILVER,
  $BLUE,
  $WHITE,
  $RED
} from '../constants/colorLiterals';
import { View, StyleSheet, Text } from 'react-native';
import bringInCash from '../utils/dotSeparation';

const styles = StyleSheet.create({
  bodyData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300
  },
  bodyTransactionTarget: {
    color: $SILVER
  },
  bodyTransactionValue: {
    color: $GREEN,
    fontSize: 25,
    marginRight: 30
  },
  container: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderRadius: 2,
    elevation: 8,
    height: 80,
    justifyContent: 'center',
    marginBottom: 20,
    width: 340
  },
  headerData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: 300
  },
  headerDate: {
    flexDirection: 'row',
    marginRight: 10
  },
  headerDateTextLight: {
    color: $BLUE,
    fontSize: 10
  },
  headerDateTextRegular: {
    fontSize: 10,
    marginRight: 5
  },
  headerDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTarget: {
    fontSize: 11
  },
  headerTime: {
    flexDirection: 'row'
  }
});

export default function Transaction({
  purpose,
  date,
  time,
  type,
  amount,
  about
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerData}>
        <Text style={styles.headerTarget}>{purpose}</Text>
        <View style={styles.headerDateTime}>
          <View style={styles.headerDate}>
            <Text style={styles.headerDateTextRegular}>Дата</Text>
            <Text style={styles.headerDateTextLight}>{date}</Text>
          </View>
          <View style={styles.headerTime}>
            <Text style={styles.headerDateTextRegular}>Время</Text>
            <Text style={styles.headerDateTextLight}>{time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bodyData}>
        {type === 'income' ? (
          <Text style={styles.bodyTransactionValue}>
            +{bringInCash(amount)}
          </Text>
        ) : (
          <Text style={[styles.bodyTransactionValue, { color: $RED }]}>
            -{bringInCash(amount)}
          </Text>
        )}
        <Text style={styles.bodyTransactionTarget}>{about}</Text>
      </View>
    </View>
  );
}
