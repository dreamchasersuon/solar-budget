/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import AppNavigator from "./routes";
import { Root } from "native-base";
import PropTypes from 'prop-types';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react';
import NavigationService from './service';

export default function RootProvider({ store, persistor, initialUrl }) {
    return (
    <Root>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppNavigator screenProps={{ initialUrl }} ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} 
            />
        </PersistGate>
      </Provider>
    </Root>
    )
}

RootProvider.propTypes = {
  store: PropTypes.object,
  persistor: PropTypes.object,
  initialUrl: PropTypes.object
}