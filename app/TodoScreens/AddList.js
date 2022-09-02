import { StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native'
import React, { useState, useLayoutEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createListForm } from '../models/list'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../components/Colors'
import bg from '../../assets/images/bg6.jpg'
import NavBack from '../components/NavBack'


const AddList = ({ navigation, lists, setlists }) => {
    const [name, setName] = useState('')
    // const [lists, setlists] = useAtom(listStore)

    const handleAddList = useCallback(() => {
        const list = createListForm(name)
        setlists([ ...lists, list ])
        let mon = [ ...lists, list ]

        navigation.goBack()

        AsyncStorage.setItem('storedGroups', JSON.stringify(mon)).then(() => {
            setlists(mon)
          }).catch(error => alert(error))

    }, [navigation, name, setlists, lists])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Group',
            headerRight: () => (
                <NavBack 
                onPress={handleAddList}
                color={Colors.neBlu}
                name='Add'
                />
            ),
            headerLeft: () => (
                <NavBack 
                onPress={() => navigation.goBack()}
                color={Colors.red }
                name='Cancel'
                />
            ),
            // headerStyle: { backgroundColor: Colors.neWhite },
            // headerTitleStyle: { color: Colors.ground }
            
        })
    }, [navigation, handleAddList])

  return (
    <ImageBackground source={bg} imageStyle={{ opacity: 0.9 }} style={{ flex: 1, backgroundColor: Colors.comp3 }} >
        <View style={styles.previewcase} >
            <View style={styles.preview} >
                <Text style={styles.previewtxt} >{name}</Text>
            </View>
        </View>

        <SafeAreaView
        edges={['bottom']}
        style={styles.input}
        >
            <TextInput 
            value={name} 
            onChangeText={setName} 
            style={styles.inputbar}
            // onSubmitEditing={handleAddList}
            placeholder='Name new group' 
            placeholderTextColor={Colors.nedark}
            />
        </SafeAreaView>
    </ImageBackground>
  )
}

export default AddList

const styles = StyleSheet.create({
    previewcase: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.4)'
    },
    preview: {
        minHeight: 150,
        width: '84%',
        marginTop: 40,
        borderRadius: 5,
        borderColor: Colors.ground,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(115,115,115,0.9)'
    },
    previewtxt: {
        textAlign: 'center',
        fontSize: 22,
        letterSpacing: 1,
        color: Colors.ground
    },

    input: {
        padding: 16,
        backgroundColor: Colors.nedark
    },
    inputbar: {
        height: 38,
        color: Colors.nedark,
        textAlign: 'center',
        borderRadius: 8,
        paddingHorizontal: 10 ,
        backgroundColor: Colors.comp3
    },
    txt: {
        marginTop: 4,
        marginHorizontal: 5,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16
    }
})