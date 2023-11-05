import React, { Component } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView, Image, PixelRatio, DeviceEventEmitter, PanResponder } from 'react-native';
import Video, { FilterType } from 'react-native-video';
import CustomLoading from '../components/CustomLoading';
import { screenH, screenW } from '../utils/ScreenUtil';

const filterTypes = [
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA
];


export default class CustomVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: true,
            paused: false,
            skin: 'native',
            ignoreSilentSwitch: null,
            isBuffering: false,
            filter: FilterType.NONE,
            filterEnabled: true,
        }
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);

        debugger
        this.videoUrl = this.props.videoUrl
        this.loadDataFinished = this.props.loadDataFinished
        this.poster = this.props.poster
        this.outPaused = this.props.outPaused

        let videoRef

        this._panResponder = PanResponder.create({
            // onStartShouldSetPanResponder: () => true,  // 返回ture时，表示该组件愿意成为触摸事件的响应者，如触摸点击。默认返回false。
            onMoveShouldSetPanResponder: (e: GestureResponderEvent,
                gestureState: PanResponderGestureState,) => true,
            onPanResponderMove: (evt, gestureState) => {
                // this._circleStyles.style.left = this._previousLeft + gestureState.dx;
                // this._circleStyles.style.top = this._previousTop + gestureState.dy;
                // this._updateNativeStyles();
                console.log('onPanResponderMove:' + gestureState.x0 + ':' + gestureState.dx / (screenW - gestureState.x0))// / (screenW - gestureState.x0))
                let rate = gestureState.dx / (screenW - gestureState.x0)
                this.onVideoSeek(rate)
            },    // 手势滑动时触发该事件
        });

    }

    componentDidMount() {
        console.log('componentDidMount: CustomVideo')
        this._gestureHandlers = {
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderGrant: () => { this.setState({ bg: 'red' }) },
            onResponderMove: () => { console.log(123) },
            onResponderRelease: () => { this.setState({ bg: 'white' }) },

            //----------------------外层View拦截了点击事件------------------------
            // onStartShouldSetResponderCapture: () => true,
            // onMoveShouldSetResponderCapture: ()=> true,
        };


    }

    componentWillUnmount() {
        console.log('componentWillUnmount---:CustomVideo')
        this.setState({
            paused: false,
        }, () => {
            console.log('componentWillUnmount---setstate:' + this.state.paused)
        })
    }

    onLoad(data) {
        console.log('On load fired!');
        this.setState({ duration: data.duration });
    }

    onProgress(data) {
        this.setState({ currentTime: data.currentTime });
    }
   
    onVideoSeek(rate) {
        // return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);

        // console.log('videoSeek:' + screenW)
        // console.log('onVideoSeek:' + this.state.currentTime)
        let cur = this.state.currentTime + this.state.duration * rate
        this.refs.video.seek(cur)

        // this.videoRef.seek(10)

    }
    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        console.log('CustomVideo-onBuffer------isBuffering:' + this.state.isBuffering)
        this.setState({ isBuffering });
        this.setState({
            loadDataFinished: true,
        })
        console.log('CustomVideo-onBuffer------loadDataFinished:' + this.props.loadDataFinished)
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    setFilter(step) {
        let index = filterTypes.indexOf(this.state.filter) + step;

        if (index === filterTypes.length) {
            index = 0;
        } else if (index === -1) {
            index = filterTypes.length - 1;
        }

        this.setState({
            filter: filterTypes[index]
        })
    }
    renderSkinControl(skin) {
        const isSelected = this.state.skin == skin;
        const selectControls = skin == 'native' || skin == 'embed';
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    controls: selectControls,
                    skin: skin
                })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {skin}
                </Text>
            </TouchableOpacity>
        );
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate == rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }
    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode == resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode: resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume == volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
        const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

        return (
            <TouchableOpacity onPress={() => { this.setState({ ignoreSilentSwitch: ignoreSilentSwitch }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {ignoreSilentSwitch}
                </Text>
            </TouchableOpacity>
        )
    }

    renderCustomSkin() {
        console.log('renderCustomSkin')
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.fullScreen} onPress={() => { this.setState({ paused: !this.state.paused }) }}>
                    <Video
                        source={{ uri: this.videoUrl }}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => { AlertIOS.alert('Done!') }}
                        repeat={true}
                        filter={this.state.filter}
                        filterEnabled={this.state.filterEnabled}
                    />
                </TouchableOpacity>
                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        {/* <View style={styles.skinControl}>
                            {this.renderSkinControl('custom')}
                            {this.renderSkinControl('native')}
                            {this.renderSkinControl('embed')}
                        </View> */}
                        {/* {
                            (this.state.filterEnabled) ?
                                <View style={styles.skinControl}>
                                    <TouchableOpacity onPress={() => {
                                        this.setFilter(-1)
                                    }}>
                                        <Text style={styles.controlOption}>Previous Filter</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.setFilter(1)
                                    }}>
                                        <Text style={styles.controlOption}>Next Filter</Text>
                                    </TouchableOpacity>
                                </View> : null
                        } */}
                    </View>
                    <View style={styles.generalControls}>
                        {/* <View style={styles.rateControl}>
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(2.0)}
                        </View> */}

                        {/* <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                            {this.renderVolumeControl(1.5)}
                        </View> */}

                        {/* <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}
                            {this.renderResizeModeControl('contain')}
                            {this.renderResizeModeControl('stretch')}
                        </View> */}
                    </View>
                    {/* <View style={styles.generalControls}>
                        {
                            (Platform.OS === 'ios') ?
                                <View style={styles.ignoreSilentSwitchControl}>
                                    {this.renderIgnoreSilentSwitchControl('ignore')}
                                    {this.renderIgnoreSilentSwitchControl('obey')}
                                </View> : null
                        }
                    </View> */}

                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }


    renderNativeSkin() {
        // console.log('CustomVideo: state.paused:' + this.props.outPaused)
        // debugger
        const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
        return (
            <View style={styles.container}  {...this._panResponder.panHandlers}>
                {this.props.videoUrl != null ?
                    <TouchableOpacity activeOpacity={1} style={styles.fullScreen}  
                        onLongPress={() => {  this.setState({ rate: 2 }) }}
                        onPressOut={() => { this.setState({ rate: 1 }) }}
                        onPress={(event) => { this.setState({ paused: !this.state.paused }) }}>
                        <View style={styles.fullScreen}>
                            <Video ref="video"
                                source={{ uri: this.props.videoUrl }}
                                key={this.props.videoUrl}
                                style={videoStyle}
                                rate={this.state.rate}
                                paused={this.state.paused || this.props.outPaused}
                                volume={this.state.volume}
                                muted={this.state.muted}
                                ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                                resizeMode={this.state.resizeMode}
                                onLoad={this.onLoad}
                                onBuffer={this.onBuffer}
                                pictureInPicture={true}
                                onProgress={this.onProgress}
                                onEnd={() => { alert('播放完!') }}
                                repeat={true}
                                controls={this.state.controls}
                                filter={this.state.filter}
                                filterEnabled={this.state.filterEnabled}
                                poster={this.props.poster}
                            />
                        </View>
                    </TouchableOpacity>
                    : <></>}
                {this._renderCustomLoading()}
            </View>
        );
    }

    _renderCustomLoading() {
        return (
            <CustomLoading showSpinner={!this.props.loadDataFinished || !this.props.loadDataFinished}></CustomLoading>
        )
    }
    render() {
        return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenW,
        height: screenH - 145,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        height: 300
    }
});
