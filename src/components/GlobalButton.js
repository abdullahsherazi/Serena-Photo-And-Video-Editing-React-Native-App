import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: this.props.width ? this.props.width : '90%',
          flexDirection: 'row',

          height: this.props.height ? this.props.height : 43,
          marginTop: this.props.marginTop ? this.props.marginTop : 10,
          alignItems: 'center',
          justifyContent: 'center',

          alignSelf: this.props.alignSelf ? this.props.alignSelf : 'center',
          borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
          borderColor: '#8bd4ff',
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : '#63b1f5',

          borderRadius: this.props.borderRadius ? this.props.borderRadius : 20,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.52,
          shadowRadius: 5,
          marginLeft: this.props.marginLeft ? this.props.marginLeft : 0,
          elevation: this.props.loading ? 0 : 2,

          shadowColor: this.props.loading ? null : '#000',
          shadowOffset: {
            width: this.props.loading ? 0 : 0,
            height: this.props.loading ? 0 : 1,
          },
          shadowOpacity: this.props.loading ? 0 : 0.2,
          shadowRadius: this.props.loading ? 0 : 1.41,

          marginBottom: this.props.marginBottom ? this.props.marginBottom : 2,
        }}
        onPress={() => this.props.submit()}
        // disabled={this.props.disabled ? this.props.disabled : false}
      >
        {this.props.NoteImage ? (
          <View
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome size={25} color="white" name="pencil-square-o" />
          </View>
        ) : this.props.EditImage ? (
          <View
            style={{
              width: 15,
              height: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <Entypo size={25} color="white" name="pencil" />
          </View>
        ) : this.props.map ? (
          <View
            style={{
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <MaterialCommunityIcons
              size={25}
              color="white"
              name="google-maps"
            />
          </View>
        ) : this.props.message ? (
          <View
            style={{
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <AntDesign size={25} color="white" name="message1" />
          </View>
        ) : this.props.tick ? (
          <View
            style={{
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <FontAwesome size={25} color="white" name="check-square-o" />
          </View>
        ) : this.props.phone ? (
          <View
            style={{
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              marginTop: 4,
            }}>
            <FontAwesome size={25} color="white" name="phone" />
          </View>
        ) : this.props.person ? (
          <View
            style={{
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Ionicons size={25} color="white" name="ios-person" />
          </View>
        ) : null}

        <Text
          style={{
            color: this.props.textColor ? this.props.textColor : 'white',

            fontSize: this.props.fontSize ? this.props.fontSize : 15,
            marginLeft: 1,
            fontWeight: this.props.fontWeight ? this.props.fontWeight : null,
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
