import React, {Fragment,useState,forwardRef, useImperativeHandle,useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CalenderSVG from '../../assets/iconCalendar'
import ClockSVG from '../../assets/iconClock'
import ArrowUpSVG from '../../assets/iconArrowUp'
import ArrowDownSVG from '../../assets/iconArrowDown'
import TriangleDownSVG from '../../assets/iconTriangleDown'

import rigionStore from "../../store/rigionStore";
import dateStore from "../../store/dateStore";
import timeStore from "../../store/timeStore";
import genreStore from "../../store/genreStore";

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Label(props) {
  const {height, width, fontSize, type='', icon='', text='', open, arrow, marginRight,active} = props;
  // const [active, setActive] = useState(false);

  // const log = () => {
  //   active?setActive(false):setActive(true)
  // }

  // useEffect(() => {
  //   log();
  // }, [trigger]);

  const style = styles(active, width, height, fontSize, marginRight, icon);

  return (
    <Fragment>
      {type === 'mainLabel' && (
        <TouchableOpacity onPress={()=>{
          {open()}
        }}>
          <View 
            style={style.main}>
            {icon=== 'date' && <CalenderSVG height={10.8}/>}
            {icon=== 'time' && <ClockSVG height={10.8}/>}
            <Text style={style.text}>{props.text}</Text>
            { arrow && <TriangleDownSVG /> }
          </View>
        </TouchableOpacity>
      )}
      {type === 'searchLabel' && (
        <TouchableOpacity onPress={()=>{
          {open()}
        }}>
          <View style={style.search}>
            <View style={{flexDirection: 'row'}}>
            {icon=== 'date' && <CalenderSVG/>}
            {icon=== 'time' && <ClockSVG/>}
            <Text style={style.text}>{props.text}</Text>      
            </View>
            { arrow && (active?<ArrowUpSVG/>:<ArrowDownSVG/>) }
          </View>
        </TouchableOpacity>   
      )}     
    </Fragment>
  );
}

const styles = (active, width, height, fontSize, marginRight, icon) => StyleSheet.create({
  main: {
    width: width,
    height: height,
    borderRadius: 16,
    backgroundColor: active?'#ffd2e6':'rgba(234, 75, 155, 0.13)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: icon?'flex-start':'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: marginRight?marginRight:0
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
    paddingLeft: 20,
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
    fontSize: fontSize?iosWidthRatio*fontSize:17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000',
    paddingLeft: icon?iosWidthRatio*10:2,
  },
})
