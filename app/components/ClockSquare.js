import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from './Colors'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';

const ClockSquare = ({ index, progress }) => {
    const offsetAngle = (2 * Math.PI) / 12;
    const finalAngle = offsetAngle * ( 12 - 1 - index )

    const rotate = useDerivedValue(() => {
        // if(progress.value <= 2 * Math.PI) {
        //   return Math.min(finalAngle, progress.value)  
        // }
        // if (progress.value -2 * Math.PI < finalAngle) {
        //     return finalAngle
        // }
        
        // return progress.value

        return Math.min(finalAngle, progress.value)
    }, [])

    const translateY = useDerivedValue(() => {
        if ( rotate.value === finalAngle ) {
            return withSpring(-11 * 11)
        }

        if (progress.value > 2 * Math.PI) {
            return withTiming((index - 12) *  12)
        }

        return withTiming(-index * 12)
    }, [])


    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value },
            ]
        }
    })
  return (
    <Animated.View 
    style={[ 
        styles.dot, 
        // { opacity: (index + 1) /12},
        rStyle
    ]}
    />
  )
}

export default ClockSquare

const styles = StyleSheet.create({
    dot: {
        height: 12,
        aspectRatio: 1,
        position: 'absolute',
        backgroundColor: Colors.ground,
      }
})