import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { createTodoFormTitle, Todo } from '../models/todo'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './Colors';


const TodoBar = ({ onAddTodo }) => {
  const [value, setValue] = useState('')

  const handleAddTodo = useCallback(() => {
    onAddTodo(createTodoFormTitle(value))
    setValue('')
  }, [value, onAddTodo])

  return (
    <SafeAreaView
    edges={['bottom']}
    style={{ padding: 16, backgroundColor: 'rgba(228,228,228,0.2)' }}
    > 
      <View style={styles.case} >
        <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder='Todo'
        onSubmitEditing={handleAddTodo}
        style={styles.input}
        />
        <TouchableOpacity
        onPress={handleAddTodo}
        style={styles.btn}
        activeOpacity={0.7}
        >
          <Text style={styles.add} >Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TodoBar

const styles = StyleSheet.create({
  case: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 38,
    paddingHorizontal: 10,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: Colors.ww
  },
  btn: {
    height: 38,
    width: 70,
    paddingHorizontal: 8,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.nedark
  },
  add: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.ww
  }
})