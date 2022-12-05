import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from './Colors'
import AnimatedText from './AnimatedText'

const HomeEmptyAnimation = ({ onPress }) => {
    const [isCompleted, setIsCompleted] = useState(false)
    const [sad, setSad] = useState(false)

  return (
    <View>
        {
            !sad 
            ?
            <View>
                <View style={styles.txt} >
                    <AnimatedText text={['Make motes ?']} onComplete={() => setIsCompleted(true)} />
                </View>
                {
                    isCompleted
                    ? 
                    <View style={styles.btncase} >
                        <TouchableOpacity 
                        onPress={() => setSad(!sad)} 
                        activeOpacity={0.7}
                        style={styles.btn} 
                        >
                            <Text style={styles.btntxt} >No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={onPress} 
                        activeOpacity={0.7}
                        style={[styles.btn, { borderColor: Colors.neBlu } ]} 
                        >
                            <Text style={styles.btntxt} >Yes</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    undefined
                }

            </View>
            :
            <Text style={styles.emj} >😦</Text>
        }
    </View>
  )
}

export default HomeEmptyAnimation

const styles = StyleSheet.create({
    txt: {
        alignSelf: 'center',
        marginBottom: 38,
        marginLeft: '7%'
    },
    btncase: {
        flexDirection: 'row',
        marginBottom: 15
    },
    btn: {
        height: 50,
        width: '40%',
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: Colors.red,
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntxt: {
        color: Colors.comp3,
        fontSize: 22,
    },
    emj: {
        fontSize: 45,
        marginTop: 35
    }
})