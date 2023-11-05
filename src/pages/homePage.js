import React from 'react';
import { CustomTime } from '../components/CustomTime';
import CustomSearchBar from '../components/CustomSearchBar';
import CustomHotSearch from '../components/CustomHotSearch'
import LinearGradient from 'react-native-linear-gradient'


import { View, Text, Button, TextInput, Dimensions, StyleSheet } from 'react-native';
import { screenH, screenW } from '../utils/ScreenUtil';
import { BaseComponent } from '../components/baseComponent/baseComponent';
import { transform } from 'typescript';
import { switchBaseUrl } from '../api/reuqestApi';

// import LoadingPoint from '../components/CustomLoading';
import Toast from 'react-native-easy-toast';
// import { Chase } from 'react-native-animated-spinkit';
import Spinner from 'react-native-spinkit';
import CustomLoading from '../components/CustomLoading';

class HomePage extends BaseComponent {
  
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let toastRef;
  }

  componentDidMount(props) {

  }

  onPress = () => {

    this.props.navigation.goBack();
  }

  fn(val) {
    debugger
    console.log('ffnn')
    this.navigate('VideoPlayerPage', {
      params: { "type": "0", "keyword": "abc" },
    })

  }
  
  
  navigationBarProps() {
    return {
      hiddenLeftItem: true,
      // title: '首页',
      // subTitle: '---',
      // rightIcon: {
      //   name: 'rocket',
      //   size: 20,
      //   color: '#333'
      // }
    }
  }

  // onLeftPress() {
  //   // alert('点击了左边的按钮')
  //   this.props.navigation.goBack();

  // }
  // onRightPress() {
  //   alert('点击了右边的按钮')
  // }
  _changeSourceClick = () => {

    // console.log('_changeSourceClick:' + this.refs.myView)
    switchBaseUrl()
    // console.log('ref:' + this.toastRef)
    // AlertIOS.alert('Done!')
  }

  _render() {
    return (
      <LinearGradient style={styles.container} colors={['#0a2e38', '#000000']}>
        <View>
        
          <Toast ref={(toast) => toastRef = toast} position={'top'}/>

          <CustomTime></CustomTime>
          <CustomSearchBar navigate={this.props.navigation.navigate} ></CustomSearchBar>
          <CustomHotSearch navigate={this.props.navigation.navigate} ></CustomHotSearch>
          <Button style={{width:50,height:50}} color='gray' title='换源' onPress={this._changeSourceClick}></Button>
        </View>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  container: {
     width: screenW, 
     height: screenH 
    }
  })

export default HomePage;