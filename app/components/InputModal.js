import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './Colors'
import { useFonts } from 'expo-font'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const inputModal = ({ modalOpen, setModalOpen, onPressSpeech, onPressCal, pika }) => {
    const [loaded] = useFonts({
        NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
    })

    if(!loaded){
        return null
    }

  return (
    <>
      <Modal 
      visible={modalOpen} 
      transparent={true} 
      animationType={"slide"} 
      >
        <View style={styles.case} >
            <View style={styles.modalStyle} >
                
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <View style={styles.btncase} >
                        <TouchableOpacity 
                        onPress={() => pika('')}
                        activeOpacity={0.7}
                        style={styles.selectcase} >
                            <MaterialIcons 
                            name='clear' 
                            size={46} 
                            color={Colors.ww} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.txt} >Clear</Text>
                    </View>
                    
                    <View style={styles.btncase} >
                        <TouchableOpacity 
                        onPress={onPressSpeech} 
                        activeOpacity={0.7}
                        style={styles.selectcase} 
                        > 
                            <MaterialCommunityIcons 
                            name='text-to-speech' 
                            size={46} 
                            color={Colors.ww} 
                            />
                        </TouchableOpacity>
                        <Text style={[styles.txt, { marginTop: 0.5 }]} >Text to Speech</Text>
                    </View>
                    
                    <View style={styles.btncase} >
                        <TouchableOpacity 
                        onPress={onPressCal} 
                        activeOpacity={0.7}
                        style={styles.selectcase} 
                        >
                            <MaterialCommunityIcons 
                            name='calculator' 
                            size={46} 
                            color={Colors.ww}
                            />
                        </TouchableOpacity>
                        <Text style={styles.txt} >Calculator</Text>
                    </View>
                </View>
                
                <TouchableOpacity 
                style={styles.close} 
                activeOpacity={0.7}
                onPress={() => setModalOpen(!modalOpen)} 
                >
                    <Text style={styles.closetxt} >Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </>
  )
}

export default inputModal

const styles = StyleSheet.create({
    case: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: Colors.nedark
    },
    btncase: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectcase: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
        height: 80,
        borderRadius: 2,
        // borderWidth: 0.6,
        borderBottomWidth: 0.6,
        borderColor: Colors.comp3,
        marginBottom: 7
    },
    txt: {
        color: Colors.www,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'NotoSerif'
    },
    counttxt: {
        color: Colors.ww,
        fontSize: 22,
        fontFamily: 'NotoSerif'
    },
    line: {
        height: 0.8,
        width: '100%',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: Colors.nedark
    },
    line2: {
        height: 0.8,
        width: '100%',
        borderRadius: 5,
        marginTop: 6,
        marginBottom: 14,
        backgroundColor: Colors.ww
    },
    close: {
        alignSelf: 'center',
        marginTop: 15
    },
    closetxt: {
        color: Colors.red,
        fontSize: 21,
        fontWeight: '400'
    }
})