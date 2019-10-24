import React from 'react';
import {
  View,
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: $LIGHTSILVER,
    height: '100%',
    elevation: 8
  },
  headerTopLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 144,
    justifyContent: 'space-between'
  },
  title: {
    color: $BLUE,
    fontSize: 16,
    marginBottom: 10
  },
  logout: {
    color: $BLUE,
    fontSize: 16,
    paddingBottom: 20,
    paddingTop: 20
  },
  settingsUnit: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },
  settingsUnitContainer: {
    paddingRight: 40,
    marginTop: 30,
    paddingLeft: 44,
    width: '100%'
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: $MEDIUMSILVER,
    borderRadius: 50,
    marginTop: 30,
    marginRight: 25
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  headerContainer: {
    width: '50%',
    height: 140
  }
});

//TODO: refactor into smaller components
function Settings() {
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
        <View style={styles.avatar} />
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
    </View>
  );
}

export default withSideScreen(Settings);
