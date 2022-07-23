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
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../components/Colors'
import Toast from 'react-native-toast-message'


const EditNotes = ({ route, navigation, ...props }) => {

    const { i, n } = route.params
    const [ edit, setEdit ] = useState(n)

    const forEdit = () => {
        let edited = [...props.notes]
        edited[i] = edit
        props.setNotes(edited)

        // navigation.navigate('motes')

        AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            props.setNotes(edited)
        }).catch(error => console.log(error))
    }

  return (
    <ScrollView style={{ backgroundColor: Colors.ground }} >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <View style={styles.case} >
              <TextInput 
              style={styles.card}
              placeholder='Type'
              placeholderTextColor={Colors.comp3}
              value={edit}
              multiline
              onChangeText={(text) => setEdit(text)}
              onChange={() => forEdit()}
              />
          </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default EditNotes

const styles = StyleSheet.create({
  case: {
    marginTop: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.ground
  },

  card: {
    fontSize: 17,
    color: Colors.neWhite
  }
})