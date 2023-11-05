import React,{Component} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import PropTypes from 'prop-types'
let goldenRatio = 0.618//黄金比例
export class CustomButton extends Component {
    static defaultProps = {
        bgColor:'#000',
        fColor:'#fff',
        size:10
    };
    static propTypes = {
        //文本的样式
        style:PropTypes.object,
        //背景颜色
        bgColor:PropTypes.string,
        //字体颜色
        fColor:PropTypes.string,
        //文本
        text:PropTypes.string.isRequired,
        //按钮事件
        onPress:PropTypes.func.isRequired,
        //用于给残障人士显示的文本
        accessibilityLabel:PropTypes.string,
        //大小，这个大小不是指按钮的大小，而是padding的大小
        size:PropTypes.number,
        width:PropTypes.number,
        // borderStyle: 0: 默认 1：边框
        borderStyle:PropTypes.number

    }
    render(){

        let {style,bgColor,fColor,text,accessibilityLabel,size,width,borderStyle} = this.props
        let w = size*goldenRatio
        let h = size - w
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Text numberOfLines={1} style={{
                    paddingHorizontal:w,
                    paddingVertical:h,
                    borderRadius:5,
                    fontWeight:'bold',
                    borderWidth: borderStyle,
                    borderColor: "green",
                    color:fColor,
                    ...style}}
                    accessibilityLabel={accessibilityLabel}
                    >{text}</Text>
            </TouchableOpacity>
        )
    }
}
