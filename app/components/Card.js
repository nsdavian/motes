import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { AntDesign, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import ActionSheet from 'react-native-actions-sheet'
import Toast from 'react-native-toast-message'

import Colors from './Colors'

const Card = ({ note, time, dele, eded, vi }) => {
    const [textTheme, setTextTheme] = useState(false)
    const [backTheme, setBackTheme] = useState(0)


    // const themeChange = () => {
    //     const theme = '';
    //     const white = '';
    //     const blue = '';
    //     const red = '';

    //     setBackTheme()
    // }



    const opensheet = useRef();

    const showActionSheet = () => {
        opensheet.current.show()
    }

    return (
    <View>
        <TouchableOpacity activeOpacity={0.9} onPress={showActionSheet} style={styles.case} >
            <Text style={styles.txt} >{ note.length > 190 ? `${note.substring(0, 190)}...` : note }</Text>
        </TouchableOpacity> 

        <ActionSheet ref={opensheet} >
            <View style={styles.bottomSheet} >

                <View style={styles.bar} />

                <View style={styles.btncase} >

                    <View style={styles.btnwrap} >
                        <TouchableOpacity 
                        onPress={eded} 
                        activeOpacity={0.7} 
                        style={[styles.btn, { borderColor: '#42a0ff' }]} >
                            <AntDesign color={Colors.theme} name='edit' size={40}  />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Edit</Text>
                    </View>


                    <View style={styles.btnwrap} >
                        <TouchableOpacity 
                        style={[styles.btn, { borderColor: Colors.comp3 }]} 
                        activeOpacity={0.7}
                        onPress={vi} >
                            <Feather color={Colors.comp3} name='eye' size={40} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >View</Text>
                    </View>

                    <View style={styles.btnwrap} >
                        <TouchableOpacity 
                        style={[styles.btn, { borderColor: Colors.comp3 }]} 
                        activeOpacity={0.7}
                        onPress={() => 
                            Toast.show({
                                type: 'error',
                                text1: 'In development',
                                text2: 'Card theme change is unavailabe at this time',
                                topOffset: 5
                              })
                        } >
                            <MaterialCommunityIcons color={Colors.comp3} name='card-text-outline' size={40} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Card</Text>
                    </View>

                    <View style={styles.btnwrap} >
                        <TouchableOpacity 
                        onPress={dele} 
                        activeOpacity={0.7} 
                        style={[styles.btn, {  borderColor: '#ff6a6b' }]} >
                            <MaterialIcons color={Colors.red} name='delete' size={40} />
                        </TouchableOpacity>   
                        <Text style={styles.btntxt} >Delete</Text>
                    </View>
                </View>

                <View style={styles.line} />

            </View>
        </ActionSheet>   

    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    case: {
        flexDirection: 'row',
        minHeight: 60,
        maxHeight: 250,
        width: '92%',
        alignSelf: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: Colors.comp4
    },
    txt: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400'
    },

    bottomSheet: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: Colors.nedark
    },

    btncase: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25,
        marginBottom: 15,
        paddingHorizontal:10
    },

    bar: {
        alignSelf: 'center',
        width: '15%',
        height: 5,
        borderRadius: 10,
        marginTop: 8,
        backgroundColor: Colors.ground
    },
    line: {
        height: 0.5,
        width: '91%',
        marginBottom: 20,
        alignSelf: 'center',
        backgroundColor: Colors.comp3
    },

    btnwrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn: {
        width: 70,
        height: 70,
        borderRadius: 60,
        borderWidth: 1,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green'
    },

    btntxt: {
        color: Colors.comp3
    }

})