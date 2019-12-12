/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import AppNavigator from './routes';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationService from './service';
import ModalCreateBill from '../components/modals/ModalCreateBill';
import ModalCreateTransaction from '../components/modals/ModalCreateTransaction';
import ModalCreateTarget from '../components/modals/ModalCreateTarget';

export default function RootProvider({ store, initialUrl, persistor }) {
  return (
    <Root>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator
            screenProps={{ initialUrl }}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <ModalCreateBill />
          <ModalCreateTransaction />
          <ModalCreateTarget />
        </PersistGate>
      </Provider>
    </Root>
  );
}

RootProvider.propTypes = {
  store: PropTypes.object,
  initialUrl: PropTypes.object
};
