import { StyleSheet, View, Text, ScrollView, ImageBackground } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Colors from '../components/Colors'
import back from '../../assets/images/bg3.jpg'
import NavBack from '../components/NavBack'

const ViewNotes = ({ route, navigation, ...props }) => {

    const { i, n } = route.params
    const edit = n

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <NavBack 
                onPress={() => navigation.goBack()} 
                color={Colors.neBlu}
                name='Back'
                />
            )
        })
    }, [navigation])

  return (
    <ImageBackground 
    source={back}
    style={styles.container} >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'  }} >
            <ScrollView
            showsVerticalScrollIndicator={false} 
            style={styles.mat} >
                <Text style={styles.txt} >{edit}</Text>
            </ScrollView>
        </View>
    </ImageBackground>
  )
}

export default ViewNotes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 18,
        // paddingVertical: 20
    },
    mat: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.ground,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 18,
        marginVertical: 20,
        height: '100%',
        backgroundColor: 'rgba(186,186,186,0.6)'
    },
    txt: {
        paddingBottom: 20,
        lineHeight: 21,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.ground
    }
})