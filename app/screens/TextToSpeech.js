import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import NavBack from '../components/NavBack'
import Colors from '../components/Colors'
import * as Speech from 'expo-speech'
import { useFonts } from 'expo-font'
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const TextToSpeech = ({ navigation, route }) => {
  const [voice, setVoice] = useState(route ? route.params.item : '' )



  const voiceSpeak = () => {
    const speakSpeak = `${voice}`;
    // opt={}
    Speech.speak(speakSpeak, )
  }

  // const [loaded] = useFonts({
  //   NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
  // })

  // if(!loaded){
  //   return null
  // }

  useLayoutEffect(() => (
    navigation.setOptions({
      title: 'Text To Speech',
      headerShown: false,
      headerLeft: () => (
        <NavBack 
        onPress={() => navigation.goBack()}
        color={Colors.neBlu}
        name='Back'
        />
      )
    })
  ))



  return (
    <ScrollView style={styles.case} >
      <View style={styles.headingcase} >
        <Text style={ styles.headingtxt } onPress={() => navigation.goBack()} >Text to Speech</Text>
        <MaterialCommunityIcons name='waveform' size={100} color={Colors.ww} />
      </View>

      <TextInput 
      style={styles.input} 
      value={voice} 
      multiline
      textAlignVertical={'top'}
      placeholder='Text'
      placeholderTextColor={Colors.ww}
      onChangeText={setVoice} 
      />
        <TouchableOpacity 
        style={styles.btn} 
        activeOpacity={0.7}
        onPress={voiceSpeak} 
        >
          <Text style={styles.btntxt} >Speech</Text>
        </TouchableOpacity>
      <SafeAreaView
      edges={['bottom']}
      style={styles.bottom}
      >
        <TouchableOpacity 
        style={styles.cancel} 
        activeOpacity={0.7}
        onPress={() => setVoice('')} 
        >
          <Foundation name='x' size={45} color={Colors.nedark} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

export default TextToSpeech

const styles = StyleSheet.create({
  case: {
    flex: 1, 
    backgroundColor: Colors.nedark
  },
  headingcase: {
    alignItems: 'center',
    marginTop: 109,
    marginBottom: 72
  },
  headingtxt: {
    color: Colors.ww,
    textAlign: 'center',
    marginLeft: 4,
    fontSize: 38,
    fontFamily: 'NotoSerif',
    marginBottom: 38
  },
  bottom: {
    padding: 8,
    backgroundColor: Colors.nedark
  },
  input: {
    height: 215,
    width: '90%',
    padding: 15,
    fontSize: 15,
    color: Colors.ww,
    marginBottom: 40,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.comp4
  },
  btn: {
    width: '90%',
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.ww
  },
  btntxt: {
    fontSize: 26,
    color: Colors.ground
  },
  cancel: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 58,
    width: 58,
    borderRadius: 20,
    backgroundColor: Colors.neBlu
  }
})