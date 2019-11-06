/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import AppNavigator from './routes';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import NavigationService from './service';

export default function RootProvider({ store, initialUrl }) {
  return (
    <Root>
      <Provider store={store}>
        <AppNavigator
          screenProps={{ initialUrl }}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    </Root>
  );
}

RootProvider.propTypes = {
  store: PropTypes.object,
  initialUrl: PropTypes.object
};
