/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { 
    View, 
    StyleSheet
} from 'react-native';
import {
    $BLUE,
    $LIGHTSILVER,
    $WHITE
} from '../constants/colorLiterals';
import BlueButton from '../components/BlueButton';
import Transaction from '../components/Transaction';
import WalletHeader from '../components/WalletHeader';
import MakeTransactionButton from '../components/MakeTransactionButton';
import CreateBillButton from '../components/CreateBillButton';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: $LIGHTSILVER
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
    transactionsContainer: {
        width: '90%',
        marginTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '60%'
    },
    buttonStyle: {
        backgroundColor: $BLUE,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 4,
        width: 100,
        height: 26
    },
    buttonTextStyle: {
        color: $WHITE
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
        marginLeft: 10,
        color: $WHITE
    }
})

export default function Wallet() {
    return (
        <View style={styles.container}>
            <WalletHeader 
                        hasStats 
                        title="Кошелёк"
            />
            <View style={styles.billsAndButtonContainer}>
                <View style={styles.billsContainer}>
                    <BlueButton 
                              title="Счёт" 
                              iconStyle={styles.icon}
                              buttonStyle={styles.buttonStyle}
                              buttonTextStyle={styles.buttonTextStyle} 
                    />
                </View>
                <View>
                    <CreateBillButton />
                </View>
            </View>
            <View style={styles.transactionsContainer}>
                <Transaction />
            </View>
            <MakeTransactionButton />
        </View>
    )
}

