import {
  Modal,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import {
  $BLUE,
  $MEDIUMSILVER,
  $TRANSPARENT,
  $WHITE
} from '../constants/colorLiterals';
import Close from '../../assets/close.svg';
import BlueButton from './BlueButton';
import Delete from '../../assets/delete.svg';
import React from 'react';

//TODO: refactor into smaller components eject styles
export default function CreateTargetModal({
  isVisible,
  toggleCreateTargetModal
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
            height: '70%',
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
                marginLeft: 150
              }}
            >
              Цель
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderWidth: 1,
                borderColor: $BLUE,
                width: 30,
                marginLeft: 110,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={toggleCreateTargetModal}
            >
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <View
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                marginTop: 30,
                width: '100%'
              }}
            >
              <Text style={{ fontSize: 14, color: $BLUE, marginBottom: 10 }}>
                Назначение
              </Text>
              <TextInput
                style={{
                  height: 35,
                  width: '100%',
                  borderColor: $MEDIUMSILVER,
                  borderWidth: 1,
                  borderRadius: 3,
                  color: $MEDIUMSILVER,
                  paddingLeft: 10,
                  fontSize: 10
                }}
                placeholder="Выберите категорию платежа"
              />
            </View>
            <View
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                marginTop: 30,
                width: '100%'
              }}
            >
              <Text style={{ fontSize: 14, color: $BLUE, marginBottom: 10 }}>
                Валюта
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <BlueButton
                  buttonStyle={{
                    backgroundColor: $BLUE,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    width: 100,
                    height: 26,
                    flexDirection: 'row'
                  }}
                  buttonTextStyle={{ color: $WHITE, fontSize: 12 }}
                  title="Рубли"
                />
                <BlueButton
                  buttonStyle={{
                    backgroundColor: $TRANSPARENT,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    width: 100,
                    height: 26,
                    flexDirection: 'row'
                  }}
                  buttonTextStyle={{ color: $MEDIUMSILVER, fontSize: 12 }}
                  title="Доллары"
                />
                <BlueButton
                  buttonStyle={{
                    backgroundColor: $TRANSPARENT,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    width: 100,
                    height: 26,
                    flexDirection: 'row'
                  }}
                  buttonTextStyle={{ color: $MEDIUMSILVER, fontSize: 12 }}
                  title="Евро"
                />
              </View>
            </View>
            <View
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                marginTop: 30,
                width: '100%'
              }}
            >
              <Text style={{ fontSize: 14, color: $BLUE, marginBottom: 5 }}>
                Сумма
              </Text>
              <View
                style={{
                  marginTop: 15,
                  paddingBottom: 20
                }}
              >
                <TextInput
                  style={{
                    height: 55,
                    width: '100%',
                    borderColor: $MEDIUMSILVER,
                    borderBottomWidth: 1,
                    color: $BLUE,
                    textAlign: 'right',
                    fontSize: 28
                  }}
                  placeholder="+ 0"
                  placeholderTextColor={$BLUE}
                />
                <View
                  style={{
                    paddingLeft: 60,
                    paddingRight: 60,
                    marginTop: 20,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      width: '100%',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}
                  >
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>1</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>2</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>3</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>4</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>5</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>6</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>7</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>8</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>9</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          marginLeft: 72,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ fontSize: 28 }}>0</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple($BLUE, true)}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          width: 55,
                          height: 55,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Delete />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 30,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  onPress={toggleCreateTargetModal}
                >
                  <Text style={{ color: $BLUE, fontSize: 16 }}>Завершить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
