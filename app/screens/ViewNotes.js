import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Colors from '../components/Colors'
import back from '../../assets/images/bg3.jpg'
import NavBack from '../components/NavBack'
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

const ViewNotes = ({ route, navigation, ...props }) => {

    const { i, n } = route.params
    const edit = n
    const cop = edit.toString()

    const clip = () => {
        ToastAndroid.showWithGravity('Copied to clipboard', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    const copyText = async (cop) => {
        try {
            await Clipboard.setStringAsync(cop),
            clip()
        } catch (e) {
            Alert.alert('something went wrong', e.message)
        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <NavBack 
                onPress={() => navigation.goBack()} 
                color={Colors.neBlu}
                name='Back'
                />
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => copyText(cop)} style={styles.righticon} >
                    <MaterialIcons name='content-copy' size={23} color={Colors.www} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

  return (
    <ImageBackground 
    source={back}
    style={styles.container} >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'  }} >
            <ScrollView
            showsVerticalScrollIndicator={false} 
            style={styles.mat} >
                <Text style={styles.txt} >{edit}</Text>
            </ScrollView>
        </View>
    </ImageBackground>
  )
}

export default ViewNotes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 18,
        // paddingVertical: 20
    },
    mat: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.ground,
        paddingHorizontal: 18,
        paddingVertical: 14,
        marginHorizontal: 18,
        marginVertical: 20,
        height: '100%',
        backgroundColor: 'rgba(186,186,186,0.6)'
    },
    txt: {
        paddingBottom: 20,
        lineHeight: 21,
        fontSize: 17,
        fontWeight: '400',
        color: Colors.ground
    },
    righticon: {
        marginTop: 5,
        marginRight: 2
    }
})