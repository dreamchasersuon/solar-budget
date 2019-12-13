import React from 'react';
import mapColorsToTheme, {
  $LIGHT_GREEN,
  $SILVER,
  $RED
} from '../constants/colorLiterals';
import { View, StyleSheet, Text } from 'react-native';
import bringInCash from '../utils/dotSeparation';
import TransactionIcon from '../../assets/test-big-logo.svg';

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
    color: $LIGHT_GREEN,
    fontSize: 25,
    marginRight: 30,
    marginLeft: 10
  },
  container: {
    alignItems: 'center',
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
  },
  amountAndIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default function Transaction({
  purpose,
  date,
  time,
  type,
  amount,
  about,
  theme
}) {
  const { background_top, text_main, accent } = mapColorsToTheme(theme);
  const themeStyles = StyleSheet.create({
    containerBackground: {
      backgroundColor: background_top
    },
    textMain: {
      color: text_main
    },
    textAccent: {
      color: accent
    }
  });

  return (
    <View style={[styles.container, themeStyles.containerBackground]}>
      <View style={styles.headerData}>
        <Text style={[styles.headerTarget, themeStyles.textMain]}>
          {purpose}
        </Text>
        <View style={styles.headerDateTime}>
          <View style={styles.headerDate}>
            <Text style={[styles.headerDateTextRegular, themeStyles.textMain]}>
              Дата
            </Text>
            <Text style={[styles.headerDateTextLight, themeStyles.textAccent]}>
              {date}
            </Text>
          </View>
          <View style={styles.headerTime}>
            <Text style={[styles.headerDateTextRegular, themeStyles.textMain]}>
              Время
            </Text>
            <Text style={[styles.headerDateTextLight, themeStyles.textAccent]}>
              {time}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bodyData}>
        <View style={styles.amountAndIcon}>
          <TransactionIcon />
          {type === 'income' ? (
            <Text style={styles.bodyTransactionValue}>
              +{bringInCash(amount)}
            </Text>
          ) : (
            <Text style={[styles.bodyTransactionValue, { color: $RED }]}>
              -{bringInCash(amount)}
            </Text>
          )}
        </View>
        <Text style={styles.bodyTransactionTarget}>{about}</Text>
      </View>
    </View>
  );
}
