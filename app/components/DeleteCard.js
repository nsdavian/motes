import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useRef} from 'react'
import Colors from './Colors'
import ActionSheet from 'react-native-actions-sheet'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const DeleteCard = ({ item, onPressUndo, onPressDelete }) => {

  const opensheet = useRef();

  const showActionSheet = () => {
    opensheet.current.show()
}

  return (

    <View>
      <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => showActionSheet()} 
      style={styles.card}>
        <Text style={styles.txt} >{item}</Text>
      </TouchableOpacity>

      <ActionSheet ref={opensheet} >
        <View style={styles.sheetcase} >

          <View style={styles.bar} />

          <View style={styles.btncase} >

            <View style={styles.align} >
              <TouchableOpacity 
              onPress={onPressUndo}
              activeOpacity={0.8} 
              style={[ styles.btn, { borderColor: 'orange' } ]} >
                <FontAwesome name='undo' size={35} color='orange' />
              </TouchableOpacity>
              <Text style={styles.btntxt} >Undo</Text>
            </View>

            <View style={styles.align} >
              <TouchableOpacity 
              onPress={onPressDelete}
              activeOpacity={0.8} 
              style={[ styles.btn, { borderColor: Colors.red } ]} >
                <MaterialIcons name='delete' size={35} color={Colors.red} />
              </TouchableOpacity>
              <Text style={styles.btntxt} >Delete</Text>
            </View>

          </View>

          <View style={styles.line} />
          <Text style={styles.brandtxt} >By North X Studio  /  Beta Version 1.1.0</Text>

        </View>
      </ActionSheet>

    </View>

  )
}

export default DeleteCard

const styles = StyleSheet.create({
  card :{ 
    alignSelf: 'center',
    width: '92%',
    minHeight: 60,
    maxHeight: 130,
    borderRadius: 12,
    backgroundColor: Colors.comp4,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },

  txt: {
    color: Colors.neWhite,
    fontSize: 16,
    fontWeight: '400'
  },


  sheetcase: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: Colors.nedark
  },

  bar: {
    height: 5,
    width: '16%',
    marginVertical: 7,
    borderRadius: 10,
    backgroundColor: Colors.comp4
  },
  
  btncase :{ 
    flexDirection: 'row',
    display: 'flex',
    marginVertical: 8,
  },
  btn: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '9%'
  },
  btntxt :{ 
    marginTop: 2,
    color: Colors.comp3,
    fontSize: 14
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  line: {
    height: 1,
    width: '80%',
    marginTop: 3,
    marginBottom: 4,
    backgroundColor: Colors.comp3
  },
  brandtxt: {
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
    paddingTop: 4,
    color: Colors.comp3,
    fontSize: 13,
  }
})