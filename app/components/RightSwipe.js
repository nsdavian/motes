import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const RightSwipe = () => {
  return (
      <TouchableOpacity style={styles.case} >
          <Text style={{ fontSize: 22, color: 'white' }} >icon</Text>
      </TouchableOpacity>
  )
}

export default RightSwipe

const styles = StyleSheet.create({
    case: {
        width: 50,
        height: 30,
        
        backgroundColor: 'red'
    }
})