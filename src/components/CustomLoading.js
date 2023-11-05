import Spinkiter from 'react-native-spinkit';
import { Modal, View } from 'react-native';
import React, { Component } from 'react';
/**
 *
 * List of available spinkerType
 * CircleFlip
 * Bounce
 * Wave
 * WanderingCubes
 * Pulse
 * ChasingDots
 * ThreeBounce
 * Circle
 * 9CubeGrid
 * WordPress (IOS only)
 * FadingCircle
 * FadingCircleAlt
 * Arc (IOS only)
 * ArcAlt (IOS only)
 
 */
export default class CustomLoading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                visible={this.props.showSpinner}
                transparent={true}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}>
                    <Spinkiter isVisible={this.props.showSpinner} size={this.props.spinkerSize} type={this.props.spinkerType || 'FadingCircleAlt'} color={this.props.spinkerColor || 'white'} />
                </View>
            </Modal>
        );
    }
}