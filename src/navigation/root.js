/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import AppNavigator from './routes';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationService from './service';
import ModalCreateBill from '../components/modals/ModalCreateBill';
import ModalCreateTransaction from '../components/modals/ModalCreateTransaction';
import ModalCreateTarget from '../components/modals/ModalCreateTarget';
import ModalCreateRatePair from '../components/modals/ModalCreateRatePair';
import ModalUpdateLogin from '../components/modals/ModalUpdateLogin';
import ModalUpdatePassword from '../components/modals/ModalUpdatePassword';
import ModalValidatePassword from '../components/modals/ModalValidatePassword';
import { View } from 'react-native';

export default function RootProvider({ store, initialUrl, persistor }) {
  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator
            screenProps={{ initialUrl }}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <ModalCreateBill />
          <ModalCreateTransaction />
          <ModalCreateTarget />
          <ModalCreateRatePair />
          <ModalUpdateLogin />
          <ModalUpdatePassword />
          <ModalValidatePassword />
        </PersistGate>
      </Provider>
    </Root>
  );
}

RootProvider.propTypes = {
  store: PropTypes.object,
  initialUrl: PropTypes.object
};
