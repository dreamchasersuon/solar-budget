import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import { $BLUE, $TRANSPARENT, $WHITE } from '../constants/colorLiterals';
import React from 'react';
import ModalHeader from './ModalHeader';
import ModalRatePair from './ModalRatePair';

const styles = StyleSheet.create({
  modalHiddenArea: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    backgroundColor: $TRANSPARENT
  },
  modalActiveArea: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    backgroundColor: $WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8
  },
  headerModalStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  headerTitleModalStyle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '700',
    marginLeft: 110
  },
  closeModal: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: $BLUE,
    width: 30,
    marginLeft: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: { alignItems: 'center', width: '100%' },
  ratePairsContainer: { marginTop: 15, marginBottom: 20 }
});

export default function AddRatePairModal({
  isVisible,
  toggleAddRatePairModal
}) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalHiddenArea}>
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
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
