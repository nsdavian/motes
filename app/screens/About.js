import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../components/Colors'
import Screen from '../components/Screen'

const About = ({ navigation }) => {

  useLayoutEffect(() => (
    navigation.setOptions({
      headerShown: false,

    })
  ))

  return (
    <View style={ styles.case } >
      <Screen />
      <ScrollView>
        <Text onPress={() => navigation.goBack()} style={ styles.headingtxt } >About</Text>
      </ScrollView>
    </View>
  )
}

export default About

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
  }
})