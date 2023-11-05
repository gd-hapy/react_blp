import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import { CustomButton } from './CustomButton';
import { commonStyle } from '../utils/commonStyle';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
export default class CustomPopView extends Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = {
            isVisible: this.props.show,
            // currentPlayingUrl: this.props.currentPlayingUrl,
        };
        this.dataSource = this.props.dataSource;
        this.currentPlayingUrl = this.props.currentPlayingUrl;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        console.log('closeModal--clicked')
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    renderItem(item, i) {
        let arr = item.split('$')
        return (
            <TouchableOpacity key={i} onPress={this.choose.bind(this, i)} style={styles.item}>
                <View style={{display: 'flex',flexDirection:'row'}}>
                    {item.includes(this.props.currentPlayingUrl) ? <Image style={{width: 16, height:16, marginLeft: 5}} source={require('../assets/image/playing.png')} ></Image>:<Text></Text>}

                    <Text style={styles.itemText}>{arr[0]}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    choose(i) {
        if (this.state.isVisible) {
            this.props.callback(i);
            this.closeModal();
        }
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                <Image style={{display:'flex',flexDirection:'row',marginLeft: width - 40, marginTop: 10, width: 20, height:20}} source={require('../assets/image/close.png')} ></Image>

                </TouchableWithoutFeedback>
                <ScrollView style={styles.optArea}>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
                {
                        this.dataSource.map((item, i) => this.renderItem(item, i))
                    }
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}>
                    {/* <TouchableOpacity style={styles.container} activeOpacity={1}
                                      onPress={() => this.closeModal()}> */}
                        {this.renderDialog()}
                    {/* </TouchableOpacity> */}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: width,
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'white',
        height: 500,
    },
    optArea: {
        flex: 1,
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        marginTop: 12,
        marginBottom: 12,
    },
    item: {
        width: 80,
        height: 40,
        // paddingLeft: 20,
        // paddingRight: 20,
        // marginTop: 10,
        justifyContent: 'center',
        // alignContent: 'center',
        // alignSelf: 'center',
        textAlign: 'center',
        margin: 20,
        // alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: commonStyle.themeColor,
    },
    itemText: {
        position: "absolute",
        // marginLeft: 20,
        fontSize: 15,
        textAlign:'center',
        width: 80,
        fontSize: 16,
        // backgroundColor: 'black'
        // justifyContent:'center',
    },
    cancel: {
        width: width,
        height: 30,
        marginTop: 12,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
});