import React from "react";
import { AppLoading, Font } from "expo";
import { Linking } from 'expo';
import Root from './src/navigation/root';
import { persistor, store } from './src/redux';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  bootstrap = async () => {
    const initialUrl = await Linking.parseInitialURLAsync();

    const fonts = Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      MaterialCommunityIcons: require('native-base/Fonts/MaterialCommunityIcons.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      FontAwesome: require('native-base/Fonts/FontAwesome.ttf')
    });

    this.setState({ initialUrl });
    return Promise.all([fonts]);
  };

  render() {
    if (this.state.loading) {
      return <AppLoading
        startAsync={ this.bootstrap }
        onFinish={() => this.setState({ loading: false })}
        onError={ console.warn }
      />
    }

    return <Root store={ store } persistor={ persistor } initialUrl={ this.state.initialUrl }/>
  }
}
