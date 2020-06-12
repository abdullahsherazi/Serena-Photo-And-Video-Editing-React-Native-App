import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Toast from 'react-native-easy-toast';
import uuid from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
import * as color from '../constants/color';

class PhotoGallery extends React.Component {
  state = {
    images: [],
    visible: false,
    photoIndex: 0,
  };
  openImageModal = index => {
    let images = [];
    for (let i = 0; i < this.props.reduxState.photos.length; i++) {
      images.push({url: this.props.reduxState.photos[i]});
    }
    this.setState({images, visible: true, photoIndex: index});
  };
  renderItem = ({item, index, separators}) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        height: 220,
        alignSelf: 'center',
        width: '47%',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical: 3,
        marginHorizontal: 0,
        marginLeft: index % 2 === 0 ? '2%' : 0,
        marginRight: index % 2 !== 0 ? '2%' : '2%',
      }}
      onPress={() => this.openImageModal(index)}>
      <View style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={{uri: item}}
          resizeMode="stretch"
        />
      </View>

      <View
        style={{
          position: 'absolute',
          right: 5,
          alignItems: 'center',
          flexDirection: 'row',
          top: 5,
        }}>
        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            backgroundColor: 'white',
            marginRight: 5,
          }}
          onPress={() => {
            Share.open({
              url: this.props.reduxState.photos[index],
            })
              .then(() => {})
              .catch(err => {
                // if (err) {
                //   this.refs.toast.show(
                //     'Some Problem Occured While Sending The Photo',
                //     1500,
                //   );
                // }
              });
          }}>
          <MaterialCommunityIcons
            name={'share-variant'}
            size={20}
            color={color.themeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            backgroundColor: 'white',
          }}
          onPress={() => {
            let copyPhotos = [...this.props.reduxState.photos];
            copyPhotos.splice(index, 1);
            this.props.reduxActions.deletePhoto(
              this.props.navigation,
              copyPhotos,
            );
          }}>
          <MaterialCommunityIcons name={'delete'} size={20} color="red" />
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
          headingText="PHOTO GALLERY"
        />

        {this.props.reduxState.photos.length !== 0 ? (
          <FlatList
            style={styles.list}
            renderItem={this.renderItem}
            data={this.props.reduxState.photos}
            numColumns={2}
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
              No Photo(s) Available
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
        {this.state.loading ? <Loader /> : null}
        <Modal visible={this.state.visible} transparent={true}>
          <ImageViewer
            imageUrls={this.state.images}
            index={this.state.photoIndex}
          />
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: color.themeColor,
              position: 'absolute',
              top: 10,
              right: 10,
            }}
            onPress={() => this.setState({visible: false})}>
            <Entypo name={'cross'} size={20} color="white" />
          </TouchableOpacity>
        </Modal>
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
)(PhotoGallery);
