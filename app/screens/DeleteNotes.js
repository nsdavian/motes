import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../components/Colors'
import DeleteCard from '../components/DeleteCard'
import NavBack from '../components/NavBack'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DeleteNotes = ({ navigation, ...props }) => {

    const count = [...props.addToBin]

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <NavBack 
                onPress={() => navigation.goBack()}
                name='Back'
                color={Colors.neBlu}
                />
            )
        })
    }, [navigation])

    const emptyBin = () => {
        Alert.alert(
            'Empty bin',
            "Are you sure you want to empty your recycle bin",
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let emptyArray = [...props.addToBin]
                        emptyArray = []
                        props.setAddToBin(emptyArray)
                        
                        Toast.show({
                            type: 'success',
                            text1: 'All motes have permanently been deleted',
                            topOffset: 5
                        })

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(emptyArray)).then(() => {
                            props.setAddToBin(emptyArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    const undoAll = () => {
        let deletedNotes = [...props.addToBin]
        let notes = [...props.notes]
        deletedNotes.forEach((item, index) => {
            notes.push(item)
        })
        props.setAddToBin([])
        props.setNotes([notes, deletedNotes])

        Toast.show({
            type: 'success',
            text1: 'All motes restored',
            topOffset: 45
        })

        AsyncStorage.setItem('storedNotes', JSON.stringify(notes)).then(() => {
            props.setNotes(notes)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify([])).then(() => {
            props.setAddToBin([])
        }).catch(error => console.log(error))
    }

    const undoNote = (index) => {
        let goBack = props.addToBin[index];
        let array = [goBack, ...props.notes];
        props.setNotes(array);

        let newArray = [...props.addToBin];
        newArray.splice(index, 1);
        props.setAddToBin(newArray);

        Toast.show({
            type: 'success',
            text1: 'Mote restored',
            topOffset: 35
        })

        AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
            props.setNotes(array)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(newArray)).then(() => {
            props.setAddToBin(newArray)
        }).catch(error => console.log(error))


    }

    const deleteNote = (index) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this mote',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let newArray = [...props.addToBin]
                        newArray.splice(index, 1)
                        props.setAddToBin(newArray)

                        Toast.show({
                            type: 'success',
                            text1: 'Mote permanently deleted',
                            topOffset: 5
                        })

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(newArray)).then(() => {
                            props.setAddToBin(newArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }
    

  return (
      <ScrollView style={styles.container} >
          <View>

              <View style={styles.topbar} >
                  <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={() => undoAll()} 
                  style={[styles.btn, { borderColor: Colors.undo } ]} >
                      <Text style={styles.txt} >Undo All</Text>
                      <FontAwesome 
                      name='undo' 
                      size={25} 
                      color={Colors.undo} 
                      style={{ marginLeft: 12 }} 
                      />
                  </TouchableOpacity>

                  <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={() => emptyBin()} 
                  style={[styles.btn, { borderColor: Colors.red } ]} >
                      <Text style={styles.txt} >Empty</Text>
                      <Entypo 
                      name='cross' 
                      size={35} 
                      color={Colors.red} 
                      style={{ marginLeft: 3 }}
                      />
                  </TouchableOpacity>
              </View>

              {props.addToBin.length === 0 
              ? 
              <View style={styles.txtcase} >
                  <FontAwesome5 name='trash-alt' size={70} color={Colors.comp3} />
                  <Text style={styles.emptytxt} >No motes have arrived</Text>
              </View>
              :
              props.addToBin.map((item, index) => 
                <View
                key={index}
                style={{ paddingBottom: 12 }}
                >
                    <DeleteCard 
                    item={item}
                    onPressUndo={() => undoNote(index)}
                    onPressDelete={() => deleteNote(index)}
                    />
                </View>    
              )
              }

              <Toast />
          </View>
      </ScrollView>
  )
}

export default DeleteNotes

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ground
    },

    topbar: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 9,
        marginBottom: 16
    },

    txtcase: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '57%'
    },
    emptytxt: {
        fontSize: 18,
        marginTop: 14,
        color: Colors.comp3
    },

    btn: {
        flexDirection: 'row',
        width: '40%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.comp
    },
    txt: {
        fontSize: 16,
        color: Colors.comp3
    }
})