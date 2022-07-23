import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

import Colors from '../components/Colors'
import Button from '../components/Button'
import Options from '../components/Options'
import Card from '../components/Card'



const Home = ({ navigation, ...props }) => {

    const [ searchNotes, setSearchNotes ] = useState()

    function deleteNotes(index) {
        let newArray = [...props.notes]
        let movedNotes = newArray.splice(index, 1)
        props.setNotes(newArray)
        props.setAddToBin(movedNotes)
        
        let bin = [movedNotes, ...props.addToBin] 
        props.setAddToBin(bin)

        Toast.show({
            type: 'success',
            text1: 'Mote deleted',
            topOffset: 5
        })

        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
            props.setNotes(newArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(bin)).then(() => {
            props.setAddToBin(bin)
        }).catch(error => console.log(error))
    }

    const search = () => {
        if(searchNotes !== '' ){
            props.notes.forEach((item, index) => {
                if(item.includes(searchNotes)){
                    let searchItem = [...props.notes];
                    let firstOfArray = searchItem[0]
                    let index = [...props.notes].indexOf(item)
                    searchItem[0] = item
                    searchItem[index] = firstOfArray
                    props.setNotes(searchItem)
                }
            })
        }
        setSearchNotes('')
    }

    const clearAll = () => {
        let emptyArray = [...props.notes]
        let deletedArray = [...props.addToBin]
        emptyArray.forEach((item, index) => {
            deletedArray.push(item)
        })
        emptyArray= []
        props.setNotes(emptyArray)
        props.setAddToBin(deletedArray);

        Toast.show({
            type: 'success',
            text1: 'Active motes deleted',
            topOffset: 5
        })

        AsyncStorage.setItem('storedNotes', JSON.stringify(emptyArray)).then(() => {
            props.setNotes(emptyArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(deletedArray)).then(() => {
            props.setAddToBin(deletedArray)
        }).catch(error => console.log(error))
    }

  return (
    <View style={styles.container} >
        <TextInput 
        style={styles.search} 
        placeholder='Search motes...'
        value={searchNotes}
        onChangeText={(text) => setSearchNotes(text) }
        onChange={() => search()}
        placeholderTextColor={Colors.comp3}
        />
        <View style={styles.taps} >
            <Options 
            count={props.notes.length}
            onPressBin={() => navigation.navigate('bin')}
            onPressDeleAll={() => clearAll()}
            />
            <Button onPress={() => navigation.navigate('add')} />            
        </View>

        <ScrollView
        bounces
        >
            {props.notes.length === 0 
                ? 
                <View style={styles.empty} >
                    <AntDesign name='frowno' size={60} color={Colors.comp3} />
                    <Text style={styles.emptytxt} >Make motes</Text>
                </View>
                : 
                props.notes.map(( item, index ) => 
                    <View style={styles.notepage} key={index} >
                        <Card 
                        note={item} 
                        dele={() => deleteNotes(index)}
                        eded={() => navigation.navigate('edit', {
                            i: index,
                            n: item
                        })}
                        vi={() => navigation.navigate('view', {
                            i: index,
                            n: item
                        })}
                        time={props.date}
                        />
                    </View>
                ) 
            }       
        </ScrollView>

        <Toast />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ground,
        flex: 1
    },
    search: {
        width: '80%',
        height: 40,
        color: Colors.white,
        alignSelf: 'center',
        marginTop: 4,
        marginBottom: 17,
        borderRadius: 18,
        paddingHorizontal: 12,
        backgroundColor: Colors.comp4
    },
    taps: {
        zIndex: 2,
        position: 'absolute',
        flexDirection: 'row',
        width: '40%',
        // right: 5,
        bottom: 25,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 5,
    },

    notepage: {
        paddingBottom: 12
    },

    empty: {
        marginTop: '58%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptytxt: {
        fontSize: 20,
        marginTop: 4,
        color: Colors.comp3
    }
})