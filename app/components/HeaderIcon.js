import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons' 

import Colors from './Colors'

const HeaderIcon = () => {
  return (
      <TouchableOpacity>
          <Ionicons name='menu' size={15} color={Colors.white} />
      </TouchableOpacity>
  )
}

export default HeaderIcon

const styles = StyleSheet.create({})