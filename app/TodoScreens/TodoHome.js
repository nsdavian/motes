import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useCallback } from 'react'
import Screen from '../components/Screen'
import ListCard from '../components/ListCard'
import { useAtom } from 'jotai'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import Colors from '../components/Colors'
import AllCard from '../components/AllCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { todoStore } from '../utils/store'
import { listStore } from '../utils/listStore'
import SvgComponent from '../components/SvgComponent'


const TodoHome = ({ navigation, setlists }) => {
  const [lists] = useAtom(listStore)
  const [todos] = useAtom(todoStore)


  const forNav = useCallback((id) => {
    navigation.navigate("todoList", {id})
  }, [navigation])

  const openTodoListModal = useCallback(() => {
    navigation.push('groupList')
  }, [navigation])


  
  const [loaded] = useFonts({
    NotoSerif: require('../../assets/NotoSerif-Regular.ttf')
  })  


  if(!loaded) {
    return null
  }


  const deleteGroup = (index) => {
    let newRay = [...lists]
    let movedRay = newRay.splice(index, 1)
    setlists(newRay)

    AsyncStorage.setItem('storedGroups', JSON.stringify(newRay)).then(() => {
      setlists(newRay)
    })
  }
  
  
  return (
    <ImageBackground  style={{ flex: 1, backgroundColor: Colors.nedark }} >
      <View style={{ flex: 1,  }} >

        <Screen />
        <ScrollView style={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} >

          <View style={styles.heading} >
            <Text style={styles.headingtxt} onPress={() => navigation.goBack()} >Todo's</Text>
            <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.headingbtn}>
              <AntDesign 
              name='left' 
              size={30} 
              color={'#fff'}
              style={styles.headingicon} />
            </TouchableOpacity>
          </View>
         
          <View style={{ marginBottom: 50 }} >
            <AllCard 
            onPress={() => forNav()}
            title={"All"} 
            badge={ todos.length.toLocaleString() }
            />
          </View>

            <View style={{ marginBottom: 32 }} >
              
              <View style={styles.groupcase} >
                <Text style={styles.grouptxt} >Groups</Text>
                <TouchableOpacity onPress={openTodoListModal} style={styles.groupbtn} >
                  <MaterialIcons name='add' size={25} color={Colors.ww}  />
                </TouchableOpacity>
              </View>

              {
                lists.length === 0 
                ? 
                <TouchableOpacity 
                activeOpacity={0.9} 
                style={styles.empty} 
                onPress={openTodoListModal}
                >
                  <SvgComponent />
                </TouchableOpacity>
                :
                lists?.map((list, index) => (
                  <TouchableOpacity style={{ paddingHorizontal: 5 }} activeOpacity={0.8} key={list.id} onPress={() => forNav(list.id)} >
                    <ListCard 
                    title={list.title} 
                    onDeleteGroup={() => deleteGroup(index)}
                    badge={todos.filter((todo) => todo.list === list.id).length.toLocaleString()}
                    />
                  </TouchableOpacity>
                ))
              }


            </View>
        </ScrollView>

      </View>

    </ImageBackground>
  )
}

export default TodoHome

const styles = StyleSheet.create({
  heading: {
    marginTop: 64,
    marginBottom: 51,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  headingtxt: {
    color: Colors.neWhite,
    fontSize: 37,
    fontFamily: 'NotoSerif'
  },
  headingbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '46%',
    marginTop: 5
  },
  headingicon: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  groupcase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8
  },
  grouptxt: {
    flex: 1,
    fontSize: 18,
    color: Colors.neWhite,
    textTransform: 'uppercase'
  },
  groupbtn: {
    padding: 4
  },
  empty: {
    alignSelf: 'center',
    marginTop: 70
  }
})