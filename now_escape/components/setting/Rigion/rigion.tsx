import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Pressable, ActivityIndicator} from "react-native";
import {useState, useCallback} from "react";
import _ from "lodash";
import regionStore from "../../../store/rigionStore";
import { useFonts } from 'expo-font';

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Rigion(props){
  const {rigion, rigionName, rigionListString, rigionList, setRigionList, setRigion} = regionStore();
  const [currentRigionIdx, setCurrentRigionIdx] = useState(findRigionIdx(rigionList));

  const renderRigionItem = ({item, index}:{item:any, index:number}) => {
      return(
          <Pressable
              onPress={()=>{
                setRigionList(rigionList,currentRigionIdx,index);
                setRigion(rigionName,rigionListString,currentRigionIdx,index)}}
          >
              <Text style={styles.rigionSecond}>{item}</Text>
          </Pressable>
      );
  }

  const renderItem = ({item, index}:{item:any, index:number}) => {
    return(
        <Pressable
            style={{backgroundColor:
                    index === currentRigionIdx
                        ? 'rgb(255,210,230)'
                        : 'rgb(239,239,239)'}}
            onPress={()=>setCurrentRigionIdx(index)}
        >
            <Text style={styles.rigionFirst}>{item}</Text>
        </Pressable>
    );
  }

    return(
      <View style={styles.container}>
          <Text style={styles.text}>지역 설정</Text>
          <View style={styles.sectionBar}/>
          <View style={styles.rigionBox}>
              <FlatList
                  data={rigionName}
                  renderItem={renderItem}
              />
              {
                  <FlatList
                      data={rigionListString[currentRigionIdx]}
                      renderItem={renderRigionItem}
                  />
              }
          </View>
      </View>
    );
}

function findRigionIdx(rigionList:boolean[][]){
    for(let i=0; i<rigionList.length; i++){
        if(-1 !== _.indexOf(rigionList[i], true)){
            return i;
        }
    }
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        borderRadius: 25,
        backgroundColor: '#ffffff',
        zIndex:2,
        ...Platform.select({
            android:{
                width: aosWidthRatio*360,
                height:aosHeightRatio*593,
                paddingLeft: aosWidthRatio*16,
                paddingRight: aosHeightRatio*16,            
            },
            ios:{
                width: iosWidthRatio*375,
                height:iosHeightRatio*618,
                paddingLeft: iosWidthRatio*17,
                paddingRight: iosWidthRatio*17,
            }
        })
    },
    text:{
        alignItems:'center',
        textAlign: 'center',
        fontWeight:'bold',
        // fontFamily: "Pretendard",
        letterSpacing:0.34,
        // alignContent: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1 ? iosWidthRatio*19:17,
                letterSpacing: 0.32,
                marginBottom: aosHeightRatio*19.9,
                marginTop: aosHeightRatio*27,
            },
            ios:{
                fontSize: iosWidthRatio<1 ? iosWidthRatio*19:17,
                letterSpacing:0.34,
                marginBottom: iosHeightRatio*20.9,
                marginTop: iosHeightRatio*28,
            }
        })
    },
    sectionBar: {
        height: 1,
        backgroundColor: "#939393",
        ...Platform.select({
            android:{
                width: aosWidthRatio*327.6,
            },
            ios:{
                width: iosWidthRatio*341.3,
            }
        })
    },
    rigionBox:{
        display:'flex',
        flexDirection:'row',
    },
    rigionFirst:{
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*16,
                width:aosWidthRatio*113,
                height:aosHeightRatio*59,
                paddingTop:aosHeightRatio*20,
            },
            ios:{
                fontSize: iosWidthRatio*17,
                width:iosWidthRatio*117,
                height:iosHeightRatio*61,
                paddingTop:iosHeightRatio*20,
            }
        })
    },
    rigionSecond:{
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*16,
                height: aosHeightRatio*59,
                width: aosWidthRatio*214.6,
                paddingTop: aosHeightRatio*19.1,
            },
            ios:{
                fontSize: iosWidthRatio*17,
                height:iosHeightRatio*61,
                width:iosWidthRatio*224,
                paddingTop:iosHeightRatio*21,
            }
        })

    }
})