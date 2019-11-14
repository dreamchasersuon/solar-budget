import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { $BLUE, $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Header from '../components/Header';
import Language from '../../assets/language.svg';
import NavigationService from '../navigation/service';
import withSideScreen from '../components/SideScreenHOC';
// eslint-disable-next-line import/no-namespace
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-namespace
import * as Permissions from 'expo-permissions';
import DropdownAlert from 'react-native-dropdownalert';
import { useSelector, useDispatch } from 'react-redux';
import { addAvatar } from '../redux/features/userFeatureSlice';

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: $MEDIUMSILVER,
    borderRadius: 50,
    height: 70,
    marginRight: 25,
    marginTop: 30,
    width: 70
  },
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    elevation: 8,
    height: '100%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerContainer: {
    height: 140,
    width: '50%'
  },
  headerTopLeftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 144
  },
  logout: {
    color: $BLUE,
    fontSize: 16,
    paddingBottom: 20,
    paddingTop: 20
  },
  settingsUnit: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '75%'
  },
  settingsUnitContainer: {
    marginTop: 30,
    paddingLeft: 44,
    paddingRight: 40,
    width: '100%'
  },
  title: {
    color: $BLUE,
    fontSize: 16,
    marginBottom: 10
  }
});

//TODO: refactor into smaller components
function Settings() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.find(user => user.active));
  const image = user.avatar;

  const askPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return this.dropDownAlertRef.alertWithType(
        'error',
        'Отклонено',
        'Для загрузки изображения необходим доступ к камере и галерее.'
      );
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    dispatch(addAvatar({ uri: result.uri, userId: user.id }));
  };

  const logout = () => NavigationService.navigate('Auth');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Header
            headerTopLeftSideStyle={styles.headerTopLeftSide}
            title="Настройки"
            hasLeftMenu
          />
        </View>
        <TouchableOpacity onPress={askPermissions}>
          <Image source={{ uri: image }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>Основные</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Язык</Text>
              <Language />
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Облачная копия</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Пригласить партнера</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Переключить тему</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>Безопасность</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Использовать отпечаток пальца</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Изменить логин</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Изменить пароль</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Изменить PIN-CODE</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>Обратная связь</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Оценить приложение</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Техническая поддержка</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Условия использования</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>Политика конфиденциальности</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>Выйти</Text>
      </TouchableOpacity>
      <View>
        <DropdownAlert ref={ref => (this.dropDownAlertRe = ref)} />
      </View>
    </View>
  );
}

export default withSideScreen(Settings);
