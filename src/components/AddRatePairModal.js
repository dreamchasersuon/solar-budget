import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import { $BLUE, $TRANSPARENT, $WHITE } from '../constants/colorLiterals';
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
    height: '80%',
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

export default function AddRatePairModal({
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
              <ModalRatePair title="USD/RUB" />
              <ModalRatePair title="USD/CAN" />
              <ModalRatePair title="USD/EUR" />
              <ModalRatePair title="USD/CRN" />
              <ModalRatePair title="USD/GRV" />
              <ModalRatePair title="USD/GBR" />
              <ModalRatePair title="USD/MLD" />
              <ModalRatePair title="USD/RUB" />
              <ModalRatePair title="USD/CAN" />
              <ModalRatePair title="USD/EUR" />
              <ModalRatePair title="USD/CRN" />
              <ModalRatePair title="USD/GRV" />
              <ModalRatePair title="USD/GBR" />
              <ModalRatePair title="USD/MLD" />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
