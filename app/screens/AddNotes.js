import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView, 
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Colors from "../components/Colors";
import NavBack from "../components/NavBack";
import InputBar from "../components/InputBar";
import InputModal from "../components/InputModal";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNotes = ({ navigation, route , ...props }) => {
    const [modalOpen, setModalOpen] = useState(false)

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

    const calFunction = () => (
        setModalOpen(!modalOpen),
        navigation.push('culator')
    )

    const item = props.note

    const speechFunction = () => (
        setModalOpen(!modalOpen),
        navigation.navigate('speech', {item})
    )

  return (
    <View style={{ flex: 1 }} >
        <ScrollView style={styles.case} >
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.note} >
                    <TextInput 
                    style={styles.input}
                    value={props.note}
                    onChangeText={(text) => props.setNote(text)}
                    multiline
                    placeholderTextColor={Colors.comp3}
                    placeholder="Mote" 
                    />       

                </View>
                {/* <Button title="add" onPress={() => props.handleNotes()} /> */}
            </KeyboardAvoidingView>

            
        </ScrollView>
        <InputModal 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onPressCal={calFunction}
        onPressSpeech={speechFunction}
        pika={props.setNote}
        />
                <InputBar 
                addMote={() => props.handleNotes()}
                addOptions={() => setModalOpen(!modalOpen)}
                addIcon={'add-box'}
                name={'Motes'}
                />
    </View>
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
    input: {
        flex: 1,
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 170,
        color: Colors.neWhite,
        // backgroundColor: Colors.neWhite
    }
});
