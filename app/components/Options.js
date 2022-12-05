import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useRef} from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { FontAwesome5, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from './Colors';

const Options = ({ onPressBin, onPressDeleAll, onPressCal, onPressHide, onPressTide, count, hide }) => {

    const opensheet = useRef();

    const showActionSheet = () => {
        opensheet.current.show()
    }

  return (
    <View>
        <TouchableOpacity activeOpacity={0.7} style={styles.case} onPress={showActionSheet} >
            <FontAwesome5 name='bars' size={24} color={Colors.nedark} />
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

                    { hide === 'tide' 
                    ? 
                    <View style={styles.align} >
                        <TouchableOpacity 
                        onPress={onPressTide}
                        activeOpacity={0.8}
                        style={styles.btn} >
                            <MaterialCommunityIcons name='card-text-outline' size={40}  color={Colors.comp3} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >Show</Text>  
                    </View>  
                    :
                    <View style={styles.align} >
                        <TouchableOpacity 
                        onPress={onPressHide}
                        activeOpacity={0.8}
                        style={styles.btn} >
                            <MaterialCommunityIcons name='card-text-outline' size={40}  color={Colors.comp3} />
                        </TouchableOpacity>
                        <Text style={styles.btntxt} >{ !hide ? 'Hide' : 'Show' }</Text>  
                    </View>  

                    }

                                <View style={styles.align} >
                                    <TouchableOpacity 
                                    onPress={onPressCal}
                                    activeOpacity={0.8}
                                    style={styles.btn} >
                                        <FontAwesome name='calendar' size={30} color={Colors.comp3} />
                                        {/* <AntDesign name='appstore-o' size={30} color={Colors.comp3} /> */}
                                    </TouchableOpacity>
                                    <Text style={styles.btntxt} >Calendar</Text>
                                </View> 

                </View>

                <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.delete} 
                onPress={onPressDeleAll} >
                    <Text style={styles.deletetxt} >Delete All</Text>
                    <Entypo name='squared-cross' size={25} color={Colors.ground} />
                </TouchableOpacity>

                <Text style={styles.brand} >By North X Studio  /  Beta Version 1.2.0</Text>

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
        marginBottom: 4,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: Colors.comp4
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