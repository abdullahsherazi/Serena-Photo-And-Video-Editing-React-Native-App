import React from 'react';
import {View, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

export default class GlobalInput extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: this.props.width ? this.props.width : '90%',
          height: this.props.height ? this.props.height : 40,
          marginTop: this.props.marginTop ? this.props.marginTop : 10,
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            width: '100%',
            marginRight: this.props.marginRight ? this.props.marginRight : 0,
            borderRadius: this.props.borderRadius
              ? this.props.borderRadius
              : 10,
            borderWidth: 1,
            borderColor: this.props.borderColor
              ? this.props.borderColor
              : '#eaeaea',
            padding: this.props.padding ? this.props.padding : 10,
            paddingRight: this.props.paddingRight
              ? this.props.paddingRight
              : 10,
            fontSize: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingLeft: this.props.paddingLeft ? this.props.paddingLeft : 40,
          }}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : null
          }
          placeholderTextColor="black"
          // getRef={c => (this._inputDesc = c)}
          // value={this.props.value ? this.props.value : null}
          // disabled={this.props.disabled ? true : false}
          onChangeText={text => {
            this.props.changeText(text);
          }}
          value={this.props.value ? this.props.value : null}
        />
        {this.props.person ? (
          <MaterialCommunityIcons
            name="account-tie"
            style={{position: 'absolute', left: 10, top: 10}}
            size={20}
            color="black"
          />
        ) : this.props.mobileNumber ? (
          <MaterialIcons
            name="smartphone"
            style={{position: 'absolute', left: 10, top: 10}}
            size={20}
            color="black"
          />
        ) : this.props.emailAddress ? (
          <MaterialCommunityIcons
            name="email"
            style={{position: 'absolute', left: 10, top: 10}}
            size={20}
            color="black"
          />
        ) : this.props.password ? (
          <Ionicons
            name="ios-lock"
            style={{position: 'absolute', left: 10, top: 10}}
            size={20}
            color="black"
          />
        ) : this.props.service ? (
          <Ionicons
            name="ios-hammer"
            style={{position: 'absolute', left: 10, top: 10}}
            size={20}
            color="black"
          />
        ) : null}
      </View>
    );
  }
}
