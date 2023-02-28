import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Pressable, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import _ from "lodash";
import * as Font from 'expo-font'
import regionStore from "../../../store/rigionStore";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'
import genreStore from "../../../store/genreStore";
import {format} from "date-fns";
import dateStore from "../../../store/dateStore";
import searchStore from "../../../store/searchStore";
import timeStore from "../../../store/timeStore";
import axios from "axios";
import escapeListStore from "../../../store/escapeListStore";
import currentPageStore from "../../../store/currentPageStore";
const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Rigion(props){
    const {currentPage} = currentPageStore();
    const {rigionName, rigionListString, rigionList, setRigionList, setRigion} = regionStore();
    const [currentRigionIdx, setCurrentRigionIdx] = useState(findRigionIdx(rigionList));
    const {getEscapeList,isEscapeListNull,setIsEscapeListNull} = escapeListStore();
    const {isOpen} = props;
    const {date} = dateStore();
    const {genre} = genreStore();
    const {setSearchData, searchText} = searchStore();
    const {time} = timeStore();
    const [isFont, setIsFont] = React.useState(false);

    React.useEffect(() => {
      Font.loadAsync({
        "Pretendard": require('../../../assets/fonts/Pretendard-Bold.otf'),
        "Pretendard-Medium": require('../../../assets/fonts/Pretendard-Medium.otf'),
      }).then(() => setIsFont(true));
    },[])

    async function getList(searchData){
        if(currentPage==="index"){
            searchData.genreName="";
            searchData.searchWord="";
        }
        const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
            {
                region1: searchData.region1,
                region2: searchData.region2==="전체"?"":searchData.region2,
                searchWord: searchData.searchWord,
                genreName: searchData.genreName==="전체장르"?"":searchData.genreName,
                themeTime: searchData.themeTime,
            })
        if(response.data.length === 0){
            setIsEscapeListNull(true);
        }else{
            setIsEscapeListNull(false);
        }
        getEscapeList(response.data);
    }

  const renderRigionItem = ({item, index}:{item:any, index:number}) => {
      return(
          <Pressable
              onPress={()=>{
                setRigionList(rigionList,currentRigionIdx,index);
                setRigion(rigionName,rigionListString,currentRigionIdx,index);
                setSearchData({
                    region1: String(rigionName[currentRigionIdx]),
                    region2: String(rigionListString[currentRigionIdx][index]),
                    searchWord: searchText,
                    genreName: genre,
                    themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time
                });
                getList({
                    region1: String(rigionName[currentRigionIdx]),
                    region2: String(rigionListString[currentRigionIdx][index]),
                    searchWord: searchText,
                    genreName: genre,
                    themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time
                });
                isOpen();
              }}
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
              <View style={{...Platform.select({
                      android:{
                          height:aosHeightRatio*500,
                          paddingBottom: aosHeightRatio*20
                      },
                      ios:{
                          height:iosHeightRatio*500
                      }
                  })}}>
                  <FlatList
                      data={rigionListString[currentRigionIdx]}
                      renderItem={renderRigionItem}
                  />
              </View>
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#ffffff',
        zIndex:2,
        ...Platform.select({
            android:{
                width: aosWidthRatio*360,
                height: aosHeightRatio*550,
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
        letterSpacing:0.34,
        fontFamily: 'Pretendard',
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
        fontFamily: 'Pretendard-Medium',
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
        fontFamily: 'Pretendard-Medium',
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