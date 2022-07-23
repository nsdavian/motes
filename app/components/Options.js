import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useRef} from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { Feather, FontAwesome5, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'
import Colors from './Colors';
import Toast from 'react-native-toast-message'

const Options = ({ onPressBin, onPressDeleAll, count }) => {

    const opensheet = useRef();

    const showActionSheet = () => {
        opensheet.current.show()
    }

  return (
    <View>
        <TouchableOpacity activeOpacity={1} style={styles.case} onPress={showActionSheet} >
            <FontAwesome5 name='bars' size={24} color={Colors.ground} />
        </TouchableOpacity>

        <ActionSheet ref={opensheet} >
            <View style={styles.sheetcase} >
                <View style={styles.bar} />

                <View styles={styles.textcase} >
                    <Text style={styles.activetxt} >Active motes : {count} </Text>
                </View>
                <View style={styles.textline} />

                <View style={styles.btncase} >
                    <View style={styles.align} >
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.btn} 
                        onPress={onPressBin} >
                            <Entypo name='trash' size={30} color={Colors.comp3} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Recycle Bin</Text>
                    </View>  

                    <View style={styles.align} >
                        <TouchableOpacity 
                        onPress={() => Toast.show({
                            type: 'error',
                            text1: 'In development',
                            text2: 'Layout change is unavailable at this time',
                            topOffset: 5
                        })}
                        activeOpacity={0.8}
                        style={styles.btn} >
                            <AntDesign name='appstore-o' size={30} color={Colors.comp3} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Layout</Text>
                    </View> 

                    <View style={styles.align} >
                        <TouchableOpacity 
                        onPress={() => 
                            Toast.show({
                                type: 'error',
                                text1: 'In development',
                                text2: 'Settings option is unavailable at this time',
                                topOffset: 5
                              })
                        }
                        activeOpacity={0.8}
                        style={styles.btn} >
                            <Feather name='settings' size={30}  color={Colors.comp3} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Settings</Text>  
                    </View>  

                </View>

                <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.delete} 
                onPress={onPressDeleAll} >
                    <Text style={styles.deletetxt} >Delete All</Text>
                    <Entypo name='squared-cross' size={25} color={Colors.ground} />
                </TouchableOpacity>

                <Text style={styles.brand} >By North X Studio  /  Beta Version 1.0.1</Text>

            </View>
        </ActionSheet>
    </View>
  )
}

export default Options


const styles = StyleSheet.create({
    case: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginBottom: 14,
        backgroundColor: Colors.neWhite
    },


    sheetcase: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        backgroundColor: Colors.nedark,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    bar: {
        height: 5,
        width: '15%',
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: Colors.ground
    },
    align: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    activetxt: {
        color: Colors.comp3,
        fontSize: 19,
        marginTop: 5,
    },
    textline: {
        height: 1,
        width: '80%',
        marginVertical: 8,
        backgroundColor: Colors.comp4
    },

    btncase: {
        flexDirection: 'row',
        marginTop: 12
    },
    btn: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        marginHorizontal: '4%',
        borderRadius: 40,
        borderWidth: 1.7,
        borderColor: Colors.comp4
        //backgroundColor: Colors.theme
    },
    btntxt: {
        textAlign: 'center',
        color: Colors.comp3
    },


    delete: {
        flexDirection: 'row',
        width: '80%',
        height: 37,
        borderRadius: 6,
        marginTop: 18,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.red
    },
    deletetxt: {
        fontSize: 16,
        marginRight: 8
    },

    brand: {
        fontSize: 12,
        marginTop: 13,
        marginBottom: 5,
        color: Colors.comp3
    }
})