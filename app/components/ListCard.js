import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Menu } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from './Colors'

const ListCard = ({ title, badge, onDeleteGroup }) => {
    const [open, setOpen] = useState(false)

    const openMenu = () => setOpen(true)

    const closeMenu = () => setOpen(false)

  return (
    <View style={styles.case} >
        <View style={styles.lowerCase} >
           <Text>{title}</Text>
        </View>
        {!!badge && <Text style={{ marginRight: 5, fontSize: 14, fontWeight: '600' }} >{ badge }</Text> }

        <Menu
        visible={open}
        onDismiss={closeMenu}
        anchor={<TouchableOpacity onPress={openMenu} >
            <MaterialIcons name='more-horiz' size={30} />
        </TouchableOpacity>}
        >
            <Menu.Item titleStyle={{ color: Colors.ground, fontSize: 18, fontWeight: '600' }} onPress={onDeleteGroup} title='Delete group' />
        </Menu>
    </View>
  )
}

export default ListCard

const styles = StyleSheet.create({
    case: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.ww,
        marginBottom: 3
    },
    lowerCase: {
        flex: 1,
    },
    btn: {
        padding: 4
    }
})