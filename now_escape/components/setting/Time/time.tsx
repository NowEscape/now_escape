import * as React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Platform} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Button from "../../Button/button";
import timeStore from "../../../store/timeStore";
import Modal from "react-native-modal";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'
import _ from "lodash";
import {format} from "date-fns";
import dateStore from "../../../store/dateStore";
import genreStore from "../../../store/genreStore";
import searchStore from "../../../store/searchStore";
import rigionStore from "../../../store/rigionStore";
import escapeListStore from "../../../store/escapeListStore";
import axios from "axios";
import currentPageStore from "../../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Time(){
    const {currentPage} = currentPageStore();
    const {time, setTime, timeList, timeVisible, setTimeVisible} = timeStore();
    const [currentTime, setCurrentTime] = useState(time);
    const {getEscapeList} = escapeListStore();
    const {date} = dateStore();
    const {genre} = genreStore();
    const {setSearchData, searchText} = searchStore();
    const {rigion} = rigionStore();
    const timeListItem = timeList.map(
        (value, index)=>(
            <Picker.Item
                key={index}
                style={styles.pickerItem}
                label={value}
                value={value}
            />));

    async function getList(searchData){
        const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
            {
                region1: searchData.region1,
                region2: searchData.region2,
                searchWord: currentPage==="Index"?"":searchData.searchWord,
                genreName: currentPage==="Index"?"":searchData.genreName,
                themeTime: searchData.themeTime,
            })
        getEscapeList(response.data);
    }

    return(
        <Modal 
            isVisible={timeVisible}
            hasBackdrop={true}
            backdropColor={'black'}
            backdropOpacity={0.55}
            onBackdropPress={()=>setTimeVisible(timeVisible)}
            coverScreen={true}
            deviceWidth={Platform.OS==='ios'?iosWidthRatio*375:aosWidthRatio*360}
            deviceHeight={Platform.OS==='ios'?iosHeightRatio*812:aosHeightRatio*640}
            style={styles.backContainer}
            >
            <View style={styles.container}>
                <Text style={styles.text}>{'테마 시작 시간 설정'}</Text>
                <Picker
                    mode='dropdown'
                    prompt='원하는 시간대를 선택해주세요.'                
                    style={styles.picker}
                    selectedValue={currentTime}
                    numberOfLines={3}
                    onValueChange={(itemValue, itemIndex) =>
                        setCurrentTime(itemValue)
                    }>
                    {timeListItem}
                </Picker>

                <View style={styles.buttonBox}>
                    <Button 
                        text={'취소'} 
                        active={true} 
                        rounded={true} 
                        canceled={true} 
                        height={iosHeightRatio*48} 
                        width={iosWidthRatio*145}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        onPress={()=>setTimeVisible(timeVisible)}/>
                    <Button 
                        text={'적용'} 
                        active={true} 
                        rounded={true} 
                        canceled={false} 
                        height={iosHeightRatio*48} 
                        width={iosWidthRatio*145} 
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        onPress={()=>{
                            setTime(currentTime);
                            setSearchData({
                                region1: _.split(rigion, ' ', 2)[0],
                                region2: _.split(rigion, ' ', 2)[1],
                                searchWord: searchText,
                                genreName: genre,
                                themeTime: format(date, 'yyyy-MM-dd')+ ' ' + currentTime
                            });
                            getList({
                                region1: _.split(rigion, ' ', 2)[0],
                                region2: _.split(rigion, ' ', 2)[1],
                                searchWord: searchText,
                                genreName: genre,
                                themeTime: format(date, 'yyyy-MM-dd')+ ' ' + currentTime
                            });
                            setTimeVisible(timeVisible);
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*180
            },
            ios:{
                marginTop: iosHeightRatio*200
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
                height:aosHeightRatio*190,
                 width:aosWidthRatio*312,
                 paddingTop: aosHeightRatio*20,
            },
            ios:{
                height:iosHeightRatio*360,
                width:iosWidthRatio*325,
                paddingBottom: iosHeightRatio*12,
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
                letterSpacing:0.32,
            },
            ios:{
                fontSize: 17,
                letterSpacing:0.34,
                marginTop: iosHeightRatio*26,
            }
        })
    },
    picker:{
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*30,
                marginBottom: aosHeightRatio*30,                
                width: aosWidthRatio*100, 
            },
            ios:{
                width:iosWidthRatio*300,
            }
        })
    },
    pickerItem:{
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
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