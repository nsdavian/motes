import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useCallback, useState, useMemo, useLayoutEffect } from 'react'
import TodoBar from '../components/TodoBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { useAtom } from 'jotai'
import { todoStore } from '../utils/store'
import { Snackbar } from 'react-native-paper'
import TodoCard from '../components/TodoCard'
import { listStore } from '../utils/listStore'
import Colors from '../components/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import NavBack from '../components/NavBack'


const AllTodos = (props) => {
  const [snack, setSnack] = useState(false)
  const [todos, setTodos] = useAtom(todoStore)
  const [lists] = useAtom(listStore)
  
    const { route: { params: {id} }, navigation } = props

    const visible = () => setSnack(true)

    const notVisible = () => setSnack(false)

    
    const list = useMemo(() => lists.find(po => po.id === id), [id, lists])
    
    const onAddTodo = useCallback((todo) => {
      setTodos([ ...todos, {...todo, list: list?.id} ])
      let poke = [ ...todos, {...todo, list: list?.id} ]

      AsyncStorage.setItem('storedTodos', JSON.stringify(poke)).then(() => {
        setTodos(poke)
      }).catch(error => alert(error))

    }, [todos, setTodos])


    const deleteTodo = (index) => {
      let newRay = [...completed, ...uncompleted]
      let movedRay = newRay.splice(index, 1)
      setTodos(newRay)

      AsyncStorage.setItem('storedTodos', JSON.stringify(newRay)).then(() => {
        setTodos(newRay)
      }).catch(error => console.log(error))
    }


    useLayoutEffect(() => {
      navigation.setOptions({
        title: list ? `${ list.title.length > 26 ? `${list.title.substring(0, 23)}...` : list.title }` : "All Todo's",
        headerLeft: () => (
          <View style={{ marginRight: 20 }} >
            <NavBack 
            onPress={() => navigation.goBack()} 
            color={Colors.neBlu}
            name='Back'
            />
          </View>
      ),
      // headerRight: () => (
      //   <View style={{ marginTop: 4, marginRight: 4 }} >
      //     <TouchableOpacity>
      //       <MaterialIcons name='more-time' size={27} color={Colors.ww} />
      //     </TouchableOpacity>
      //   </View>
      // )
      })
    }, [list, navigation])

 
    const { uncompleted, completed } = useMemo(() => {
      let _todos = []
      if(list) {
        _todos = todos.filter((todo) => todo.list === list.id)
      } else {
        _todos = todos
      }
      _todos = _todos.sort((a,b) => {
        if (moment(a.createdAt).isBefore(moment(b.createdAt)))
        return 1;
        else if (moment(b.createdAt).isBefore(moment(a.createdAt)))
        return -1
        else return 0
      })

      return {
        uncompleted: _todos.filter(todo => !todo.isCompleted),
        completed: _todos.filter(todo => todo.isCompleted)
      }
    }, [todos, list])

    


  return (
    <ImageBackground  style={{ flex: 1, backgroundColor: Colors.comp3 }} >
      <View style={{ flex: 1, backgroundColor: 'rgba(228,228,228,0.1)' }} >
        <ScrollView style={{ flex: 1, paddingVertical: 22 }} >

        {uncompleted.length > 0 && (
          <View style={{ marginBottom: 31 }} >
                <View style={styles.case} >
                  <Text style={styles.txt} >undone</Text>
                </View>
              {uncompleted?.map((todo) => 
                <View key={todo.id} style={{ paddingHorizontal: 5 }} >
                  <TodoCard onDelete={visible} todo={todo} />
                </View>
              )}
          </View>
        )}

        {completed.length > 0 && (
          <View style={{ marginBottom: 32 }} >
                <View style={styles.case} >
                  <Text style={styles.txt} >completed</Text>
                </View>
              {completed?.map((todo, index) => 
                <View key={todo.id} style={{ paddingHorizontal: 5 }} >
                  <TodoCard onDelete={() => deleteTodo(index)} todo={todo} />
                </View>
              )}
          </View>
        ) }

        </ScrollView>

      <TodoBar onAddTodo={onAddTodo} />
      </View>

        <Snackbar
        visible={snack}
        onDismiss={notVisible}
        style={{ backgroundColor: Colors.nedark,  }}
        action={{
          label: 'Cancel',
          onPress: () => setSnack(false)
        }}
        >
          Undone Todo
        </Snackbar>
    </ImageBackground>
  )
}

export default AllTodos

const styles = StyleSheet.create({
  case: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8
  },
  txt: {
    flex: 1,
    fontSize: 16,
    textTransform: 'uppercase'
  },
  navbtn: {
    marginTop: 4,
    marginLeft: 4,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16
  }
})