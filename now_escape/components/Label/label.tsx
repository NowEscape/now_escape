import React, {Fragment,useState,forwardRef, useImperativeHandle,useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
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
import _ from "lodash";
import {format} from "date-fns";
import searchStore from "../../store/searchStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Label(props) {
  const {height, width, fontSize, type='', icon='', text='', open, arrow, marginRight, active, bold} = props;

  const style = styles(active, width, height, fontSize, marginRight, icon, bold);

  return (
    <Fragment>
      {type === 'regionSetting' && (
        <TouchableOpacity onPress={()=>{{open()}}}>
          <View style={style.region}>
            <Text style={style.text}>{props.text}</Text>
            <TriangleDownSVG height={iosHeightRatio*13}/>
          </View>
        </TouchableOpacity>
      )}      
      {type === 'mainLabel' && (
        <TouchableOpacity onPress={()=>{{open()}}}>
          <View style={style.main}>
            {icon=== 'date' && <CalenderSVG height={10.8}/>}
            {icon=== 'time' && <ClockSVG height={10.8}/>}
            <Text style={style.text}>{props.text}</Text>
            { arrow && <TriangleDownSVG height={iosHeightRatio*9}/> }
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

const styles = (active, width, height, fontSize, marginRight, icon, bold) => StyleSheet.create({
  region: {
    width: width,
    height: height,
    borderRadius: 10,
    backgroundColor: active?'#ffd2e6':'rgba(234, 75, 155, 0.13)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      android:{
        paddingLeft: aosWidthRatio*25.5,
        paddingRight: aosWidthRatio*20,
      },
      ios:{
        paddingLeft: iosWidthRatio*26.3,
        paddingRight: iosWidthRatio*21,
      }
    }),
  },
  main: {
    width: width,
    height: height,
    borderRadius: 16,
    backgroundColor: active?'#ffd2e6':'rgba(234, 75, 155, 0.13)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: icon?'flex-start':'space-between',
    paddingLeft: iosWidthRatio*17,
    paddingRight: iosWidthRatio*11,
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
    justifyContent: icon?'flex-start':'space-between',
    ...Platform.select({
      android:{
        paddingLeft: aosWidthRatio*21,
        paddingRight: aosWidthRatio*20,
      },
      ios:{
        paddingLeft: iosWidthRatio*22,
        paddingRight: iosWidthRatio*21,
      }
    }),
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
    fontWeight: bold?'bold':'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#000000',
    paddingLeft: icon?iosWidthRatio*10:2,
  },
})
