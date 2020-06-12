import React from 'react';
import {View, Animated, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import AnimatedTypeWriter from 'react-native-animated-typewriter';
import * as color from '../constants/color';

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.4);
  }
  componentDidMount() {
    this.spring();
    let timeOutNavigate = setTimeout(() => {
      this.props.reduxActions.loadData(this.props.navigation);
      clearTimeout(timeOutNavigate);
    }, 3000);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.themeColor}}>
        <GlobalHeader />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -60,
          }}>
          <Animated.Image
            style={{
              width: 100,
              height: 100,
              transform: [{scale: this.springValue}],
            }}
            source={require('../../assets/images/appIcon.png')}
          />
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              marginTop: 10,
            }}>
            <AnimatedTypeWriter
              timeBetweenLetters={100}
              textStyle={{
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
              }}
              containerStyle={{borderWidth: 0, backgroundColor: 'transparent'}}
              text={'SERENA'}
            />
          </View>
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
)(SplashScreen);
