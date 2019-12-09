import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import {
  $BLACK_FADE,
  $LIGHT_BLUE,
  $WHITE
} from '../../constants/colorLiterals';
import React from 'react';
import ModalHeader from './ModalHeader';
import ModalRatePair from './ModalRatePair';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  closeModal: {
    alignItems: 'center',
    borderColor: $LIGHT_BLUE,
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
    backgroundColor: $BLACK_FADE,
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
  const { t, i18n } = useTranslation('ModalCreateRatePair');
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={[styles.modalHiddenArea]}>
        <View style={styles.modalActiveArea}>
          <ModalHeader
            containerStyle={styles.headerModalStyle}
            titleStyle={styles.headerTitleModalStyle}
            closeModalStyle={styles.closeModal}
            handleOnClose={toggleAddRatePairModal}
            title={t('headerTitle')}
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.ratePairsContainer}>
              <ModalRatePair
                title="USD/RUB"
                ratePercent="0.23%"
                rateNote={`${t('ratePairNote')} RUB`}
                rateValue="1.23"
              />
              <ModalRatePair
                title="USD/CAN"
                ratePercent="0.63%"
                rateNote={`${t('ratePairNote')} CAN`}
                rateValue="1.93"
              />
              <ModalRatePair
                title="USD/EUR"
                ratePercent="1.61%"
                rateNote={`${t('ratePairNote')} EUR`}
                rateValue="1.74"
              />
              <ModalRatePair
                title="USD/CRN"
                ratePercent="0.02%"
                rateNote={`${t('ratePairNote')} CRN`}
                rateValue="0.23"
              />
              <ModalRatePair
                title="USD/GRV"
                ratePercent="0.12%"
                rateNote={`${t('ratePairNote')} GRV`}
                rateValue="0.2"
              />
              <ModalRatePair
                title="USD/GBR"
                ratePercent="0.56%"
                rateNote={`${t('ratePairNote')} GBR`}
                rateValue="1.63"
              />
              <ModalRatePair
                title="USD/MLD"
                ratePercent="0.01%"
                rateNote={`${t('ratePairNote')} MLD`}
                rateValue="0.22"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
