import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native'

export default function Label(props) {
  const {content='', height, borderRadius, type} = props;

  return (
    <View style={styles(height, borderRadius).container}>
      <Text style={styles(height, borderRadius).text}>{content}</Text>
    </View>
  );
}

const styles = (height, borderRadius) => StyleSheet.create({
  container: {
    width: 130,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: 'rgba(234, 75, 155, 0.13)'
  },
  text: {
    width: 130,
    height: height,
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000'
  }
})