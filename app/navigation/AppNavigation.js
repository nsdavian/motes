import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../components/Colors'
import { createNativeStackNavigator,  } from '@react-navigation/native-stack'
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
import Settings from '../screens/Settings'
import Archive from '../screens/Archive'
import Calculator from '../screens/Calculator'
import TextToSpeech from '../screens/TextToSpeech'
import About from '../screens/About'
import ArcEditNotes from '../screens/ArcEditNotes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAtom } from 'jotai'
import { listStore } from '../utils/listStore'
import { todoStore } from '../utils/store'

const AppNavigation = () => {
    const Stack = createNativeStackNavigator()

    const [ note, setNote ] = useState();
    const [ notes, setNotes ] = useState([]);
    const [ date, setDate ] = useState(Date.now());
    const [arcNotes, setArcNotes] = useState([])
    const [ addToBin, setAddToBin ] = useState([])
    const [hide, setHide] = useState('')
    const [theme, setTheme] = useState('')
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

        AsyncStorage.getItem('storedArcNotes').then(data => {
            if(data !== null){
                setArcNotes(JSON.parse(data))
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

        AsyncStorage.getItem('storedHide').then(data => {
            if(data !== null){
                setHide(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('storedTee').then(data => {
            if(data !== null){
                setTheme(JSON.parse(data))
            }
        }).catch((error) => console.log(error))

        AsyncStorage.getItem('date')

    }

  return (
      <Stack.Navigator screenOptions={{ animationTypeForReplace: 'push', headerStyle: {backgroundColor: Colors.nedark, }, headerTintColor: '#e4e4e4',
        headerTitleAlign: 'center', presentation: 'card',  }} >
            <Stack.Screen name='motes' options={{ presentation: 'modal', headerShown: false, headerRight: () => ( <TodoButton /> ) }} >
                {props => <Home {...props} note={note} setNote={setNote} 
                notes={notes} setNotes={setNotes} date={date} setDate={setDate} hide={hide} setHide={setHide}
                setAddToBin={setAddToBin} addToBin={addToBin} arcNotes={arcNotes} setArcNotes={setArcNotes}  
                theme={theme} setTheme={setTheme} /> }
            </Stack.Screen>

            <Stack.Screen name='add' options={{ headerTitleStyle: { color: Colors.neWhite }, animation: 'slide_from_right', presentation: 'modal' }} >
                {props => <AddNotes {...props} note={note} setNote={setNote} handleNotes={handleNotes}  />}
            </Stack.Screen>

            <Stack.Screen name='bin' options={{ title: 'Recycle Bin', presentation: 'modal', animation: 'slide_from_left' }} >
                {props => <DeleteNotes {...props} addToBin={addToBin} setAddToBin={setAddToBin} 
                notes={notes} setNotes={setNotes} date={date} note={note} setNote={setNote} arcNotes={arcNotes} setArcNotes={setArcNotes} /> }
            </Stack.Screen>

            <Stack.Screen name='edit' options={{ headerTitleStyle : { color: Colors.nedark }, animation: 'slide_from_bottom' }} >
                {props => <EditNotes {...props} notes={notes} setNotes={setNotes} /> }
            </Stack.Screen>

            <Stack.Screen name='view' options={{ headerTitleStyle : { color: Colors.neWhite }, animation: 'slide_from_bottom',
            headerTintColor: Colors.neWhite, title: 'Mote view', headerStyle: { backgroundColor: Colors.nedark } }} >
                {props => <ViewNotes {...props} notes={notes} setNotes={setNotes} arcNotes={arcNotes} setArcNotes={setArcNotes}  /> }
            </Stack.Screen>

            <Stack.Screen 
            name='cal' 
            component={CalScreen}
            options={{ title: 'Calendar', animation: 'slide_from_right' }}  
            />

            <Stack.Group screenOptions={{ animation: 'slide_from_right' }} >
                <Stack.Screen name='settings' options={{ headerShown: false, animation: 'slide_from_left' }} >
                    {props => <Settings {...props} /> }
                </Stack.Screen>

                <Stack.Screen name='archive' >
                    {props => <Archive {...props} arcNotes={arcNotes} setArcNotes={setArcNotes} note={note} 
                    setNote={setNote} notes={notes} setNotes={setNotes} addToBin={addToBin} setAddToBin={setAddToBin} /> }
                </Stack.Screen>

                <Stack.Screen name='arcEdit' >
                    {props => <ArcEditNotes {...props} notes={notes} setNotes={setNotes} arcNotes={arcNotes} setArcNotes={setArcNotes} />  }
                </Stack.Screen>

                <Stack.Screen name='culator' component={Calculator}  />
                <Stack.Screen name='speech' component={TextToSpeech} />
                <Stack.Screen name='about' component={About} />
            </Stack.Group>

            <Stack.Group screenOptions={{ animation: 'slide_from_right' }} >
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