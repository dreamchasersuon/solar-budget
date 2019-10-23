import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { $BLUE, $MEDIUMSILVER, $WHITE } from '../constants/colorLiterals';
import NavigationService from '../navigation/service';
import Delete from '../../assets/big-delete.svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 50
  },
  language: {
    fontSize: 16,
    marginRight: 30
  },
  pros: {
    alignItems: 'center',
    marginBottom: 120
  },
  prosTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10
  },
  prosText: {
    textAlign: 'center',
    fontSize: 11,
    width: 250,
    marginTop: 5,
    opacity: 0.6
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginTop: 30
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: $MEDIUMSILVER
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 110,
    width: '100%'
  },
  button: {
    backgroundColor: $BLUE,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: $WHITE
  }
});

//TODO: refactor into smaller components
export default function CreatePinCode() {
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.pros}>
        <Text style={styles.prosTitle}>Придумайте PIN-CODE</Text>
        <View style={styles.paginationContainer}>
          <View style={[styles.pagination, { backgroundColor: $BLUE }]} />
          <View style={styles.pagination} />
          <View style={styles.pagination} />
          <View style={styles.pagination} />
        </View>
      </View>
      <View
        style={{
          width: 240,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>1</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>2</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>3</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>4</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>5</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>6</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>7</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>8</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>9</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              marginLeft: 85,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 40 }}>0</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 65,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Delete />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
