import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Styles } from './CalStyles'

const CalButton = ({ title, onPress, isBlue, isGray }) => {
    const theme = 'dark'

  return (
    <TouchableOpacity
        style={[
            isBlue ? Styles.btnBlue : isGray ? Styles.btnGray : theme === 'light' ? Styles.btnLight : Styles.btnDark, { marginHorizontal: 10 }
        ]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text
            style={
                isBlue || isGray ? Styles.smallTextDark : theme === 'dark' ? Styles.smallTextLight : Styles.smallTextDark
            }
        >
            { title }
        </Text>
    </TouchableOpacity>
  )
}

export default CalButton

const styles = StyleSheet.create({})