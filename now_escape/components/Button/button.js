import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export default function Button(props){
    const {onPress, text = ''} = props;
    return(
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '7%',
            backgroundColor: 'rgb(234, 75, 155)',
            borderRadius: '0pt'
        },
        text: {
            textAlign: 'center',
            fontFamily: 'Pretendard-Bold',
            fontSize: 18,
            letterSpacing: 1.62,
            color: 'rgb(255, 255, 255)'
        }
})