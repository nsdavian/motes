import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Colors from './Colors'

const TodoButton = ({ }) => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity
    activeOpacity={0.3}
    onPress={() => navigation.navigate('todo')}
    style={styles.case}
    >
      <Feather 
      name='check' 
      size={30} 
      color={Colors.nedark} 
      />
    </TouchableOpacity>
  )
}

export default TodoButton

const styles = StyleSheet.create({
  case: {
    height: 43,
    width: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 1,
    backgroundColor: Colors.neWhite
  },
})