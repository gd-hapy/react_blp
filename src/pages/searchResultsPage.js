import React from 'react';

import { View, TouchableOpacity, Text, ScrollView, Dimensions, StyleSheet, DeviceEventEmitter } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { storage_get_rankData } from '../utils/storage';
import { getSearchResultsData } from '../services/searchResultsService';
import LinearGradient from 'react-native-linear-gradient'
import { screenH, screenW } from '../utils/ScreenUtil';
import { commonStyle } from '../utils/commonStyle';
import { BaseComponent } from '../components/baseComponent/baseComponent';
import CustomLoading from '../components/CustomLoading';


class SearchResultsPage extends BaseComponent {

    state = {
        list: [],// 排行榜
        searchModel: null,// 搜索数据
        loadDataFinished: false,
    }

    constructor(props) {
        super(props)
        // debugger
    }

    componentDidMount() {
        debugger
        const { type, keyword } = this.props.route.params
        if (type == 0) {// 搜索
            this._requestSearchList(keyword)
        } else {// 排行榜
            this._requestRankList()
        }
    }

    navigationBarProps() {
        const { type, keyword } = this.props.route.params
        debugger
        var title = ""
        if (type == 0) {
            if (this.state.searchModel != null) {
                title = "搜索到相关视频" + this.state.searchModel.info.length + "个，请点击访问"
            }
        } else {
            title = "搜索排行榜-TOP100"
        }
        return {
            title: title,
            titleStyle: {
                color:'white',
                height: 30,
                marginTop:88,
            }
        }
    }

    onLeftPress() {
        // alert('点击了左边的按钮')
        this.props.navigation.goBack();
    }
    onRightPress() {
        // alert('点击了右边的按钮')
    }
    _requestRankList() {
        console.log("_requestRankList:")
        let data = storage_get_rankData()
        this.setState({
            list: data,
            loadDataFinished: true,
        }, () => {
            // console.log(this.state.list); 
        })
    }

    _requestSearchList(keyword) {
        getSearchResultsData(keyword).then((res) => {
            // debugger
            this.setState({
                searchModel: res,
                loadDataFinished: true,
            }, () => {
                // console.log("searchModel:::" + this.state.searchModel.info); 
                this.navigationBarProps()
            })
        })
    }


    itemClick = (item) => {
        debugger
        this.props.navigation.navigate('VideoPlayerPage',
            { "flag": item.flag, "id": item.id },
        )
    }


    itemClickToSearchResultsPage = (keyword) => {
        debugger
        // this.props.navigation.navigate('SearchResultsPage',
        //     { "type": 0, "keyword": keyword },
        // )
        // 重新入栈，加载
        this.props.navigation.push('SearchResultsPage',
        { "type": 0, "keyword": keyword },)
    }

    _render() {
        const { type, keyword } = this.props.route.params

        return (
            <LinearGradient style={{ width: screenW, height: screenH }} colors={['#0a2e38', '#000000']}>
                
                <CustomLoading showSpinner={!this.state.loadDataFinished}></CustomLoading>

                <ScrollView style={styles.container}>
                    <View style={styles.view}>

                        {type == 0 ? this.state.searchModel ? this.state.searchModel.info.map((item, index) => (
                            <CustomButton width={100} key={index} onPress={() => this.itemClick(item)} text={item.title + "  " + item.from} borderStyle={1} style={styles.btn} bgColor="gray" fColor={commonStyle.themeColor}></CustomButton>
                        )) : this.state.loadDataFinished ? <Text style={{color:'white', flex:1, textAlign:'center'}}>没有数据，请重试！</Text> : <></> : this.state.list.map((item, index) => (
                            <CustomButton width={100} key={index} onPress={() => this.itemClickToSearchResultsPage(item)} text={item} borderStyle={1} style={styles.btn} bgColor="gray" fColor={commonStyle.themeColor}></CustomButton>
                        ))}
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        marginBottom: commonStyle.navHeight + commonStyle.bottonBtnHeight - 20,
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btn: {
        padding: 0,
        marginLeft: 20,
        marginTop: 20
    }

})
export default SearchResultsPage;