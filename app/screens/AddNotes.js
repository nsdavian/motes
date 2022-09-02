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
import React, { useLayoutEffect } from "react";
import Colors from "../components/Colors";
import NavBack from "../components/NavBack";

const AddNotes = ({ navigation , ...props }) => {

    const handle = () => (
        props.handleNotes(),
        navigation.goBack()
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New mote',
            headerLeft: () => (
                <NavBack 
                onPress={() => navigation.goBack()}
                color={Colors.red}
                name='Cancel'
                />
            ),
            headerRight: () => (
                <NavBack 
                onPress={handle}
                color={Colors.neBlu}
                name='Add'
                />
            )
        })
    }, [navigation, props.handleNotes])

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
                   placeholderTextColor={Colors.comp3}
                   placeholder="Mote" 
                  />                      
              </View>
              <Text style={styles.newnote} >Tap for new mote</Text>
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
        paddingBottom: 170,
        color: Colors.neWhite,
        // backgroundColor: Colors.neWhite
    }
});
