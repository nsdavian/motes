import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './Colors'

const NavBack = ({ onPress, name, color }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} >
      <Text style={[styles.navbtn, { color: color }]} >{name}</Text>
    </TouchableOpacity>
  )
}

export default NavBack

const styles = StyleSheet.create({
    navbtn: {
        marginTop: 4,
        marginLeft: 4,
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 18,
      }
})