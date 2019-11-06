import React from 'react';
import {
  //$RED,
  $GREEN,
  $SILVER,
  $BLUE,
  $WHITE
} from '../constants/colorLiterals';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  bodyData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
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
    width: '100%'
  },
  headerData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '90%'
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

export default function Transaction() {
  return (
    <View style={styles.container}>
      <View style={styles.headerData}>
        <Text style={styles.headerTarget}>Входящий перевод</Text>
        <View style={styles.headerDateTime}>
          <View style={styles.headerDate}>
            <Text style={styles.headerDateTextRegular}>Дата</Text>
            <Text style={styles.headerDateTextLight}>29.06.19</Text>
          </View>
          <View style={styles.headerTime}>
            <Text style={styles.headerDateTextRegular}>Время</Text>
            <Text style={styles.headerDateTextLight}>16:20</Text>
          </View>
        </View>
      </View>

      <View style={styles.bodyData}>
        <Text style={styles.bodyTransactionValue}>+ 1200</Text>
        <Text style={styles.bodyTransactionTarget}>
          От Екатерина Андреевна К.
        </Text>
      </View>
    </View>
  );
}
