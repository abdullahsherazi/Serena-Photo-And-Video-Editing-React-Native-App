import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Toast from 'react-native-easy-toast';
import uuid from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import Share from 'react-native-share';
import Video from 'react-native-video';
import * as color from '../constants/color';

class VideoGallery extends React.Component {
  state = {overlay: false, videoPath: ''};

  renderItem = ({item, index, separators}) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        height: 80,
        alignSelf: 'center',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 0,
        marginLeft: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 10,
        marginTop: 3,
      }}
      onPress={() =>
        this.setState({
          overlay: true,
          videoPath: item.videoPath,
        })
      }>
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <MaterialCommunityIcons
          name={'message-video'}
          size={25}
          color={color.themeColor}
          style={{marginTop: 5}}
        />
        <Text
          style={{fontWeight: 'bold', marginLeft: 10, color: color.themeColor}}
          numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: '100%',
        }}>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
          }}
          onPress={() => {
            Share.open({
              url: this.props.reduxState.videos[index].videoPath,
            })
              .then(() => {})
              .catch(err => {
                // this.refs.toast.show(
                //   'Some Problem Occured While Sending The Video',
                //   1500,
                // );
              });
          }}>
          <MaterialCommunityIcons
            name={'share-variant'}
            size={25}
            color={color.themeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
          }}
          onPress={() => {
            let copyVideos = [...this.props.reduxState.videos];
            copyVideos.splice(index, 1);
            this.props.reduxActions.deleteVideo(
              this.props.navigation,
              copyVideos,
            );
          }}>
          <MaterialCommunityIcons name={'delete'} size={25} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
        <GlobalHeader
          twoWords={true}
          drawerIcon={true}
          navigation={this.props.navigation}
          backgroundColor="white"
          headingText="VIDEO GALLERY"
        />
        {this.props.reduxState.videos.length !== 0 ? (
          <FlatList
            style={styles.list}
            renderItem={this.renderItem}
            data={this.props.reduxState.videos}
            numColumns={1}
            removeClippedSubviews={true}
            keyExtractor={item => uuid.v4()}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: color.themeColor,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              No Video(s) Available
            </Text>
          </View>
        )}
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
        {this.state.overlay ? (
          <Animatable.View
            ref="searchResultView"
            duration={500}
            animation="fadeIn"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                width: '89%',
                alignSelf: 'center',
                borderColor: '#f9f9f9',
                borderRadius: 15,
                justifyContent: 'center',
                backgroundColor: 'white',
                height: '60%',
                overflow: 'hidden',
              }}>
              <Video
                source={{
                  uri: this.state.videoPath,
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
                }}
                resizeMode="stretch"
              />
              <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 25}}
                onPress={() =>
                  this.setState({
                    overlay: false,
                    videoPath: '',
                  })
                }>
                <Entypo
                  name="circle-with-cross"
                  color={color.themeColor}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : null}
        {this.state.loading ? <Loader /> : null}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 180,
    margin: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  list: {
    flex: 1,
  },
});
const mapStateToProps = state => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = dispatch => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoGallery);
