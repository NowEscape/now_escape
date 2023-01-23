import React, {Fragment,useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg from "react-native-svg";

export default function Label(props) {
  const {height, width, borderRadius, type='', icon, text='', open} = props;
  const style = styles(width, height, borderRadius);
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      {type === 'mainLabel' && (
        <TouchableOpacity onPress={open}>
          <View style={style.main}>
            <View style={style.textBox}>
              <Text style={style.text}>{props.text}</Text>
              { show && <Svg/> }
            </View>
          </View>
        </TouchableOpacity>
      )}
      {type === 'searchLabel' && (
        <TouchableOpacity onPress={open}>
          <View style={style.search}>
            <Text style={styles(width, height, borderRadius).text}>{props.text}</Text>
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
    flexDirection: 'row',
  },
  search: {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#ffd2e6",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textBox: {
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000',
  },
})