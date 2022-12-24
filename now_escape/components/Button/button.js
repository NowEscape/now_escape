import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export default function Button(props){
    const {onPress, text = '', active, rounded, canceled, height} = props;
    return(
        <Pressable style={[styles(active, height).button, rounded && styles(active, height).rounded, canceled && styles(active, height).canceled]} onPress={onPress}>
            <Text style={[styles(active, height).text, canceled && styles(active, height).canceledText]}>{text}</Text>
        </Pressable>
    );
}

const styles = (active, height) => StyleSheet.create({
            button: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: height,
                backgroundColor: active?'rgb(234, 75, 155)':'rgb(218, 218, 218)'
            },
            text: {
                textAlign: 'center',
                // fontFamily: 'Pretendard',
                fontWeight: 'bold',
                fontSize: 18,
                letterSpacing: 1.62,
                color: 'white'
            },
            rounded: {
                borderRadius: '10pt'
            },
            canceled: {
                borderRadius: '10pt',
                backgroundColor: 'rgb(230, 230, 230)'
            },
            canceledText: {
                color: 'rgb(0, 0, 0)',
            }

})