import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from './Colors'
import { MaterialIcons } from '@expo/vector-icons' 

const InputBar = ({ addMote, addIcon, addOptions, name }) => {
  return (
    <SafeAreaView
    edges={['bottom']}
    style={styles.case}
    >
        <TouchableOpacity activeOpacity={0.7} onPress={addMote} >
            <MaterialIcons 
            name={addIcon} 
            size={27} 
            style={{ marginLeft: 6 }}
            color={Colors.www} 
            />
        </TouchableOpacity>
        <Text style={styles.txt} >{name}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={addOptions} >
            <MaterialIcons
            // name={'bubble-chart'} 
            // name={'keyboard-control'}
            name={'more-horiz'}
            size={32} 
            style={{ marginRight: 6 }}
            color={Colors.www} 
            />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default InputBar

const styles = StyleSheet.create({
    case: {
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.nedark
    },
    txt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 3.5,
        color: Colors.neBlu
    }
})