import React, { Component } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView, Image, PixelRatio, DeviceEventEmitter, Button } from 'react-native';
import { getVideoInfo, parseVideoPlaingUrl } from '../services/videoPlayerService';
import CustomPopView from '../components/CustomPopView';
import { BaseComponent } from '../components/baseComponent/baseComponent';
import { commonStyle } from '../utils/commonStyle';
import CustomVideo from '../components/CustomVideo';
import { screenH, screenW } from '../utils/ScreenUtil';
import CustomLoading from '../components/CustomLoading';


export default class VideoPlayerPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {

            paused: false,
            videoInfo: null,
            isVisible: false,
            currentPlayingOriginUrl: null, // 正在播放播放视频原始url
            currentPlayingParsedUrl: null, // 正在播放的解析后的视频url
            loadDataFinished: false, // 加载数据是否结束 
        }
    }

    componentDidMount() {
        const { flag, id } = this.props.route.params
        console.log('flag: id:' + flag + id)
        getVideoInfo(flag, id).then((res) => {
            this.setState({
                videoInfo: res,
                currentPlayingOriginUrl: res.url,
                poster: res.pic,
            }, () => {
                console.log('componentDidMount:' + this.state.currentPlayingOriginUrl)
                this.navigationBarProps()
                if (this.state.videoInfo.url.includes('.html')) {
                    this._parseVideoPlayingUrl(this.state.currentPlayingOriginUrl)
                } else {
                    this.setState({
                        currentPlayingParsedUrl: this.state.currentPlayingOriginUrl,
                        loadDataFinished: true,
                    })
                }
            })
        })
    }

    componentWillUnmount() {
        console.log('componentWillUnmount---')
        this.setState({
            paused: true,
        })
    }


    _parseVideoPlayingUrl(url) {
        parseVideoPlaingUrl(url).then((res) => {
            console.log("_parseVideoPlayingUrl:" + res)
            if (url != null && url.length > 0) {
                this.setState({
                    currentPlayingParsedUrl: res,
                    loadDataFinished: true,
                })
            }
        })
    }


    _handleCurrentPlayingUrlAtIndex(index) {
        debugger
        this.setState({
            loadDataFinished: false,
        })

        if (this.state.videoInfo != null) {
            let originUrl = this.state.videoInfo.info[0].video[index]
            let playingUrl = originUrl
            let arr = playingUrl.split('$')
            if (arr.length == 3) {
                playingUrl = arr[1]
            }
            if (playingUrl.endsWith('.html')) {
                this._parseVideoPlayingUrl(playingUrl)
            } else {
                this.setState({
                    currentPlayingOriginUrl: originUrl,
                    currentPlayingParsedUrl: playingUrl,
                    loadDataFinished: true,
                }, () => {
                    this.forceUpdate();
                })
            }
        }
    }

    _renderPopView() {
        // console.log('_renderPopView')
        return this.state.videoInfo != null ? <CustomPopView dataSource={this.state.videoInfo.info[0].video} callback={(i) => {
            this.setState({
                currentPlayingOriginUrl: null,
                currentPlayingParsedUrl: null,
            })
            this._handleCurrentPlayingUrlAtIndex(i)

        }} show={this.state.isVisible} closeModal={(show) => {

            this.setState({
                isVisible: show
            })
        }} currentPlayingUrl={this.state.currentPlayingOriginUrl} /> : <></>
    }

    navigationBarProps() {
        var title = ""
        var rightTitle = ""
        if (this.state.videoInfo != null) {
            title = this.state.videoInfo.title
            if (this.state.videoInfo.info[0].video.length > 0) {
                rightTitle = "..."
            }
        }

        return {
            title: title,
            titleStyle: {
                color: 'white',
                height: 30,
                marginTop: commonStyle.navHeight,
            },
            // subTitle: 'subTitle',
            rightTitle: rightTitle,
            rightTitleStyle: { color: 'white', width: 50, height: 50, marginBottom: -40, lineHeight: 50, textAlign: 'center', textAlignVertical: 'center' }
        }
    }

    onLeftPress() {
        this.setState({ paused: true })

        this.props.navigation.goBack();
    }

    onRightPress() {
        this.setState({ isVisible: !this.state.isVisible })
    }

    _renderCustomLoading() {
        return (
            <CustomLoading showSpinner={!this.state.loadDataFinished}></CustomLoading>
        )
    }
    _render() {
        return (
            this.state.currentPlayingParsedUrl != null ?
                <View style={styles.container}>
                    <CustomVideo loadDataFinished={this.state.loadDataFinished} videoUrl={this.state.currentPlayingParsedUrl} poster={this.state.poster} outPaused={this.state.paused}></CustomVideo>
                    {this._renderPopView()}
                    {this._renderCustomLoading()}
                </View>
                : <></>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: 'black',
        flex: 1,
    },
});
