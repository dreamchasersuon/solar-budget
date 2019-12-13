import { View, StyleSheet, Text } from 'react-native';
import mapColorsToTheme from '../../constants/colorLiterals';
import React, { useRef } from 'react';
import RatePairModal from '../RatePairModal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import setRef from '../../constants/refs';
import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  modalHeader: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalActiveArea: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  headerTitleModalStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20
  },
  ratePairsContainer: {
    marginBottom: 20,
    marginTop: 15,
    alignItems: 'center',
    width: '100%'
  }
});

export default function ModalCreateRatePair() {
  const ref = useRef();
  setRef({ name: 'rate', ref });

  const { t, i18n } = useTranslation('ModalCreateRatePair');

  const user = useSelector(state => state.user.find(user => user.active));
  const { background_top, text_main } = mapColorsToTheme(user.theme);
  const themeStyles = StyleSheet.create({
    modalActiveAreaBackground: {
      backgroundColor: background_top
    },
    textColorMain: {
      color: text_main
    }
  });

  const renderHeader = () => {
    return (
      <View style={[themeStyles.modalActiveAreaBackground, styles.modalHeader]}>
        <Text style={[styles.headerTitleModalStyle, themeStyles.textColorMain]}>
          {t('headerTitle')}
        </Text>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View
        style={[styles.modalActiveArea, themeStyles.modalActiveAreaBackground]}
      >
        <View style={styles.ratePairsContainer}>
          <RatePairModal
            title="USD/RUB"
            ratePercent="0.23%"
            rateNote={`${t('ratePairNote')} RUB`}
            rateValue="1.23"
          />
          <RatePairModal
            title="USD/CAN"
            ratePercent="0.63%"
            rateNote={`${t('ratePairNote')} CAN`}
            rateValue="1.93"
          />
          <RatePairModal
            title="USD/EUR"
            ratePercent="1.61%"
            rateNote={`${t('ratePairNote')} EUR`}
            rateValue="1.74"
          />
          <RatePairModal
            title="USD/CRN"
            ratePercent="0.02%"
            rateNote={`${t('ratePairNote')} CRN`}
            rateValue="0.23"
          />
          <RatePairModal
            title="USD/GRV"
            ratePercent="0.12%"
            rateNote={`${t('ratePairNote')} GRV`}
            rateValue="0.2"
          />
          <RatePairModal
            title="USD/GBR"
            ratePercent="0.56%"
            rateNote={`${t('ratePairNote')} GBR`}
            rateValue="1.63"
          />
          <RatePairModal
            title="USD/MLD"
            ratePercent="0.01%"
            rateNote={`${t('ratePairNote')} MLD`}
            rateValue="0.22"
          />
        </View>
      </View>
    );
  };
  return (
    <BottomSheet
      ref={ref}
      enabledContentGestureInteraction={false}
      snapPoints={[0, 230, 400]}
      renderHeader={renderHeader}
      renderContent={renderContent}
    />
  );
}
