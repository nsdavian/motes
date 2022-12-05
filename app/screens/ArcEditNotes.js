import { 
    StyleSheet,
    View, 
    ScrollView,
    KeyboardAvoidingView,
    Text, 
    TextInput,
    TouchableOpacity,
    Button,
    Platform} from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../components/Colors'
import NavBack from '../components/NavBack'
import InputBar from '../components/InputBar'
import Toast from 'react-native-toast-message'
import InputModal from '../components/InputModal'


const EditNotes = ({ route, navigation, ...props }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const { i, n } = route.params
    const [ edit, setEdit ] = useState(n)

    const po = edit.toString()
    
    const forEdit = () => {
        let edited = [...props.arcNotes]
        edited[i] = po
        props.setArcNotes(edited)

        AsyncStorage.setItem('storedArcNotes', JSON.stringify(edited)).then(() => {
            props.setArcNotes(edited)
        }).catch(error => console.log(error))

        navigation.goBack()
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <NavBack 
          onPress={() => navigation.goBack()}
          name='Cancel'
          color={Colors.red}
          />
        ),
        headerRight: () => (
          <NavBack 
          onPress={forEdit}
          name={'Confirm'}
          color={Colors.neBlu}
          />
        ),
        headerTitleStyle: { color: Colors.nedark }
      })
    }, [navigation, forEdit])

    const calFunction = () => (
      setModalOpen(!modalOpen),
      navigation.push('culator')
  )

    const speechFunction = () => (
        setModalOpen(!modalOpen),
        navigation.push('speech', {item})
    )

    const item = edit.toString()

  return (
    <View style={{ flex: 1 }} >
      <ScrollView style={{ backgroundColor: Colors.ground }} >
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.case} >
                <TextInput 
                style={styles.card}
                placeholder='Type'
                placeholderTextColor={Colors.comp3}
                value={po}
                multiline
                onChangeText={(text) => setEdit(text)}
                // onChange={() => forEdit()}
                />
            </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <InputModal 
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      onPressCal={calFunction}
      onPressSpeech={speechFunction}
      pika={setEdit}
      />
      <InputBar 
      addOptions={() => setModalOpen(!modalOpen)}
      addIcon={'edit'}
      name={'Editing'}
      />

    </View>
  )
}

export default EditNotes

const styles = StyleSheet.create({
  case: {
    marginTop: 20,
    paddingHorizontal: 25,
    backgroundColor: Colors.ground
  },

  card: {
    fontSize: 17,
    color: Colors.neWhite
  }
})