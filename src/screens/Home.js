import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import * as color from '../constants/color';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {RNPhotoEditor} from 'react-native-photo-editor';
import Loader from '../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Entypo from 'react-native-vector-icons/dist/Entypo';

class Home extends React.Component {
  state = {
    loading: false,
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
        <GlobalHeader
          twoWords={true}
          drawerIcon={true}
          navigation={this.props.navigation}
          backgroundColor="white"
          headingText="HOME"
        />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={[
              {
                height: 400,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              },
              this.state.loading === false &&
              this.props.reduxState.loading === false
                ? {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                    backgroundColor: 'white',
                  }
                : {
                    borderWidth: 0.5,
                    borderColor: 'grey',
                  },
            ]}>
            <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,

                  borderRightWidth: 0.5,
                  borderColor: 'grey',
                }}
                onPress={() => {
                  this.setState({loading: true});
                  ImagePicker.launchCamera(
                    {
                      storageOptions: {
                        skipBackup: true,
                        path: 'images',
                      },
                    },
                    response => {
                      if (response.didCancel) {
                        this.setState({loading: false});
                      } else if (response.error) {
                        this.setState({loading: false});
                      } else {
                        let photoPath =
                          RNFS.DocumentDirectoryPath + '/' + response.fileName;
                        RNFS.moveFile(response.uri, photoPath)
                          .then(() => {
                            // console.log('FILE WRITTEN!');
                            RNPhotoEditor.Edit({
                              path:
                                RNFS.DocumentDirectoryPath +
                                '/' +
                                response.fileName,
                              hiddenControls: ['save', 'sticker'],
                              onDone: resp => {
                                let photoPathResp =
                                  Platform.OS === 'android'
                                    ? 'file://' + resp
                                    : 'file://' + resp;
                                this.props.reduxActions.setPhoto(
                                  this.props.navigation,
                                  this.props.reduxState.photos,
                                  photoPathResp,
                                  () => {
                                    this.setState({loading: false});
                                  },
                                );
                              },
                              onCancel: () => {
                                this.setState({loading: false});
                              },
                            });
                          })
                          .catch(err => {
                            this.setState({loading: false});
                            console.log(err.message);
                          });
                      }
                    },
                  );
                }}>
                <MaterialCommunityIcons
                  size={30}
                  name="camera"
                  color={color.themeColor}
                />
                <Text
                  style={{
                    color: color.themeColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 15,
                  }}>
                  Capture Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: 2,
                }}
                onPress={() => {
                  this.setState({loading: true});
                  ImagePicker.launchImageLibrary(
                    {
                      storageOptions: {
                        skipBackup: true,
                        path: 'images',
                      },
                    },
                    response => {
                      if (response.didCancel) {
                        this.setState({loading: false});
                      } else if (response.error) {
                        this.setState({loading: false});
                      } else {
                        let photoPath =
                          RNFS.DocumentDirectoryPath + '/' + response.fileName;
                        RNFS.moveFile(response.uri, photoPath)
                          .then(() => {
                            // console.log('FILE WRITTEN!');
                            RNPhotoEditor.Edit({
                              path:
                                RNFS.DocumentDirectoryPath +
                                '/' +
                                response.fileName,
                              hiddenControls: ['save', 'sticker'],
                              onDone: resp => {
                                let photoPathResp =
                                  Platform.OS === 'android'
                                    ? 'file://' + resp
                                    : 'file://' + resp;
                                this.props.reduxActions.setPhoto(
                                  this.props.navigation,
                                  this.props.reduxState.photos,
                                  photoPathResp,
                                  () => {
                                    this.setState({loading: false});
                                  },
                                );
                              },
                              onCancel: () => {
                                this.setState({loading: false});
                              },
                            });
                          })
                          .catch(err => {
                            this.setState({loading: false});
                            console.log(err.message);
                          });
                      }
                    },
                  );
                }}>
                <Fontisto
                  size={30}
                  name="photograph"
                  color={color.themeColor}
                />
                <Text
                  style={{
                    color: color.themeColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Choose Photo From Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: 'grey',
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,

                  borderRightWidth: 0.5,
                  borderColor: 'grey',
                }}
                onPress={() => {
                  this.props.navigation.navigate('RecordVideo');
                }}>
                <Entypo
                  size={30}
                  name="video-camera"
                  color={color.themeColor}
                />
                <Text
                  style={{
                    color: color.themeColor,
                    fontWeight: 'bold',

                    marginBottom: 15,
                  }}>
                  Record Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: 2,
                }}
                onPress={() => {
                  this.setState({loading: true});
                  ImagePicker.launchImageLibrary(
                    {
                      title: 'Video Picker',
                      mediaType: 'video',
                      storageOptions: {
                        skipBackup: true,
                        path: 'images',
                      },
                    },
                    response => {
                      if (response.didCancel) {
                        this.setState({loading: false});
                      } else if (response.error) {
                        this.setState({loading: false});
                      } else {
                        let videoData =
                          Platform.OS === 'android'
                            ? 'file://' + response.path
                            : 'file://' + response.path;
                        this.props.navigation.navigate('EditVideo', {
                          data: {uri: videoData},
                        });
                        this.setState({loading: false});
                      }
                    },
                  );
                }}>
                <MaterialCommunityIcons
                  size={30}
                  name="library-video"
                  color={color.themeColor}
                />
                <Text
                  style={{
                    color: color.themeColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Choose Video From Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.loading || this.props.reduxState.loading ? (
          <Loader />
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = dispatch => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
