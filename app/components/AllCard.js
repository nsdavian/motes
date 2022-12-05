import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './Colors'

const AllCard = ({ title, badge, onPress }) => {
  return (
    <View style={styles.case} >

      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.titcase} >
        <Text style={styles.txt} >{title}</Text>
      </TouchableOpacity>

      <View style={styles.count} >
        <Text style={styles.counttxt} >{badge}</Text>
      </View>

    </View>
  )
}

export default AllCard

const styles = StyleSheet.create({
    case: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    titcase: {
        marginRight: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 4,
        backgroundColor: '#fff'
    },
    txt: {
        fontSize: 18,
        paddingVertical: 14,
        paddingHorizontal: 80,
    },
    count: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30, 
        elevation: 3,
        backgroundColor: Colors.theme
    },
    counttxt: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal: 23,
        paddingVertical: 14,
    }
})