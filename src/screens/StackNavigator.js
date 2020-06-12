import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from './SplashScreen';
import Home from './Home';
import RecordVideo from './RecordVideo';
import VideoGallery from './VideoGallery';
import PhotoGallery from './PhotoGallery';
import EditVideo from './EditVideo';

const AppNavigator = createStackNavigator(
  {
    RecordVideo: {
      screen: RecordVideo,
      navigationOptions: () => ({
        header: null,
      }),
    },
    EditVideo: {
      screen: EditVideo,
      navigationOptions: () => ({
        header: null,
      }),
    },
    PhotoGallery: {
      screen: PhotoGallery,
      navigationOptions: () => ({
        header: null,
      }),
    },
    VideoGallery: {
      screen: VideoGallery,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);
const AppContainer = createAppContainer(AppNavigator);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
