import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import { $BLUE, $TRANSPARENT, $WHITE } from '../../constants/colorLiterals';
import React from 'react';
import ModalHeader from './ModalHeader';
import ModalRatePair from './ModalRatePair';

const styles = StyleSheet.create({
  closeModal: {
    alignItems: 'center',
    borderColor: $BLUE,
    borderRadius: 50,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    marginLeft: 60,
    width: 30
  },
  headerModalStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5
  },
  headerTitleModalStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 110,
    marginTop: 20
  },
  modalActiveArea: {
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
    height: '60%',
    width: '100%'
  },
  modalHiddenArea: {
    alignItems: 'flex-end',
    backgroundColor: $TRANSPARENT,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end'
  },
  ratePairsContainer: { marginBottom: 20, marginTop: 15 },
  scrollView: { alignItems: 'center', width: '100%' }
});

export default function ModalCreateRatePair({
  isVisible,
  toggleAddRatePairModal
}) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={[styles.modalHiddenArea]}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleAddRatePairModal}
            title="Валютная пара"
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.ratePairsContainer}>
              <ModalRatePair
                title="USD/RUB"
                ratePercent="0.23%"
                rateNote="Цена RUB"
                rateValue="1.23"
              />
              <ModalRatePair
                title="USD/CAN"
                ratePercent="0.63%"
                rateNote="Цена CAN"
                rateValue="1.93"
              />
              <ModalRatePair
                title="USD/EUR"
                ratePercent="1.61%"
                rateNote="Цена EUR"
                rateValue="1.74"
              />
              <ModalRatePair
                title="USD/CRN"
                ratePercent="0.02%"
                rateNote="Цена CRN"
                rateValue="0.23"
              />
              <ModalRatePair
                title="USD/GRV"
                ratePercent="0.12%"
                rateNote="Цена GRV"
                rateValue="0.2"
              />
              <ModalRatePair
                title="USD/GBR"
                ratePercent="0.56%"
                rateNote="Цена GBR"
                rateValue="1.63"
              />
              <ModalRatePair
                title="USD/MLD"
                ratePercent="0.01%"
                rateNote="Цена MLD"
                rateValue="0.22"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
