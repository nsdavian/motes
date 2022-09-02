import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import Colors from '../components/Colors'
import ClockSquare from '../components/ClockSquare'
import NavBack from '../components/NavBack'

const CalScreen = ({ navigation }) => {
  const progress = useSharedValue()

  useEffect(() => {
    progress.value = withRepeat( withTiming(4 * Math.PI, {
       duration: 4000,
       easing: Easing.linear 
      }), 1)
  }, [])

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
    <View style={styles.case} >
      <Calendar
      theme={{
        todayBackgroundColor:'#000000'
      }}
      />
      <View style={styles.dotcase} >
        {new Array(12).fill(0).map((_,index) => {
          return (
            <ClockSquare 
            key={index} 
            index={index} 
            progress={progress}
            />
          )
        })}
      </View>
      <SafeAreaView
      edges={['bottom' ]}
      style={styles.bottom}
      >
        <Text style={styles.txt} >Motes</Text>
      </SafeAreaView>
    </View>
  )
}

export default CalScreen

const styles = StyleSheet.create({
  case: {
    flex: 1,
    backgroundColor: '#fff'
  },
  dotcase: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.nedark,
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 3.5,
    color: Colors.neBlu
  }
})