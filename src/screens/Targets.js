import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { $BLUE, $LIGHTSILVER, $WHITE } from "../constants/colorLiterals";
import BlueButton from "../components/BlueButton";
import Transaction from "../components/Transaction";
import WalletHeader from "../components/WalletHeader";
import MakeTransactionButton from "../components/MakeTransactionButton";
import CreateBillButton from "../components/CreateBillButton";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: $LIGHTSILVER
  },
  billsAndButtonContainer: {
    flexDirection: "row",
    marginTop: 5,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  billsContainer: {
    width: "70%",
    marginLeft: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  transactionsContainer: {
    width: "90%",
    marginTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "35%"
  },
  buttonStyle: {
    backgroundColor: $BLUE,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
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
  },
  transactionsTitle: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "normal"
  }
});

export default function Targets() {
  return (
    <View style={styles.container}>
      <WalletHeader title="Цели" />
      <View style={styles.billsAndButtonContainer}>
        <View style={styles.billsContainer}>
          <BlueButton
            title="Машина"
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
        <Text style={styles.transactionsTitle}>История платежей</Text>
        <Transaction />
      </View>
      <MakeTransactionButton />
    </View>
  );
}
