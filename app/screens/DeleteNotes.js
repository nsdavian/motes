import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../components/Colors'
import DeleteCard from '../components/DeleteCard'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DeleteNotes = ({ ...props }) => {

    const count = [...props.addToBin]

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
            topOffset: 5
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
            topOffset: 5
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
                  onPress={() => undoAll()} 
                  style={[styles.btn, { borderColor: Colors.undo } ]} >
                      <Text style={styles.txt} >Undo All</Text>
                      <FontAwesome name='undo' size={25} color={Colors.undo} style={{ marginLeft: 7 }} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => emptyBin()} style={[styles.btn, { borderColor: Colors.red } ]} >
                      <Text style={styles.txt} >Empty</Text>
                      <Entypo name='cross' size={35} color={Colors.red} />
                  </TouchableOpacity>
              </View>

              {props.addToBin.length === 0 
              ? 
              <View style={styles.txtcase} >
                  <FontAwesome5 name='trash-alt' size={50} color={Colors.comp3} />
                  <Text style={styles.emptytxt} >Empty bin</Text>
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
        marginBottom: 12
    },

    txtcase: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '60%'
    },
    emptytxt: {
        fontSize: 18,
        marginTop: 5,
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
        color: Colors.comp
    }
})