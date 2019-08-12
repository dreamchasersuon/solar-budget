import React from 'react';
import {
    //$RED,
    $GREEN,
    $SILVER,
    $BLUE,
    $WHITE
} from '../constants/colorLiterals';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: $WHITE,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        width: '100%',
        height: 80,
        marginBottom: 20
    },
    headerData: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTarget: {
        fontSize: 11
    },
    headerDateTime: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerDate: {
        flexDirection: 'row',
        marginRight: 10
    },
    headerTime: {
        flexDirection: 'row'
    },
    headerDateTextRegular: {
        fontSize: 10,
        marginRight: 5
    },
    headerDateTextLight: {
        color: $BLUE,
        fontSize: 10
    },
    bodyData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    bodyTransactionValue: {
        fontSize: 25,
        marginRight: 30,
        color: $GREEN
    },
    bodyTransactionTarget: {
        color: $SILVER
    }
})

export default function Transaction (/*props*/) {
    return (
        <View style={styles.container}>
            <View style={styles.headerData}>
                <Text style={styles.headerTarget}>Входящий перевод</Text>
                <View style={styles.headerDateTime}>
                    <View style={styles.headerDate}>
                        <Text style={styles.headerDateTextRegular}>Дата</Text>
                        <Text style={styles.headerDateTextLight}>29.06.19</Text>
                    </View>
                    <View style={styles.headerTime}>
                        <Text style={styles.headerDateTextRegular}>Время</Text>
                        <Text style={styles.headerDateTextLight}>16:20</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bodyData}>
                <Text style={styles.bodyTransactionValue}>+ 1200</Text>
                <Text style={styles.bodyTransactionTarget}>От Екатерина Андреевна К.</Text>
            </View>
        </View>
    )
}

