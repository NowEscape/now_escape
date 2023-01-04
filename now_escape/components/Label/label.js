import React, {Fragment} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default function Label(props) {
  const {height, width, borderRadius, type='', icon, text=''} = props;

  return (
    <Fragment>
      {/* 타입별 스타일 및 이벤트 */}
      {props.type == 'mainLabel' && (
        <TouchableOpacity onPress={()=>alert('main label')}>
          <View style={styles(width, height, borderRadius).main}>
            <Text style={styles(width, height).text}>{props.text}</Text>            
          </View>
        </TouchableOpacity>   
      )}
      {props.type == 'searchLabel' && (
        <TouchableOpacity onPress={()=>alert('search label')}>
          <View style={styles(width, height, borderRadius).search}>
            <Text style={styles(width, height).text}>{props.text}</Text>            
          </View>
        </TouchableOpacity>   
      )}     
    </Fragment>
  );
}

const styles = (width, height, borderRadius) => StyleSheet.create({
  main: {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: 'rgba(234, 75, 155, 0.13)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#ffd2e6"
  },
  text: {
    width: '100%',
    height: '100%',
    // fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000',
    // borderWidth: 2,
    // borderRadius: 5,
    // borderStyle: 'solid',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlignVertical: 'bottom',
    // alignSelf: 'center',
    // alignContent: 'center'
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})