import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import Colors from './Colors'



const Button = ({ onPress }) => {
  return (
      <TouchableOpacity activeOpacity={0.7} style={styles.case} onPress={onPress} >
          <Entypo name='plus' size={40} color={Colors.neWhite } />
      </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    case: {
        width: 60,
        height: 60,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: Colors.nedark
    },
})