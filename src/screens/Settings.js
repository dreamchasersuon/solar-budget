import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import { $BLUE, $LIGHTSILVER, $MEDIUMSILVER } from '../constants/colorLiterals';
import Header from '../components/Header';
import Language from '../../assets/language.svg';
import NavigationService from '../navigation/service';
import withSideScreen from '../components/HOCSideScreen';
// eslint-disable-next-line import/no-namespace
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-namespace
import * as Permissions from 'expo-permissions';
import DropdownAlert from 'react-native-dropdownalert';
import { useSelector, useDispatch } from 'react-redux';
import { addAvatar } from '../redux/features/userFeatureSlice';
// eslint-disable-next-line import/no-namespace
import * as MailComposer from 'expo-mail-composer';
import UpdateLoginModal from '../components/modals/ModalUpdateLogin';
import UpdatePasswordModal from '../components/modals/ModalUpdatePassword';
import ValidatePasswordModal from '../components/modals/ModalValidatePassword';
import { useTranslation } from 'react-i18next';

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
    ...StyleSheet.absoluteFillObject,
    elevation: 8
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

function Settings() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('SettingsScreen');

  const dropDownRef = useRef(null);
  const user = useSelector(state => state.user.find(user => user.active));
  const isUserHasUpdatePasswordPermissions = user.permissionsToUpdatePassword;
  const image = user.avatar;

  const [isValidatePasswordModalVisible, toggleValidatePassword] = useState(
    false
  );

  useEffect(() => {
    if (isUserHasUpdatePasswordPermissions) {
      toggleUpdatePasswordModal();
    }
  }, [isUserHasUpdatePasswordPermissions]);

  const toggleValidatePasswordModal = () =>
    toggleValidatePassword(!isValidatePasswordModalVisible);

  const [isLoginModalVisible, toggleLoginModal] = useState(false);
  const toggleUpdateLoginModal = () => toggleLoginModal(!isLoginModalVisible);

  const [isPasswordModalVisible, togglePasswordModal] = useState(false);
  const toggleUpdatePasswordModal = () =>
    togglePasswordModal(!isPasswordModalVisible);

  const askPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return dropDownRef.alertWithType(
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

  const mailTechnicalSupport = async () => {
    const supportEmail = 'formulatim@gmail.com';
    await MailComposer.composeAsync({ recipients: [supportEmail] });
  };

  const logout = () => NavigationService.navigate('Auth');
  const goTo = route => NavigationService.navigate(route);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Header
            headerTopLeftSideStyle={styles.headerTopLeftSide}
            title={t('screenName')}
            hasLeftMenu
          />
        </View>
        <TouchableOpacity onPress={askPermissions}>
          <Image source={{ uri: image }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>{t('mainHeaderTitle')}</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('languageSettings')}</Text>
              <Language />
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('cloudSettings')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('inviteFriendSettings')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('themeSettings')}</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>{t('securityHeaderTitleText')}</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('enableFingerprintSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsUnit}
            onPress={toggleUpdateLoginModal}
          >
            <React.Fragment>
              <Text>{t('changeLoginSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsUnit}
            onPress={toggleValidatePasswordModal}
          >
            <React.Fragment>
              <Text>{t('changePasswordSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsUnit}
            onPress={() => goTo('ChangePinCode')}
          >
            <React.Fragment>
              <Text>{t('changePinSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsUnitContainer}>
          <Text style={styles.title}>{t('feedbackHeaderTitle')}</Text>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('rateUsSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsUnit}
            onPress={mailTechnicalSupport}
          >
            <React.Fragment>
              <Text>{t('techSupportSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('termsOfUseSettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsUnit}>
            <React.Fragment>
              <Text>{t('privacyPolicySettingsText')}</Text>
            </React.Fragment>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>{t('logoutButtonLabel')}</Text>
      </TouchableOpacity>
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row'
        }}
        updateStatusBar={false}
        ref={dropDownRef}
      />
      <UpdateLoginModal
        isVisible={isLoginModalVisible}
        toggleUpdateLoginModal={toggleUpdateLoginModal}
      />
      <UpdatePasswordModal
        isVisible={isPasswordModalVisible}
        toggleUpdatePasswordModal={toggleUpdatePasswordModal}
      />
      <ValidatePasswordModal
        isVisible={isValidatePasswordModalVisible}
        toggleValidatePasswordModal={toggleValidatePasswordModal}
      />
    </View>
  );
}

export default withSideScreen(Settings);
