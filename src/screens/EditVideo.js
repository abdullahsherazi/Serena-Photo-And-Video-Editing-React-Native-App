import React from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import Video from 'react-native-video';
import {ProcessingManager} from 'react-native-video-processing';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import Loader from '../components/Loader';
import Foundation from 'react-native-vector-icons/Foundation';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import GlobalButton from '../components/GlobalButton';

class EditVideo extends React.Component {
  state = {
    name: '',
    duration: null,
    startingPoint: 0,
    endPoint: 0,
    startingPointString: 0 + ':' + 0,
    endPointString: '',
    loading: false,
  };
  componentDidMount() {
    ProcessingManager.getVideoInfo(
      this.props.navigation.state.params.data.uri,
    ).then(data => {
      let duration = moment.duration(data.duration, 'seconds');
      let endPointString = duration.minutes() + ':' + duration.seconds();
      this.setState({
        endPoint: data.duration,
        duration: data.duration,
        endPointString,
      });
    });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
        <GlobalHeader
          twoWords={true}
          backArrow={true}
          //   drawerIcon={true}
          navigation={this.props.navigation}
          backgroundColor="white"
          headingText="EDIT VIDEO"
        />
        <TextInput
          style={{
            borderWidth: 1,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}
          onChangeText={name => {
            this.setState({name});
          }}
          placeholder="Video Name"
        />
        <View
          style={{
            borderWidth: 1,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 20,
          }}>
          <View>
            <Text>Starting Point</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Foundation
                name={'minus'}
                size={15}
                color="black"
                onPress={() => {
                  if (this.state.startingPoint > 0) {
                    let startingPoint = this.state.startingPoint - 1;
                    let duration = moment.duration(startingPoint, 'seconds');
                    let startingPointString =
                      duration.minutes() + ':' + duration.seconds();
                    this.setState({
                      startingPoint,
                      startingPointString,
                    });
                  }
                }}
              />
              <Text>{this.state.startingPointString}</Text>
              <Foundation
                name={'plus'}
                size={15}
                color="black"
                onPress={() => {
                  if (this.state.startingPoint + 1 < this.state.endPoint) {
                    let startingPoint = this.state.startingPoint + 1;
                    let duration = moment.duration(startingPoint, 'seconds');
                    let startingPointString =
                      duration.minutes() + ':' + duration.seconds();
                    this.setState({
                      startingPoint,
                      startingPointString,
                    });
                  }
                }}
              />
            </View>
          </View>

          <View>
            <Text>End Point</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Foundation
                name={'minus'}
                size={15}
                color="black"
                onPress={() => {
                  if (this.state.endPoint - 1 > this.state.startingPoint) {
                    let endPoint = this.state.endPoint - 1;
                    let duration = moment.duration(endPoint, 'seconds');
                    let endPointString =
                      duration.minutes() + ':' + duration.seconds();
                    this.setState({
                      endPoint,
                      endPointString,
                    });
                  }
                }}
              />
              <Text>{this.state.endPointString}</Text>
              <Foundation
                name={'plus'}
                size={15}
                color="black"
                onPress={() => {
                  if (this.state.endPoint < this.state.duration) {
                    let endPoint = this.state.endPoint + 1;
                    let duration = moment.duration(endPoint, 'seconds');
                    let endPointString =
                      duration.minutes() + ':' + duration.seconds();
                    this.setState({
                      endPoint,
                      endPointString,
                    });
                  }
                }}
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 5,
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{fontWeight: 'bold'}}>Trimming</Text>
          </View>
        </View>
        <GlobalButton
          text={'Done'}
          tick={true}
          navigation={this.props.navigation}
          loading={this.state.loading || this.props.reduxState.loading}
          marginTop={5}
          marginBottom={5}
          width={'90%'}
          borderRadius={10}
          submit={() => {
            if (this.state.name === '') {
              this.refs.toast.show('Kindly Write Some Name', 1500);
            } else {
              this.setState({loading: true});
              ProcessingManager.trim(
                this.props.navigation.state.params.data.uri,
                {
                  startTime: this.state.startingPoint,
                  endTime: this.state.endPoint,
                },
              ).then(data => {
                this.props.reduxActions.setVideo(
                  this.props.navigation,
                  this.props.reduxState.videos,
                  {videoPath: data, name: this.state.name},
                  () => {
                    this.setState({loading: false});
                  },
                );
              });
            }
          }}
        />
        <Video
          source={{
            uri: this.props.navigation.state.params.data.uri,
          }}
          ref={ref => {
            this.player = ref;
          }}
          controls={true}
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
          }}
          resizeMode="stretch"
        />

        <Toast
          ref="toast"
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
          position="center"
          positionValue={200}
          fadeInDuration={0}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{
            color: 'white',
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 'bold',
          }}
        />

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
)(EditVideo);
