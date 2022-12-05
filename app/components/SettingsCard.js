import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, } from 'react-native'
import React from 'react'
import Colors from './Colors'
import { AntDesign } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

const SettingsCard = ({ onPress, Name, icon }) => {

    const [loaded] = useFonts({
        NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
    })

    if(!loaded) {
        return null
    }

  return (
    <TouchableOpacity 
    activeOpacity={0.7}
    style={styles.case} 
    onPress={onPress} >
        <Text style={styles.txt} > {Name} </Text>
        <AntDesign style={styles.icon} name={icon} size={25} color={Colors.neWhite} />
    </TouchableOpacity>
  )
}

export default SettingsCard

const styles = StyleSheet.create({
    case: {
        height: 69,
        width: '92%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 9.3,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: Colors.comp4,
        elevation: 5
    },
    txt: {
        color: Colors.neWhite,
        fontSize: 20.5,
        fontFamily: 'NotoSerif',
        marginLeft: 15,

    },
    icon: {
        marginRight: 25,
        marginTop: 2
    }
})