import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Pressable} from "react-native";
import {useState} from "react";
import _ from "lodash";
import regionStore from "../../../store/rigionStore";

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
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
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
    ...Platform.select({
        android:{
            // width: 60,
            // height: 19,
            fontSize: 16,
            lineHeight: 29,
            letterSpacing: 0.32,
        },
        ios:{
            fontSize: iosWidthRatio < 1? 17:iosWidthRatio*19,
            lineHeight:31,
            letterSpacing:0.34,
            marginBottom:iosHeightRatio*20.9,
            marginTop:iosHeightRatio*28
        }
    })
  },
  sectionBar: {
    width: iosWidthRatio*341.3,
    height: 1,
    backgroundColor: "#939393",
  },
    rigionBox:{
        display:'flex',
        flexDirection:'row',
        // marginLeft: currentWidth*17,
        // marginRight: currentHeight*17,
    },
    rigionFirst:{
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*17,
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
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*16,
                height: aosHeightRatio*59,
                width: aosWidthRatio*214.6,
                paddingTop: aosHeightRatio*20,
            },
            ios:{
                fontSize: iosWidthRatio*17,
                height:iosHeightRatio*61,
                width:iosWidthRatio*224,
                paddingTop:iosHeightRatio*20,
            }
        })

    }
})