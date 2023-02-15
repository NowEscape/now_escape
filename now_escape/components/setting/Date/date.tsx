import * as React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Platform, Pressable} from "react-native";
import dateStore from "../../../store/dateStore";
import Button from "../../Button/button";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'
import _ from "lodash";
import {format} from "date-fns";
import genreStore from "../../../store/genreStore";
import searchStore from "../../../store/searchStore";
import timeStore from "../../../store/timeStore";
import rigionStore from "../../../store/rigionStore";
import axios from "axios";
import escapeListStore from "../../../store/escapeListStore";
import currentPageStore from "../../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Date(){
    const {currentPage} = currentPageStore();
    const {date, setDate, dateVisible, setDateVisible} = dateStore();
    const {genre} = genreStore();
    const {setSearchData, searchText} = searchStore();
    const {time} = timeStore();
    const {rigion} = rigionStore();
    const [currentDate, setCurrentDate] = useState(date);
    const {getEscapeList} = escapeListStore();

    async function getList(searchData){
        const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
            {
                region1: searchData.region1,
                region2: searchData.region2==="전체"?"":searchData.region2,
                searchWord: currentPage==="Index"?"":searchData.searchWord,
                genreName: currentPage==="Index"||"전체장르"?"":searchData.genreName,
                themeTime: searchData.themeTime,
            })
        getEscapeList(response.data);
    }

    if (Platform.OS === 'ios') {
        return(
            <Modal 
               isVisible={dateVisible}
               hasBackdrop={true}
               backdropColor={'black'}
               backdropOpacity={0.55}
               onBackdropPress={()=>setDateVisible(dateVisible)}
               coverScreen={true}
               deviceWidth={Platform.OS==='ios'?iosWidthRatio*375:aosWidthRatio*360}
               deviceHeight={Platform.OS==='ios'?iosHeightRatio*812:aosHeightRatio*640}
               style={styles.backContainer}
               >
               <View style={styles.container}>
                   <Text style={styles.text}>{'테마 날짜 설정'}</Text>
                   <DateTimePicker
                       style={styles.picker}
                       mode={'date'}
                       value={currentDate}
                       onChange={(event, date)=>setCurrentDate(date)}
                   />
                   <View style={styles.buttonBox}>
                       <Button 
                           text={'취소'} 
                           active={true} 
                           rounded={true} 
                           canceled={true} 
                           height={Platform.OS==='ios'?iosHeightRatio*48:aosHeightRatio*46} 
                           width={Platform.OS==='ios'?iosWidthRatio*145:aosWidthRatio*139} 
                           onPress={()=>setDateVisible(dateVisible)}/>
                       <Button 
                           text={'적용'} 
                           active={true} 
                           rounded={true} 
                           canceled={false} 
                           height={Platform.OS==='ios'?iosHeightRatio*48:aosHeightRatio*46} 
                           width={Platform.OS==='ios'?iosWidthRatio*145:aosWidthRatio*139} 
                           onPress={()=>{
                               setDate(currentDate);
                               setSearchData({
                                   region1: _.split(rigion, ' ', 2)[0],
                                   region2: _.split(rigion, ' ', 2)[1],
                                   searchWord: searchText,
                                   genreName: genre,
                                   themeTime: format(currentDate, 'yyyy-MM-dd')+ ' ' + time
       
                               });
                               getList({
                                   region1: _.split(rigion, ' ', 2)[0],
                                   region2: _.split(rigion, ' ', 2)[1],
                                   searchWord: searchText,
                                   genreName: genre,
                                   themeTime: format(currentDate, 'yyyy-MM-dd')+ ' ' + time
       
                               });
                               setDateVisible(dateVisible);
                           }}/>
                   </View>
               </View>
            </Modal>
           );        
    }

    else {
        return (
            <DateTimePickerModal
            isVisible={dateVisible}
            mode={'date'}
            date={currentDate}
            onConfirm={(date)=>{
                setCurrentDate(date);
                setDate(date);
                setSearchData({
                    region1: _.split(rigion, ' ', 2)[0],
                    region2: _.split(rigion, ' ', 2)[1],
                    searchWord: searchText,
                    genreName: genre,
                    themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time
                });
                getList({
                    region1: _.split(rigion, ' ', 2)[0],
                    region2: _.split(rigion, ' ', 2)[1],
                    searchWord: searchText,
                    genreName: genre,
                    themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time

                });
                setDateVisible(dateVisible);
            }}
            onCancel={()=>setDateVisible(dateVisible)}
    />
        )
    }
}

const styles = StyleSheet.create({
    backContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*169
  
            },
            ios:{
                marginTop: iosHeightRatio*249
            }
        })
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow:'hidden',
        ...Platform.select({
            android:{
                height:aosHeightRatio*302,
                width:aosWidthRatio*312,
            },
            ios:{
                height:iosHeightRatio*285,
                width:iosWidthRatio*325,
            }
        })
    },
    picker:{
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*60,
                marginBottom: aosHeightRatio*60,
            },
            ios:{
                marginTop: iosHeightRatio*60,
                marginBottom: iosHeightRatio*80,
            }
        })
    },
    text:{
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        ...Platform.select({
            android:{
                fontSize: 16,
                letterSpacing: 0.32,
                marginTop: aosHeightRatio*26,

            },
            ios:{
                fontSize: 17,
                letterSpacing:0.34,
                marginTop: iosHeightRatio*26,
            }
        })
    },
    buttonBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        ...Platform.select({
            android:{
                width: aosWidthRatio*285,
            },
            ios:{
                width: iosWidthRatio*299,
            }
        })
    }

})