import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../components/Colors'

const ViewNotes = ({ route, navigation, ...props }) => {

    const { i, n } = route.params
    const edit = n

  return (
    <View style={styles.container} >
        <View style={styles.mat} >
            <Text style={styles.txt} >{edit}</Text>
        </View>
    </View>
  )
}

export default ViewNotes

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        paddingVertical: 20
    },
    mat: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.comp3,
        paddingHorizontal: 15,
        paddingVertical: 8,
        height: '100%',
        backgroundColor: Colors.neWhite
    },
    txt: {
        lineHeight: 21,
        fontSize: 16,
        fontWeight: '400',
        color: '#1F2667'
    }
})