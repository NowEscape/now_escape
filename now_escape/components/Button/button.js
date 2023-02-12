import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export default function Button(props){
    const {onPress, text = '', active, rounded, canceled, height, width} = props;
    return(
        <Pressable style={[styles(active, height, width).button, rounded && styles(active, height, width).rounded, canceled && styles(active, height, width).canceled]} onPress={onPress}>
            <Text style={[styles(active, height, width).text, canceled && styles(active, height, width).canceledText]}>{text}</Text>
        </Pressable>
    );
}

const styles = (active, height, width) => StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: active?'rgb(234, 75, 155)':'rgb(218, 218, 218)'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1.62,
        color: 'white'
    },
    rounded: {
        borderRadius: 10
    },
    canceled: {
        borderRadius: 10,
        backgroundColor: 'rgb(230, 230, 230)'
    },
    canceledText: {
        color: 'rgb(0, 0, 0)',
    }

})