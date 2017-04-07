import {
  AppRegistry
} from 'react-native';

import { StackNavigator } from 'react-navigation'

import App from './app'
import ImageBrowser from './ImageBrowser'

const Navigation = StackNavigator({
  App: { screen: App },
  ImageBrowser: { screen: ImageBrowser }
});

AppRegistry.registerComponent('rncameraroll', () => Navigation);
