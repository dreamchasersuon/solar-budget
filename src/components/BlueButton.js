/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function BlueButton (props) {
    return (
        <TouchableOpacity style={props.buttonStyle}>
            <Text style={props.buttonTextStyle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

BlueButton.propTypes = {
    title: PropTypes.string,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object
}

