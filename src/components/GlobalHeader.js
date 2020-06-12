import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {Header, Body, Left, Right} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import DrawerView from './DrawerView';
import * as color from '../constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';

class GlobalHeader extends Component {
  state = {
    visible: false,
  };
  hideDrawer = () => {
    this.setState({visible: false});
  };
  render() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Header
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
        }}
        androidStatusBarColor={color.themeColor}>
        <Left style={{flex: 1}}>
          {this.props.backArrow ? (
            <TouchableOpacity
              style={styles.arrowView}
              onPress={() => this.props.navigation.goBack()}>
              <FontAwesome
                name={'chevron-left'}
                size={15}
                color={color.themeColor}
              />
            </TouchableOpacity>
          ) : this.props.drawerIcon === true ? (
            <TouchableOpacity
              style={styles.arrowView}
              onPress={() => this.setState({visible: true})}>
              <AntDesign
                name={'menu-fold'}
                size={19}
                color={color.themeColor}
              />
            </TouchableOpacity>
          ) : null}
        </Left>

        <Body
          style={
            this.props.threeWords
              ? {flex: 3, alignItems: 'center'}
              : this.props.twoWords
              ? {flex: 2, alignItems: 'center'}
              : {flex: 1, alignItems: 'center'}
          }>
          {this.props.headingText !== '' ? (
            <Text
              style={[
                styles.Text,
                {
                  color: color.themeColor,
                  fontSize: 17,
                },
              ]}>
              {this.props.headingText}
            </Text>
          ) : null}
        </Body>

        <Right style={{flex: 1, justifyContent: 'center'}} />

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this.hideDrawer}
          onBackButtonPress={this.hideDrawer}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
          }}
          animationInTiming={800}
          animationOutTiming={800}
          animationOut="slideOutLeft"
          animationIn="slideInLeft">
          <View style={{width: deviceWidth * 0.73, height: '100%'}}>
            <DrawerView
              hideDrawer={this.hideDrawer}
              navigation={this.props.navigation}
            />
          </View>
        </Modal>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: "hidden",
    backgroundColor: 'red',
  },
  arrowView: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  searchImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
    alignSelf: 'flex-end',
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
)(GlobalHeader);
