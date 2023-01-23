import React, {Fragment,useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CalenderSVG from '../../assets/iconCalendar'
import ClockSVG from '../../assets/iconClock'
import ArrowUpSVG from '../../assets/iconArrowUp'
import ArrowDownSVG from '../../assets/iconArrowDown'
import TriangleDownSVG from '../../assets/iconTriangleDown'

export default function Label(props) {
  const {height, width, type='', icon=true, text='', open, active=false} = props;
  const style = styles(active, width, height);
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      {type === 'mainLabel' && (
        <TouchableOpacity onPress={open}>
          <View style={style.main}>
          <Text style={style.text}>{props.text}</Text>
          <TriangleDownSVG/>
          </View>
        </TouchableOpacity>
      )}
      {type === 'searchLabel' && (
        <TouchableOpacity onPress={open}>
          <View style={style.search}>
            <View style={{flexDirection: 'row'}}>
            <CalenderSVG/>
            <Text style={style.text}>{props.text}</Text>      
            </View>
            { show && active?<ArrowUpSVG/>:<ArrowDownSVG/> }
          </View>
        </TouchableOpacity>   
      )}     
    </Fragment>
  );
}

const styles = (active, width, height) => StyleSheet.create({
  main: {
    width: width,
    height: height,
    borderRadius: 16,
    backgroundColor: 'rgba(234, 75, 155, 0.13)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  search: {
    width: width,
    height: height,
    borderRadius: 10,
    backgroundColor: active?'#ffe8f2':'#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#ffd2e6",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
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