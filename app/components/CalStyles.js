import { StyleSheet } from 'react-native'
import { CalColor } from './CalColor'
import Colors from './Colors'

export const Styles = StyleSheet.create({
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: CalColor.blue,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: CalColor.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: CalColor.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: CalColor.btnGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 32,
        color: CalColor.white,
    },
    smallTextDark: {
        fontSize: 32,
        color: CalColor.black,
    },

    // Keyboard
    row: {
        maxWidth: '100%',
        flexDirection: "row",
    },
    viewBottom: {
        position: 'absolute',
        bottom: 50,
    },
    screenFirstNumber: {
        fontSize: 65,
        color: Colors.www,
        fontWeight: '300',
        alignSelf: "flex-end",
        marginRight: 18
    },
    screenSecondNumber: {
        fontSize: 40,
        color: CalColor.gray,
        fontWeight: '200',
        alignSelf: "flex-end",
    },
})