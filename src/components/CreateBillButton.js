/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { 
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    $WHITE,
    $BLUE
} from '../constants/colorLiterals';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
    buttonCreateBill: {
        backgroundColor: $BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        width: 40,
        height: 26
    },
    createBillText: {
        color: $WHITE,
        fontSize: 20
    }
})

export default function CreateBillButton() {
    return (
        <TouchableOpacity 
                        style={styles.buttonCreateBill}
        >
                <Ionicons 
                        name="ios-add" 
                        style={styles.createBillText} 
                />
        </TouchableOpacity>
    )
}


