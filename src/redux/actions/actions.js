import * as actionTypes from './types';
import {NavigationActions, StackActions} from 'react-navigation';
import uuid from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

export const loadData = navigation => async dispatch => {
  let photosAsync = await AsyncStorage.getItem('photos');
  let photos = JSON.parse(photosAsync);
  if (photos) {
    dispatch({
      type: actionTypes.SET_PHOTOS,
      payload: photos,
    });
  } else {
    dispatch({
      type: actionTypes.SET_PHOTOS,
      payload: [],
    });
  }

  let videosAsync = await AsyncStorage.getItem('videos');
  let videos = JSON.parse(videosAsync);
  if (videos) {
    dispatch({
      type: actionTypes.SET_VIDEOS,
      payload: videos,
    });
  } else {
    dispatch({
      type: actionTypes.SET_VIDEOS,
      payload: [],
    });
  }
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
        }),
      ],
    }),
  );
};

export const setPhoto = (
  navigation,
  reduxPhotos,
  photoPath,
  setLoading,
) => async dispatch => {
  let newPhotosData = [photoPath, ...reduxPhotos];
  AsyncStorage.setItem('photos', JSON.stringify(newPhotosData)).then(() => {
    dispatch({
      type: actionTypes.SET_PHOTOS,
      payload: newPhotosData,
    });
    setLoading();
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'PhotoGallery',
          }),
        ],
      }),
    );
  });
};

export const setVideo = (
  navigation,
  reduxVideos,
  video,
  setLoading,
) => async dispatch => {
  let newVideosData = [video, ...reduxVideos];
  AsyncStorage.setItem('videos', JSON.stringify(newVideosData)).then(() => {
    dispatch({
      type: actionTypes.SET_VIDEOS,
      payload: newVideosData,
    });
    setLoading();
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'VideoGallery',
          }),
        ],
      }),
    );
  });
};

export const deleteVideo = (navigation, copyVideos) => async dispatch => {
  dispatch({
    type: actionTypes.START_LOADING,
  });
  AsyncStorage.setItem('videos', JSON.stringify(copyVideos)).then(() => {
    dispatch({
      type: actionTypes.SET_VIDEOS,
      payload: copyVideos,
    });
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
  });
};

export const deletePhoto = (navigation, copyPhotos) => async dispatch => {
  dispatch({
    type: actionTypes.START_LOADING,
  });
  AsyncStorage.setItem('photos', JSON.stringify(copyPhotos)).then(() => {
    dispatch({
      type: actionTypes.SET_PHOTOS,
      payload: copyPhotos,
    });
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
  });
};
