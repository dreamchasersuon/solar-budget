/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { 
    TouchableOpacity, 
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BlueButton (props) {
    return (
        <TouchableOpacity style={props.buttonStyle}>
            <Ionicons name="ios-heart" style={props.iconStyle} />
            <Text style={props.buttonTextStyle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

BlueButton.propTypes = {
    title: PropTypes.string,
    iconStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object
}

