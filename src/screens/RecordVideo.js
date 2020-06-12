import React, {PureComponent} from 'react';
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationEvents} from 'react-navigation';

class RecordVideo extends PureComponent {
  state = {
    stop: false,
    frontCamera: false,
    zoom: 0,
    recording: false,
    flashLight: false,
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <GlobalHeader
          twoWords={true}
          drawerIcon={true}
          navigation={this.props.navigation}
          backgroundColor="white"
          headingText="RECORD VIDEO"
        />
        <NavigationEvents
          onWillFocus={payload =>
            this.setState({
              stop: false,
              frontCamera: false,
              zoom: 0,
              recording: false,
              flashLight: false,
            })
          }
        />
        <View style={{flex: 1}}>
          <RNCamera
            ref="cameraRef"
            style={{flex: 1}}
            type={
              this.state.frontCamera === true
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            zoom={this.state.zoom}
            flashMode={
              this.state.flashLight === true
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.auto
            }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            <View style={{position: 'absolute', top: 10, left: 10}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={this.state.recording}
                onPress={() => {
                  this.setState({frontCamera: !this.state.frontCamera});
                }}>
                <Image
                  source={require('../../assets/images/cameraRotate.png')}
                  style={{
                    width: '50%',
                    height: '50%',
                    tintColor: 'black',
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  width: 30,
                  marginLeft: 10,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (this.state.zoom < 1)
                    this.setState({zoom: this.state.zoom + 0.1});
                }}>
                <Foundation name={'plus'} size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  marginLeft: 10,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (this.state.zoom > 0)
                    this.setState({zoom: this.state.zoom - 0.1});
                }}>
                <Foundation name={'minus'} size={15} color="black" />
              </TouchableOpacity>
            </View>
            {this.state.recording === false ? (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 10,
                  alignSelf: 'center',
                }}
                onPress={async () => {
                  this.setState({
                    recording: true,
                  });
                  let videoData = await this.refs.cameraRef.recordAsync();
                  this.setState({recording: false});
                  this.props.navigation.navigate('EditVideo', {
                    data: videoData,
                  });
                }}>
                <Foundation name={'record'} size={25} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 10,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.refs.cameraRef.stopRecording();
                }}>
                <Foundation name={'stop'} size={25} color="red" />
              </TouchableOpacity>
            )}
            {this.state.frontCamera === false ? (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
                onPress={() => {
                  this.setState({flashLight: !this.state.flashLight});
                }}>
                {this.state.flashLight ? (
                  <MaterialCommunityIcons
                    name={'flash-off'}
                    size={25}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={'flash'}
                    size={25}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </RNCamera>
        </View>
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
)(RecordVideo);
