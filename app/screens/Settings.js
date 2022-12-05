import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import Colors from '../components/Colors'
import { useFonts } from 'expo-font'
import SettingsCard from '../components/SettingsCard'
import ThemeModal from '../components/ThemeModal'

const Settings = ({ navigation }) => {
    const [visibility, setVisibility] = useState(false)

    const [loaded] = useFonts({
        NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
    })

    if(!loaded) {
        return null
    }

    const item = ''

    const onAbout = () => {
        ToastAndroid.showWithGravity('In development', ToastAndroid.LONG, ToastAndroid.CENTER)
    }

  return (
    <View style={ styles.case } >
        <Screen />
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
            <Text style={ styles.headingtxt } onPress={() => navigation.goBack() } >Settings</Text>


            <View>
                <SettingsCard 
                Name={'Theme'}  
                icon={'mobile1'}
                onPress={onAbout}
                // onPress={() => setVisibility(!visibility) }
                />
                <ThemeModal 
                visibility={visibility}
                setVisibility={setVisibility}
                />
            </View>

            <View style={ styles.line } />

            <SettingsCard 
            Name={'Archive'} 
            icon={'right'}
            onPress={() => navigation.navigate('archive')}  
            />
            <SettingsCard 
            Name={'Calculator'} 
            icon={'right'}
            onPress={() => navigation.navigate('culator') } 
            />
            <SettingsCard 
            Name={'Text to speech'} 
            icon={'right'}
            onPress={() => navigation.navigate('speech', {item}) } 
            />
            {/* <SettingsCard 
            Name={'Features'} 
            icon={'right'}
            /> */}

            <View style={ styles.line } />

            <SettingsCard 
            Name={'About'} 
            icon={'infocirlceo'}
            onPress={onAbout}
            // onPress={() => navigation.navigate('about') } 
            />

            <Text style={styles.brand} >Made by North X Studio</Text>

        </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    case: {
        flex: 1,
        backgroundColor: Colors.nedark
    },
    headingtxt: {
        color: Colors.ww,
        textAlign: 'center',
        fontSize: 38,
        fontFamily: 'NotoSerif',
        marginTop: 105,
        marginBottom: 91
    },

    line: {
        height: 0.4,
        width: '60%',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 2,
        backgroundColor: Colors.neWhite,
    },
    brand: {
        fontSize: 13,
        fontFamily: 'NotoSerif',
        textAlign: 'center',
        color: Colors.ww,
        marginTop: 25,
        marginBottom: 15
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})