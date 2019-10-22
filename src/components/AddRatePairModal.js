import {
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  TouchableNativeFeedback
} from 'react-native';
import { $BLUE, $TRANSPARENT, $WHITE } from '../constants/colorLiterals';
import Close from '../../assets/close.svg';
import React from 'react';
import RateInfo from '../../assets/rate_info.svg';
import SelectRatePair from '../../assets/select_rate-pair.svg';

//TODO: refactor into smaller components eject styles
export default function AddRatePairModal({
  isVisible,
  toggleAddRatePairModal
}) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: '100%',
          backgroundColor: $TRANSPARENT
        }}
      >
        <View
          style={{
            width: '100%',
            height: '60%',
            alignItems: 'center',
            backgroundColor: $WHITE,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 8
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontWeight: '700',
                marginLeft: 110
              }}
            >
              Валютная пара
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderWidth: 1,
                borderColor: $BLUE,
                width: 30,
                marginLeft: 60,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={toggleAddRatePairModal}
            >
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ alignItems: 'flex-start', width: '100%' }}
          >
            <View style={{ marginTop: 15, marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/RUB</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/CAN</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/EUR</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/CRN</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/GRV</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/GBR</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: 23,
                  paddingLeft: 30,
                  marginTop: 20
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RateInfo />
                  <Text style={{ fontSize: 14, marginLeft: 10 }}>USD/MLD</Text>
                </View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple($BLUE, true)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SelectRatePair />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
