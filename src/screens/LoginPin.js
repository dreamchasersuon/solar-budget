import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import Pros from '../../assets/pros.svg';
import { $BLUE, $MEDIUMSILVER } from '../constants/colorLiterals';
import ArrowLeft from '../../assets/left-arrow.svg';
import NavigationService from '../navigation/service';
import Delete from '../../assets/big-delete.svg';
import Fingerprint from '../../assets/small-fingerprint.svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 50
  },
  backArrow: {
    marginLeft: 20
  },
  pros: {
    alignItems: 'center'
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
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 30,
    height: 50,
    width: '100%'
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: $BLUE
  },
  remindPassword: {
    color: $BLUE,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 5
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
  youRegisteredText: {
    fontSize: 12,
    color: $MEDIUMSILVER
  },
  youRegistered: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

//TODO: refactor into smaller components
export default function LoginPinCode() {
  const goBack = () => NavigationService.goBack();
  const goTo = routeName => () => NavigationService.navigate(routeName);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft onPress={goBack} style={styles.backArrow} />
      </View>
      <View style={styles.pros}>
        <Pros />
        <Text style={styles.prosTitle}>Добрый вечер</Text>
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
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Fingerprint />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple($BLUE, true)}
          onPress={goTo('App')}
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goTo('LoginCredentials')}
        >
          <Text style={styles.buttonText}>Использовать логин и пароль</Text>
        </TouchableOpacity>
        <View style={styles.youRegistered}>
          <Text style={styles.youRegisteredText}>Не зарегистрированы?</Text>
          <TouchableOpacity onPress={goTo('Creation')}>
            <Text style={styles.remindPassword}>РЕГИСТРАЦИЯ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
