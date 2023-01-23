import React, {Fragment,useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TriangleDown from 'now_escape/assets/iconTriangleDown.js'
import ArrowDown from 'now_escape/assets/iconArrowDown.js'
import ArrowUp from 'now_escape/assets/iconArrowUp.js'


export default function Label(props) {
  const {height, width, borderRadius, type, icon, text=''} = props;
  const style = styles(width, height, borderRadius);
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      {/* 타입별 스타일 및 이벤트 */}
      {type === 'mainLabel' && (
        <TouchableOpacity onPress={()=>alert('main label')}>
          <View style={style.main}>
            <View style={style.textBox}>
              <Text style={style.text}>{props.text}</Text>
              { show && <TriangleDown/> }
            </View>
          </View>
        </TouchableOpacity>   
      )}
      {type === 'searchLabel' && (
        <TouchableOpacity onPress={()=>alert('search label')}>
          <View style={style.search}>
            <Text style={style.text}>{props.text}</Text>   
            {show && <ArrowUp/>}        
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
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#ffd2e6",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 17,
    paddingRight: 17
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
    lineHeight: 'props.height',
    // fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000',
  },
})