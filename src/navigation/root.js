import AppNavigator from "./routes";
import { Root } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react';
import NavigationService from './service';

export default ({ store, persistor, initialUrl }) => {
  return (
    <Root>
      <Provider store={ store }>
        <PersistGate persistor={ persistor }>
            <AppNavigator screenProps={{ initialUrl }} ref={ navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}/>
        </PersistGate>
      </Provider>
    </Root>
  );
};
