/* eslint-disable no-console */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { AppLoading, Linking } from 'expo';
// eslint-disable-next-line import/no-namespace
import * as Font from 'expo-font';
import RootProvider from './src/navigation/root';
import { store, persistor } from './src/redux';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  bootstrap = async () => {
    const initialUrl = await Linking.parseInitialURLAsync();

    const fonts = Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      MaterialCommunityIcons: require('native-base/Fonts/MaterialCommunityIcons.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      FontAwesome: require('native-base/Fonts/FontAwesome.ttf')
    });

    // eslint-disable-next-line no-invalid-this
    this.setState({ initialUrl });
    return Promise.all([fonts]);
  };

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.bootstrap}
          onFinish={() => this.setState({ loading: false })}
          onError={console.warn}
        />
      );
    }

    return (
      <RootProvider
        store={store}
        persistor={persistor}
        initialUrl={this.state.initialUrl}
      />
    );
  }
}
