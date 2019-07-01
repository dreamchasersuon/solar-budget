import React from 'react';
import {
    $BLUE,
    $WHITE
} from '../constants/colorLiterals';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import BlueButton from '../components/BlueButton';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '101%',
        height: '10%',
        marginTop: 40
    },
    headerLeftSideMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeftSideMenu: {
        height: 50,
        width: 15,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: $BLUE
    },
    headerRightSideMenu: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        transform: [{rotate: '90deg'}],
        fontSize: 25
    },
    titleText: {
        fontSize: 20,
        marginLeft: 35
    },
    buttonStyle: {
        backgroundColor: $BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        width: 100,
        height: 26
    },
    buttonTextStyle: {
        color: $WHITE
    }
})

export default function WalletHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeftSideMenuContainer}>
                <View style={styles.headerLeftSideMenu}>
                    <Ionicons 
                            name="ios-reorder" 
                            color="white" 
                            style={styles.icon}
                    />
                </View>
                <Text style={styles.titleText}>Кошелёк</Text>
            </View>
            <View style={styles.headerRightSideMenu}>
                <BlueButton 
                        title="29.000" 
                        buttonStyle={styles.buttonStyle}
                        buttonTextStyle={styles.buttonTextStyle}
                />
            </View>
        </View>
    )
}

