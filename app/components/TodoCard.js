import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Menu } from 'react-native-paper'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { todoStore } from '../utils/store'
import { useAtom } from 'jotai'
import Colors from './Colors'

const TodoCard = ({ todo, onDelete }) => {
    const [todos, setTodos] = useAtom(todoStore)
    const [open, setOpen] = useState(false)

    const toggleTodo = useCallback(() => {
        setTodos(todos?.map((po) => {
            if(po.id === todo.id ) {
                return {
                    ...po,
                    isCompleted: !po.isCompleted
                }
            }
            return po
        }))
    }, [todos, setTodos, todo])

    const openMenu = () => setOpen(true)

    const closeMenu = () => setOpen(false)

  return (
    <View style={styles.case} >
        <View onPress={openMenu} style={styles.lowerCase} >
           <Text>{todo.title}</Text>
           {!!todo.description && <Text>{ todo.description }</Text> } 
        </View>
        <TouchableOpacity style={styles.btn} onPress={toggleTodo} >
            <MaterialIcons
            name={ todo.isCompleted ? 'check-circle' : 'check-circle-outline' }
            size={24}
            />
        </TouchableOpacity>

        <Menu
        visible={open}
        onDismiss={closeMenu}
        anchor={<TouchableOpacity onPress={openMenu} >
            <Entypo name='cross' size={30} />
        </TouchableOpacity>}
        >
            <Menu.Item titleStyle={{ color: Colors.ground, fontSize: 18, fontWeight: '600' }} onPress={onDelete} title='Delete' />
        </Menu>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({
    case: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 3
    },
    lowerCase: {
        flex: 1,
    },
    btn: {
        padding: 4,
        marginRight: 2
    }
})