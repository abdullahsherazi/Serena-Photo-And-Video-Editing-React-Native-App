import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';
export default class Loader extends React.Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          opacity: 0.5,
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: 'black',
            overflow: 'hidden',
          }}>
          <Spinner
            style={{height: '100%', width: '100%'}}
            isVisible={true}
            // size={this.state.size}
            type="Bounce"
            color="black"
          />
        </View>
      </View>
    );
  }
}
