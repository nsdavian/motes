import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from './Colors'

const AnimatedText = (props) => {
  const [text, setText] = useState('')
  const [cursorColor, setCursorColor] = useState('transparent')
  const [messageIndex, setMessageIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [timeouts, setTimeouts] = useState({
    cursorTimeout: undefined,
    typingTimeout: undefined,
    firstNewLineTimeout: undefined,
    secondNewLineTimeout: undefined
  })

  const textRef = useRef(text)
  textRef.current = text

  const cursorColorRef = useRef(cursorColor)
  cursorColorRef.current = cursorColor

  const messageIndexRef = useRef(messageIndex)
  messageIndexRef.current = messageIndex

  const textIndexRef = useRef(textIndex)
  textIndexRef.current = textIndex

  const timeoutsRef = useRef(timeouts)
  timeoutsRef.current = timeouts

  const typingAnimation = () => {
    if (textIndexRef.current < props.text[messageIndexRef.current].length) {
      setText(textRef.current + props.text[messageIndexRef.current].charAt(textIndexRef.current))
      setTextIndex(textIndexRef.current + 1)

      let updatedTimeouts = { ...timeoutsRef.current }
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 100)
      setTimeouts(updatedTimeouts)
    } else if ( messageIndexRef.current + 1 < props.text.length ) {
      setMessageIndex(messageIndexRef.current + 1)
      setTextIndex(0)

      let updatedTimeouts = { ...timeoutsRef.current }
      updatedTimeouts.firstNewLineTimeout = setTimeout(newLineAnimation, 120)
      updatedTimeouts.secondNewLineTimeout = setTimeout(newLineAnimation, 200)
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 280)
      setTimeouts(updatedTimeouts)
    } else {
      clearInterval(timeoutsRef.current.cursorTimeout)
      setCursorColor('transparent')

      if (props.onComplete) {
        props.onComplete()
      }
    }
  }

  const newLineAnimation = () => {
    setText(textRef.current + "\n")
  }

  const cursorAnimation = () => {
    if (cursorColorRef.current === 'transparent') {
      setCursorColor(Colors.neBlu)
    } else {
      setCursorColor('transparent')
    }
  }

  useEffect(() => {
    const updatedTimeouts = { ...timeoutsRef.current }
    updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500)
    updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250)
    setTimeouts(updatedTimeouts)
  
    return () => {
      clearTimeout(timeoutsRef.current.typingTimeout)
      clearTimeout(timeoutsRef.current.firstNewLineTimeout)
      clearTimeout(timeoutsRef.current.secondNewLineTimeout)
      clearInterval(timeoutsRef.current.cursorTimeout)
    }
  }, [])
  

  return (
    <Text style={styles.txt} >
      {text}
      <Text style={{ color: cursorColor, fontSize: 35 }} >|</Text>
    </Text>
  )
}

export default AnimatedText

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'NotoSerif',
    fontSize: 32,
    color: Colors.ww,
  }
})