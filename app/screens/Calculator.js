import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Colors from '../components/Colors'
import NavBack from '../components/NavBack'
import { CalColor } from '../components/CalColor'
import CalButton from '../components/CalButton'
import { Styles } from '../components/CalStyles'
import Screen from '../components/Screen'

const Calculator = ({ navigation }) => {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [operation, setOperation] = useState('')
  const [result, setResult] = useState(null)

  const handleNumber = (buttonValue) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue)
    } 
  }

  const handleOperation = (buttonValue) => {
    setOperation(buttonValue)
    setSecondNumber(firstNumber)
    setFirstNumber('')
  }

  const clear = () => {
    setFirstNumber('')
    setSecondNumber('')
    setOperation('')
    setResult(null)
  }

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseInt(secondNumber) + parseInt(firstNumber) )
        break;
      case "-":
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber) )
        break;
      case "*":
        clear();
        setResult(parseInt(secondNumber) * parseInt(firstNumber) )
        break;
      case "/":
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber) )
        break;
    
      default:
        clear();
        setResult(0)
        break;
    }
  }

  const firstNumberDisplay = () => {
    if (result !== null) {
        return <Text style={result < 99999 ? [Styles.screenFirstNumber, {color: Colors.www}] : [Styles.screenFirstNumber, {fontSize: 45, color: Colors.www}]}>{result?.toString()}</Text>; 
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  useLayoutEffect(() => (
    navigation.setOptions({
      title: 'Calculator',
      headerShown: false,
      headerLeft: () => (
        <NavBack 
        onPress={() => navigation.goBack()}
        color={Colors.neBlu}
        name='Back'
        />
      )
    })
  ))

  return (
    <View style={styles.case} >
      <Text style={styles.ove} onPress={() => navigation.goBack()} >Beta</Text>

        <View style={styles.screen} >
          <Text style={Styles.screenSecondNumber}>
            {secondNumber}
            <Text style={{ color: Colors.neBlu, fontSize: 50, fontWeight: '500' }}>{operation}</Text>
          </Text>
          {firstNumberDisplay()}
        </View>

      <View style={styles.calbtncase} >
        <View style={Styles.row}>
          <CalButton title="C" isGray onPress={clear} />
          <CalButton title="+/-" isGray onPress={() => handleOperation("+/-")} />
          <CalButton title="«" isGray onPress={() => navigation.goBack()} />
          <CalButton title="÷" isBlue onPress={() => handleOperation("/")} />
        </View>
        <View style={Styles.row}>
          <CalButton title="7" onPress={() => handleNumber("7")} />
          <CalButton title="8" onPress={() => handleNumber("8")} />
          <CalButton title="9" onPress={() => handleNumber("9")} />
          <CalButton title="×" isBlue onPress={() => handleOperation("*")} />
        </View>
        <View style={Styles.row}>
          <CalButton title="4" onPress={() => handleNumber("4")} />
          <CalButton title="5" onPress={() => handleNumber("5")} />
          <CalButton title="6" onPress={() => handleNumber("6")} />
          <CalButton title="-" isBlue onPress={() => handleOperation("-")} />
        </View>
        <View style={Styles.row}>
          <CalButton title="1" onPress={() => handleNumber("1")} />
          <CalButton title="2" onPress={() => handleNumber("2")} />
          <CalButton title="3" onPress={() => handleNumber("3")} />
          <CalButton title="+" isBlue onPress={() => handleOperation("+")} />
        </View>
        <View style={Styles.row}>
          <CalButton title="." onPress={() => handleNumber(".")} />
          <CalButton title="0" onPress={() => handleNumber("0")} />
          <CalButton title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
          <CalButton title="=" isBlue onPress={() => getResult()} />
        </View>
      </View>

    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
  case: {
    flex: 1,
    // backgroundColor: '#e2e2e2'
    // backgroundColor: '#dbdbdb'
    backgroundColor: Colors.ground
  },
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignSelf: "center",
    backgroundColor: Colors.ground
  },
  calbtncase: {
    width: '100%',
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: Colors.nedark,
  },
  ove: {
    marginTop: 40,
    fontSize: 34,
    alignSelf: 'center',
    // position: 'absolute',
    color: Colors.comp3,
    letterSpacing: 2,
    fontFamily: 'NotoSerif'
  }
})