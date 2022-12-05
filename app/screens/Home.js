import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import TodoButton from '../components/TodoButton'
import Colors from '../components/Colors'
import Button from '../components/Button'
import Options from '../components/Options'
import Card from '../components/Card'
import { useFonts } from 'expo-font'
import Screen from '../components/Screen'
import HomeEmptyAnimation from '../components/HomeEmptyAnimation'



const Home = ({ navigation, ...props }) => {
    const [ searchNotes, setSearchNotes ] = useState()
    const hide = props.hide
    const setHide = props.setHide


    const turn = () => {
        setHide('tide')

        AsyncStorage.setItem('storedHide', JSON.stringify('tide')).then(() => {
            setHide('tide')
        }).catch(error => console.log(error))
    }

    const turnTurn = () => {
        setHide('')

        AsyncStorage.setItem('storedHide', JSON.stringify('')).then(() => {
            setHide('')
        }).catch(error => console.log(error))
    } 

    
    const [loaded] = useFonts({
        NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
    })

    if(!loaded) {
        return null
    }

    const deleteToast = () => {
        ToastAndroid.showWithGravity( 'Mote has been deleted', ToastAndroid.LONG, ToastAndroid.CENTER )
    }

    const arcToast = () => {
        ToastAndroid.showWithGravity( 'Mote has been added to your archives', ToastAndroid.LONG, ToastAndroid.CENTER )
    }

    const handleSettings = () => (
        navigation.navigate('settings')
    )

    function deleteNotes(index) {
        let newArray = [...props.notes]
        let movedNotes = newArray.splice(index, 1)
        props.setNotes(newArray)
        props.setAddToBin(movedNotes)
        
        let bin = [movedNotes, ...props.addToBin] 
        props.setAddToBin(bin)

        deleteToast()

        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
            props.setNotes(newArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(bin)).then(() => {
            props.setAddToBin(bin)
        }).catch(error => console.log(error))
    }

    function archiveNotes(index) {
        let newArray = [...props.notes]
        let movedNotes = newArray.splice(index, 1)
        props.setNotes(newArray)
        props.setArcNotes(movedNotes)
        
        let arc = [movedNotes, ...props.arcNotes] 
        props.setArcNotes(arc)

        arcToast()

        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
            props.setNotes(newArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('storedArcNotes', JSON.stringify(arc)).then(() => {
            props.setArcNotes(arc)
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

        deleteToast()

        AsyncStorage.setItem('storedNotes', JSON.stringify(emptyArray)).then(() => {
            props.setNotes(emptyArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(deletedArray)).then(() => {
            props.setAddToBin(deletedArray)
        }).catch(error => console.log(error))
    }

  return (
    <View style={styles.container} >

        <View style={styles.taps} >
            <Options 
            count={props.notes.length}
            hide={hide}
            onPressBin={() => navigation.navigate('bin')}
            onPressCal={() => navigation.navigate('cal')}
            onPressHide={turn}
            onPressTide={turnTurn}
            onPressDeleAll={() => clearAll()}
            />
            <Button onPress={() => navigation.navigate('add')} />            
        </View>

        <Screen />
        <ScrollView
        bounces
        // stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.heading} >
                <View style={styles.headingbtn} >
                    <TouchableOpacity 
                    style={styles.themebtn} 
                    onPress={handleSettings}
                    >
                        <Feather
                        name='settings' 
                        size={25} 
                        color={Colors.neWhite} 
                        />
                    </TouchableOpacity>
                    <TodoButton />
                </View>
                <Text style={styles.headingtxt} >Motes</Text>
            </View>


                <TextInput 
                style={styles.search} 
                placeholder='Search motes'
                value={searchNotes}
                onChangeText={(text) => setSearchNotes(text) }
                onChange={() => search()}
                placeholderTextColor={Colors.comp3}
                />
            {props.notes.length === 0 
                ? 
                <View style={styles.empty} >
                    <HomeEmptyAnimation onPress={() => navigation.navigate('add')} />
                </View>
                : 
                props.notes.map(( item, index ) => 
                    <View style={styles.notepage} key={index} >
                        <Card 
                        note={item} 
                        hide={hide}
                        iconIcon={'archive'}
                        iconName={'Archive'}
                        onArc={() => archiveNotes(index)}
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
        flex: 1,
        backgroundColor: Colors.nedark,
    },
    heading: {
        marginTop: 30,
        marginBottom: 24,
        paddingHorizontal: 30,
    },
    headingtxt: {
        textAlign: 'center',
        marginVertical: 38,
        fontSize: 37,
        fontFamily: 'NotoSerif',
        color: '#fff'
    },
    headingbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 13,
    },
    themebtn: {
        height: 43,
        width: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 1,
        backgroundColor: Colors.comp4
    },
    search: {
        width: '85%',
        height: 45,
        color: Colors.white,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 6,
        marginBottom: 34,
        paddingLeft: 15,
        elevation: 4,
        backgroundColor: Colors.comp4
    },
    taps: {
        zIndex: 2,
        position: 'absolute',
        flexDirection: 'row',
        width: '40%',
        // right: 5,
        bottom: 40,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },

    notepage: {
        paddingBottom: 12,
    },

    empty: {
        marginTop: '13%',
        paddingHorizontal: '4%',
        alignSelf: 'center',
    },
    emptytxt: {
        fontSize: 24,
        fontFamily: 'NotoSerif',
        marginTop: '8.5%',
        color: Colors.neWhite
    }
})