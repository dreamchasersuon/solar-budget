/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';
import {
    $BLUE,
    //$SILVER,
    $WHITE
} from '../constants/colorLiterals';
import BlueButton from '../components/BlueButton';
import Transaction from '../components/Transaction';
import WalletHeader from '../components/WalletHeader';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    billsAndButtonContainer: {
        flexDirection: 'row',
        marginTop: 5,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    billsContainer: {
        width: '70%',
        marginLeft: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
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
        color: $WHITE
    },
    transactionsContainer: {
        width: '90%',
        marginTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80%'
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

export default function Wallet() {
    return (
        <View style={styles.container}>
            <WalletHeader />
            <View style={styles.billsAndButtonContainer}>
                <View style={styles.billsContainer}>
                    <BlueButton 
                            title="Счёт" 
                            buttonStyle={styles.buttonStyle}
                            buttonTextStyle={styles.buttonTextStyle} 
                    />
                </View>
                <View>
                    <TouchableOpacity 
                                      onPress={() => null}
                                      style={styles.buttonCreateBill}
                    >
                        <Text style={styles.createBillText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.transactionsContainer}>
                <Transaction />
            </View>
        </View>
    )
}

