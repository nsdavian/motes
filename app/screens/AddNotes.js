import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import React from "react";
import Colors from "../components/Colors";

const AddNotes = ({ ...props }) => {
  return (
      <ScrollView style={styles.case} >
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
              <View style={styles.note} >
                  <TextInput 
                  style={styles.input}
                  value={props.note}
                  onBlur={() => props.handleNotes()}
                  onChangeText={(text) => props.setNote(text)}
                   multiline
                //    autoFocus
                   placeholderTextColor={Colors.comp3}
                   placeholder="Type" 
                  />                      
              </View>
              <Text style={styles.newnote} >Tap for new note</Text>
              {/* <Button title="add" onPress={() => props.handleNotes()} /> */}
          </KeyboardAvoidingView>
          
      </ScrollView>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
    case: {
        backgroundColor: Colors.ground
    },
    note: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
        // paddingBottom: 60,
        // backgroundColor: 'red'
    },
    newnote: {
        textAlign: 'center',
        marginTop: 70,
        fontSize: 20,
        fontWeight: '600',
        color: Colors.neWhite
    },
    input: {
        flex: 1,
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 190,
        color: Colors.neWhite,
        // backgroundColor: Colors.neWhite
    }
});
