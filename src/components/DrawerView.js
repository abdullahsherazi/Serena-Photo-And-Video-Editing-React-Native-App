import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import * as color from '../constants/color';

// import Entypo from 'react-native-vector-icons/dist/Entypo';
// import Foundation from 'react-native-vector-icons/dist/Foundation';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
// import Octicons from 'react-native-vector-icons/dist/Octicons';

class DrawerView extends React.Component {
  state = {
    switchValue: true,
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'white',
            paddingTop: 20,
            borderBottomRightRadius: 30,
            borderTopRightRadius: 30,
          },
        ]}>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <Ionicons
              size={20}
              style={{marginLeft: 5}}
              name="ios-home"
              color={color.themeColor}
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text
              style={[
                styles.ContentViewText,
                {color: color.themeColor, fontWeight: 'bold'},
              ]}>
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('PhotoGallery');
          }}>
          <View style={styles.ContentViewInside1}>
            <Ionicons
              size={18}
              style={{marginLeft: 5}}
              name="md-photos"
              color={color.themeColor}
            />
          </View>

          <View style={styles.ContentViewInside2}>
            <Text
              style={[
                styles.ContentViewText,
                {color: color.themeColor, fontWeight: 'bold'},
              ]}>
              Photo Gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('VideoGallery');
          }}>
          <View style={styles.ContentViewInside1}>
            <MaterialCommunityIcons
              size={20}
              style={{marginLeft: 3}}
              name="file-video"
              color={color.themeColor}
            />
          </View>

          <View style={styles.ContentViewInside2}>
            <Text
              style={[
                styles.ContentViewText,
                {color: color.themeColor, fontWeight: 'bold'},
              ]}>
              Video Gallery
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View1: {
    height: 156,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  ProfilePic: {
    height: '100%',
    // borderRadius: 100,
    paddingRight: 5,

    borderWidth: 0,
    borderColor: '#81d0ff',
    width: '45%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ContentView: {
    paddingLeft: 15,
    height: 30,
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  ContentViewInside1: {
    width: '15%',
    justifyContent: 'center',
  },
  ContentViewInside2: {
    paddingLeft: 0,
    width: '85%',
    borderBottomWidth: 0,
    borderBottomColor: '#796a3f',
    justifyContent: 'center',
  },
  ContentViewText: {
    color: '#4e3b00',
    fontSize: 16,
  },
  Notification: {
    paddingLeft: 15,
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  NotificationInside1: {
    width: '15%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
  },
  NotificationInside2: {
    paddingLeft: 0,
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
    justifyContent: 'center',
  },
  NotificationInside3: {
    width: '25%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
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
)(DrawerView);
