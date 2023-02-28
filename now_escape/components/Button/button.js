import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import * as Font from 'expo-font'

export default function Button(props){
    const {onPress, text = '', active, rounded, canceled, height, width, fontSize, bold} = props;
    const style = styles(active, width, height, fontSize, bold);  
    const [isFont, setIsFont] = React.useState(false);

    React.useEffect(() => {
      Font.loadAsync({
        "Pretendard": require('../../assets/fonts/Pretendard-Bold.otf'),
        "Pretendard-Medium": require('../../assets/fonts/Pretendard-Medium.otf'),
      }).then(() => setIsFont(true));
    },[])

    return(
        <Pressable style={[style.button, rounded && style.rounded, canceled && style.canceled]} 
            onPress={onPress}
            ><Text style={[style.text, canceled && style.canceledText]}
            >{text}</Text>
        </Pressable>
    );
}

const styles = (active, width, height, fontSize, bold) => StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: active?'rgb(234, 75, 155)':'rgb(218, 218, 218)'
    },
    text: {
        fontFamily: bold?'Pretendard':'Pretendard-Medium',
        textAlign: 'center',
        fontSize: fontSize?fontSize:18,
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