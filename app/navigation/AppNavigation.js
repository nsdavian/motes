import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../components/Colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import AddNotes from '../screens/AddNotes'
import DeleteNotes from '../screens/DeleteNotes'
import EditNotes from '../screens/EditNotes'
import ViewNotes from '../screens/ViewNotes'
import TodoHome from '../TodoScreens/TodoHome'
import AllTodos from '../TodoScreens/AllTodos'
import TodoButton from '../components/TodoButton'
import CalScreen from '../screens/CalScreen'
import AddList from '../TodoScreens/AddList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAtom } from 'jotai'
import { listStore } from '../utils/listStore'
import { todoStore } from '../utils/store'

const AppNavigation = () => {
    const Stack = createNativeStackNavigator()

    const [ note, setNote ] = useState();
    const [ notes, setNotes ] = useState([]);
    const [ date, setDate ] = useState(Date.now());
    const [ addToBin, setAddToBin ] = useState([])
    const [lists, setlists] = useAtom(listStore)
    const [todos, setTodos] = useAtom(todoStore)


    function handleNotes() {
        let newNote = note
        let newNotes = [ newNote, ...notes ]
        setNotes(newNotes)
        setNote('')

        AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
            setNotes(newNotes)
        }).catch(error => alert(error))

        AsyncStorage.setItem('date', JSON.stringify(date)).then(() => {
            setDate(date)
        })
    }

    useEffect(() => {
        loadNotes()
    }, [])

    const loadNotes = () => {
        AsyncStorage.getItem('storedNotes').then(data => {
            if(data !== null){
                setNotes(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('deletedNotes').then(data => {
            if(data !== null){
                setAddToBin(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('storedTodos').then(data => {
            if(data !== null){
                setTodos(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('storedGroups').then(data => {
            if(data !== null){
                setlists(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('date')
    }

  return (
      <Stack.Navigator screenOptions={{ animationTypeForReplace: 'push', headerStyle: {backgroundColor: Colors.nedark, }, headerTintColor: '#e4e4e4',
        headerTitleAlign: 'center', presentation: 'card',  }} >
            <Stack.Screen name='motes' options={{ presentation: 'modal', headerShown: false, headerRight: () => ( <TodoButton /> ) }} >
                {props => <Home {...props} note={note} setNote={setNote} 
                notes={notes} setNotes={setNotes} date={date} setDate={setDate} 
                setAddToBin={setAddToBin} addToBin={addToBin}  /> }
            </Stack.Screen>

            <Stack.Screen name='add' options={{ headerTitleStyle: { color: Colors.neWhite }, presentation: 'modal' }} >
                {props => <AddNotes {...props} note={note} setNote={setNote} handleNotes={handleNotes}  />}
            </Stack.Screen>

            <Stack.Screen name='bin' options={{ title: 'Recycle Bin', presentation: 'modal' }} >
                {props => <DeleteNotes {...props} addToBin={addToBin} setAddToBin={setAddToBin} 
                notes={notes} setNotes={setNotes} date={date} note={note} setNote={setNote} /> }
            </Stack.Screen>

            <Stack.Screen name='edit' options={{ headerTitleStyle : { color: Colors.nedark } }} >
                {props => <EditNotes {...props} notes={notes} setNotes={setNotes}  /> }
            </Stack.Screen>

            <Stack.Screen name='view' options={{ headerTitleStyle : { color: Colors.neWhite }, 
            headerTintColor: Colors.neWhite, title: 'Mote view', headerStyle: { backgroundColor: Colors.nedark } }} >
                {props => <ViewNotes {...props} notes={notes} setNotes={setNotes}  /> }
            </Stack.Screen>

            <Stack.Screen 
            name='cal' 
            component={CalScreen}
            options={{ title: 'Calendar' }}  
            />

            <Stack.Group>
                <Stack.Screen name='todo' options={{ headerShown: false, }} >
                    {props => <TodoHome {...props} setlists={setlists} /> }
                </Stack.Screen>
                <Stack.Screen name='todoList' component={AllTodos} />
                <Stack.Screen name='groupList' options={{ presentation: 'modal' }} >
                    {props => <AddList  {...props} lists={lists} setlists={setlists} /> }
                </Stack.Screen>
            </Stack.Group>
      </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})