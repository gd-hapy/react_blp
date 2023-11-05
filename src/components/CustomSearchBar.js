import React from "react";
import { View, Text, TextInput, Button, Dimensions, useRef, StyleSheet } from 'react-native'
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { screenW } from "../utils/ScreenUtil";
import { commonStyle } from "../utils/commonStyle";

export default class CustomSearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
        // this.searchBtnClick = this.searchBtnClick.bind(this)
    }

    searchBtnClick = (e) => {
        if (this.state.text.length > 0) {
            this.props.navigate('SearchResultsPage',
                { "type": 0, "keyword": this.state.text },)
        }
        
        this.refs.input.clear()
    }
    // searchBtnClick (e){
    //     debugger
    //     // console.log("searchBtnClick:" + this.state.buttonText)
    //     console.log('searchBtnClick:' + this.state.text);
    // }

    render() {
        return (
            <View style={styles.container}>
                <TextInput ref='input' onChangeText={(text) => this.setState({ text })} placeholder='请输入视频名称' placeholderTextColor="#808A87" style={styles.input}></TextInput>
                <View style={styles.container_sub}>
                    <Button title="搜索" style={styles.btn} color={"white"} backgroundColor="red" onPress={this.searchBtnClick}></Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        height: 50,
        width: screenW - 60 - 60,
        margin: 30,
        borderWidth: 1,
        borderColor: commonStyle.themeColor,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 10,
        color: 'white'
    },
    container_sub: {
        width: 60,
        height: 50,
        marginTop: 30,
        backgroundColor: commonStyle.themeColor,
        marginLeft: -30,
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    btn: {
        height: 50,
    },
});