import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Screen from '../components/Screen'
import Colors from '../components/Colors'
import Card from '../components/Card'
import AnimatedText from '../components/AnimatedText'

const Archive = ({ navigation, ...props }) => {
  const [isComplete, setIsComplete] = useState(false)

  useLayoutEffect(() => (
    navigation.setOptions({
      headerShown: false
    })
  ))

  const deleteArcToast = () => {
    ToastAndroid.showWithGravity( 'Archived mote has been deleted', ToastAndroid.LONG, ToastAndroid.CENTER )
  }

  const returnArcToast = () => {
    ToastAndroid.showWithGravity('Mote has been returned', ToastAndroid.LONG, ToastAndroid.CENTER)
  }

  function deleteArcNote(index) {
    let newArray = [...props.arcNotes]
    let movedNotes = newArray.splice(index, 1)
    props.setArcNotes(newArray)
    props.setAddToBin(movedNotes)
    
    let bin = [movedNotes, ...props.addToBin] 
    props.setAddToBin(bin)

    deleteArcToast()

    AsyncStorage.setItem('storedArcNotes', JSON.stringify(newArray)).then(() => {
        props.setArcNotes(newArray)
    }).catch(error => console.log(error))

    AsyncStorage.setItem('deletedNotes', JSON.stringify(bin)).then(() => {
        props.setAddToBin(bin)
    }).catch(error => console.log(error))
}

const returnArcNote = (index) => {
  let goBack = props.arcNotes[index];
  let array = [goBack, ...props.notes];
  props.setNotes(array);

  let newArray = [...props.arcNotes];
  newArray.splice(index, 1);
  props.setArcNotes(newArray);

  returnArcToast()

  AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
      props.setNotes(array)
  }).catch(error => console.log(error))

  AsyncStorage.setItem('storedArcNotes', JSON.stringify(newArray)).then(() => {
      props.setArcNotes(newArray)
  }).catch(error => console.log(error))

}

  return (
    <View style={ styles.case } >
      <Screen />
      <ScrollView>
        <Text onPress={() => navigation.goBack()} style={ styles.headingtxt } >Archive</Text>

        {props.arcNotes.length === 0  ? 
        <View style={styles.empty} >
          <View style={{ marginLeft: '8%' }} >
            <AnimatedText text={['Sooo empty...']} onComplete={() => setIsComplete(true)} />
          </View>
          { isComplete ? <Text style={styles.emj} >🙁</Text> : undefined }
        </View>
        :
        props.arcNotes.map((item, index) => 
          <View key={index} style={{ paddingBottom: 12 }} >
            <Card 
            note={item}
            iconIcon={'remove'}
            iconName={'Remove'}
            onArc={() => returnArcNote(index)}
            dele={() =>  deleteArcNote(index)}
            eded={() => navigation.navigate('arcEdit', {
                i: index,
                n: item
            })}
            vi={() => navigation.navigate('view', {
                i: index,
                n: item
            })}
            />
          </View>
        )
      }
      </ScrollView>
    </View>
  )
}

export default Archive

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
  empty: {
    alignSelf: 'center',
    marginTop: '30%'
  },
  emj: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 35
  }
})