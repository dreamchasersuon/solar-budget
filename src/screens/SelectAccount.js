import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import AuthHeader from '../components/AuthHeader';
import DropdownAlert from 'react-native-dropdownalert';
import mapColorsToTheme, {
  $LIGHT_BLUE,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
import NavigationService from '../navigation/service';
import ArrowLeft from '../../assets/left-arrow.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { multiAccountSelect } from '../redux/features/userFeatureSlice';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    maxWidth: 220,
    textAlign: 'center'
  },
  cardsCarousel: {
    maxHeight: 240,
    alignItems: 'center'
  },
  accountCard: {
    maxHeight: 200,
    flex: 1,
    marginLeft: 70,
    marginTop: 20,
    marginRight: 70,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: $WHITE,
    elevation: 8
  },
  cardGradient: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  cardImage: {
    width: 260,
    height: 140,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  cardTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  cardText: {
    color: $LIGHT_BLUE,
    fontSize: 12
  },
  backArrow: {
    left: 20,
    position: 'absolute',
    top: 60
  }
});

export default function SelectAccount() {
  const dropDownRef = useRef(null);

  const dispatch = useDispatch();

  const users = useSelector(state => state.user);
  let activeUser;
  if (users.length) {
    const multiSelectUser = users.find(user => user.multiAccountSelect);
    if (multiSelectUser) {
      activeUser = multiSelectUser;
    } else {
      activeUser = users.find(user => user.active);
    }
  }

  const {
    background_bottom,
    background_top,
    accent,
    text_main
  } = mapColorsToTheme(activeUser.theme);
  const themeStyles = StyleSheet.create({
    backgroundBottom: {
      backgroundColor: background_bottom
    },
    backgroundTop: {
      backgroundColor: background_top
    },
    textMain: {
      color: text_main
    },
    textAccent: {
      color: accent
    }
  });

  const { t, i18n } = useTranslation('SelectAccountScreen');

  const goBack = () => NavigationService.goBack();
  const goTo = route => NavigationService.navigate(route);

  const selectAccount = userId => () => {
    dispatch(multiAccountSelect({ userId }));
    goTo('LoginPin');
  };

  function renderAccounts() {
    return users.map(user => {
      return (
        <TouchableOpacity
          key={user.id}
          style={[styles.accountCard, themeStyles.backgroundTop]}
          onPress={selectAccount(user.id)}
        >
          <LinearGradient
            colors={['#4874E5', '#9748E5', '#48E59A']}
            start={[0, 0]}
            end={[1, 1]}
            locations={[0.2, 0.3, 0.8]}
            style={styles.cardGradient}
          >
            <Image
              source={user.avatar !== null ? { uri: user.avatar } : { uri: '' }}
              style={styles.cardImage}
            />
          </LinearGradient>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardText, themeStyles.textAccent]}>
              {user.login}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
  return (
    <View style={[styles.container, themeStyles.backgroundBottom]}>
      <ArrowLeft fill={text_main} onPress={goBack} style={styles.backArrow} />
      <AuthHeader
        title={t('headerTitle')}
        titleStyle={[styles.title, themeStyles.textMain]}
      />
      <Swiper
        showsPagination={false}
        width={400}
        loop
        bounces
        containerStyle={styles.cardsCarousel}
      >
        {renderAccounts()}
      </Swiper>
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row'
        }}
        updateStatusBar={false}
        ref={dropDownRef}
      />
    </View>
  );
}
