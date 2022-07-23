import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../components/Colors'
import HeaderIcon from '../components/HeaderIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import AddNotes from '../screens/AddNotes'
import DeleteNotes from '../screens/DeleteNotes'
import EditNotes from '../screens/EditNotes'
import ViewNotes from '../screens/ViewNotes'

const AppNavigation = () => {
    const Stack = createNativeStackNavigator()

    const [ note, setNote ] = useState();
    const [ notes, setNotes ] = useState([]);
    const [ date, setDate ] = useState(Date.now());
    const [ addToBin, setAddToBin ] = useState([])

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

        AsyncStorage.getItem('date')
    }

  return (
      <Stack.Navigator screenOptions={{ animationTypeForReplace: 'push', headerStyle: {backgroundColor: Colors.ground, }, headerTintColor: '#e4e4e4',
        headerTitleAlign: 'center', presentation: 'card',   }} >
            <Stack.Screen name='motes' options={{ presentation: 'modal' }} >
                {props => <Home {...props} note={note} setNote={setNote} 
                notes={notes} setNotes={setNotes} date={date} setDate={setDate} 
                setAddToBin={setAddToBin} addToBin={addToBin}  /> }
            </Stack.Screen>

            <Stack.Screen name='add' options={{ headerTitleStyle: { color: Colors.ground }, presentation: 'modal' }} >
                {props => <AddNotes {...props} note={note} setNote={setNote} handleNotes={handleNotes}  />}
            </Stack.Screen>

            <Stack.Screen name='bin' options={{ title: 'Recycle Bin', presentation: 'modal' }} >
                {props => <DeleteNotes {...props} addToBin={addToBin} setAddToBin={setAddToBin} 
                notes={notes} setNotes={setNotes} date={date} note={note} setNote={setNote} /> }
            </Stack.Screen>

            <Stack.Screen name='edit' options={{ headerTitleStyle : { color: Colors.ground } }} >
                {props => <EditNotes {...props} notes={notes} setNotes={setNotes}  /> }
            </Stack.Screen>

            <Stack.Screen name='view' options={{ headerTitleStyle : { color: Colors.blu }, 
            headerTintColor: Colors.comp3, title: 'Mote view', headerStyle: { backgroundColor: Colors.neWhite } }} >
                {props => <ViewNotes {...props} notes={notes} setNotes={setNotes}  /> }
            </Stack.Screen>
      </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})