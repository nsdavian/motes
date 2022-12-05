import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from './Colors'

const ThemeModal = ({ visibility, setVisibility }) => {

    const dev = () => {
        ToastAndroid.showWithGravity('In development', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

  return (
    <>
        <Modal 
        visible={visibility} 
        animationType='fade' 
        transparent={true}
        >
            <View style={styles.case} >
                <View style={styles.modalcase} >
                    <View style={styles.btncase} >
                        <TouchableOpacity 
                        style={styles.btn} 
                        onPress={dev}
                        activeOpacity={0.6}
                        > 
                            <Ionicons name='ios-moon-outline' size={50} color={Colors.neBlu} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.btn} 
                        onPress={dev}
                        activeOpacity={0.6}
                        >
                            <Ionicons name='sunny-outline' size={50} color={Colors.undo} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                    style={styles.cancelcase} 
                    activeOpacity={0.6}
                    onPress={() => setVisibility(!visibility)} 
                    >
                        <Text style={styles.canceltxt} >Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>
  )
}

export default ThemeModal

const styles = StyleSheet.create({
    case: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalcase: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.nedark
    },
    btncase: {
        flexDirection: 'row'
    },
    btn: {
        padding: 25
    },
    cancelcase: {
        width: '80%',
        padding: 8,
        paddingBottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    canceltxt: {
        fontSize: 18,
        color: Colors.red
    }
})