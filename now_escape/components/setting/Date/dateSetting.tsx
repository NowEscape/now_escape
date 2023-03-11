import * as React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Platform, Pressable} from "react-native";
import dateStore from "../../../store/dateStore";
import Button from "../../Button/button";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as Font from 'expo-font'

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'
import _ from "lodash";
import {format} from "date-fns";
import genreStore from "../../../store/genreStore";
import searchStore from "../../../store/searchStore";
import timeStore from "../../../store/timeStore";
import regionStore from "../../../store/regionStore";
import axios from "axios";
import escapeListStore from "../../../store/escapeListStore";
import currentPageStore from "../../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function DateSetting(){
    const {currentPage} = currentPageStore();
    const {date, setDate, dateVisible, setDateVisible} = dateStore();
    const {genre} = genreStore();
    const {setSearchData, searchText} = searchStore();
    const {time} = timeStore();
    const {region} = regionStore();
    const [currentDate, setCurrentDate] = useState(date);
    const {getEscapeList,isEscapeListNull,setIsEscapeListNull} = escapeListStore();
    const [isVisible, setVisible] = useState(false);
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
        console.log(response.data);
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
               deviceWidth={iosWidthRatio*375}
               deviceHeight={iosHeightRatio*812}
               style={styles.backContainer}
               >
               <View style={styles.container}>
                   <Text style={styles.text}>{'테마 날짜 설정'}</Text>
                   <DateTimePicker
                       style={styles.picker}
                       mode={'date'}
                       value={currentDate}
                       minimumDate={new Date()}
                       maximumDate={new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        (new Date().getDate()+7)
                       )}
                       onChange={(event, date)=>setCurrentDate(date)}
                   />
                   <View style={styles.buttonBox}>
                       <Button 
                           text={'취소'} 
                           active={true} 
                           rounded={true} 
                           canceled={true} 
                           height={iosHeightRatio*48} 
                           width={iosWidthRatio*145} 
                           fontSize={iosWidthRatio<1?iosWidthRatio*17.5:iosWidthRatio*16.5}
                           onPress={()=>setDateVisible(dateVisible)}/>
                       <Button 
                           text={'적용'} 
                           active={true} 
                           rounded={true} 
                           canceled={false} 
                           height={iosHeightRatio*48} 
                           width={iosWidthRatio*145} 
                           fontSize={iosWidthRatio<1?iosWidthRatio*17.5:iosWidthRatio*16.5}
                           onPress={()=>{
                               setDate(currentDate);
                               setSearchData({
                                   region1: _.split(region, ' ', 2)[0],
                                   region2: _.split(region, ' ', 2)[1],
                                   searchWord: searchText,
                                   genreName: genre,
                                   themeTime: format(currentDate, 'yyyy-MM-dd')+ ' ' + time
                               });
                               getList({
                                   region1: _.split(region, ' ', 2)[0],
                                   region2: _.split(region, ' ', 2)[1],
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
            <Modal 
               isVisible={dateVisible}
               hasBackdrop={true}
               backdropColor={'black'}
               backdropOpacity={0.55}
               onBackdropPress={()=>setDateVisible(dateVisible)}
               coverScreen={true}
               deviceWidth={aosWidthRatio*360}
               deviceHeight={aosHeightRatio*640}
               style={styles.backContainer}
               >
               <View style={styles.container}>
                    <Text style={styles.text}>{'테마 날짜 설정'}</Text>
                    <Pressable
                        onPress={() => setVisible(true)}>
                    <View style={styles.aosDatePicker}>
                        <Text style={styles.aosPickerText}>{String(
                            currentDate.getFullYear() + '년 '
                            + (currentDate.getMonth()+1) + '월 '
                            + currentDate.getDate() + '일'
                            )}
                        </Text>
                    </View>
                    </Pressable>
                    <DateTimePickerModal
                    isVisible={isVisible}
                    mode={'date'}
                    date={currentDate}
                    minimumDate={new Date()}
                    maximumDate={new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        (new Date().getDate()+7)
                       )}
                    onConfirm={(pickerDate)=>{
                        setVisible(false)
                        setCurrentDate(pickerDate);
                        setDate(pickerDate);
                    }}
                    onCancel={()=>setVisible(false)}
                    onChange={(pickerDate)=>{
                        setVisible(false)
                        setCurrentDate(pickerDate);
                        setDate(pickerDate);
                    }}
                    />
                   <View style={styles.buttonBox}>
                       <Button 
                           text={'취소'} 
                           active={true} 
                           rounded={true} 
                           canceled={true} 
                           height={aosHeightRatio*46} 
                           width={aosWidthRatio*139} 
                           fontSize={aosWidthRatio<1?aosWidthRatio*15:aosWidthRatio*13.5}
                           onPress={()=>setDateVisible(dateVisible)}/>
                       <Button 
                           text={'적용'} 
                           active={true} 
                           rounded={true} 
                           canceled={false} 
                           height={aosHeightRatio*46} 
                           width={aosWidthRatio*139}
                           fontSize={aosWidthRatio<1?aosWidthRatio*15:aosWidthRatio*13.5}
                           onPress={()=>{
                               setDate(currentDate);
                               setSearchData({
                                   region1: _.split(region, ' ', 2)[0],
                                   region2: _.split(region, ' ', 2)[1],
                                   searchWord: searchText,
                                   genreName: genre,
                                   themeTime: format(currentDate, 'yyyy-MM-dd')+ ' ' + time
       
                               });
                               getList({
                                   region1: _.split(region, ' ', 2)[0],
                                   region2: _.split(region, ' ', 2)[1],
                                   searchWord: searchText,
                                   genreName: genre,
                                   themeTime: format(currentDate, 'yyyy-MM-dd')+ ' ' + time
       
                               });
                               setDateVisible(dateVisible);
                           }}/>
                   </View>
               </View>
            </Modal>
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
                height:aosHeightRatio*240,
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
        fontFamily: 'Pretendard',
        textAlign: 'center',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1?aosWidthRatio*16:aosWidthRatio*15,
                letterSpacing: aosWidthRatio*0.32,
                marginTop: aosHeightRatio*20,
            },
            ios:{
                fontSize: iosWidthRatio<1?iosWidthRatio*20:iosWidthRatio*17,
                letterSpacing: iosWidthRatio*0.34,
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
    },
    aosDatePicker: {
        height: aosHeightRatio*30,
        width: aosWidthRatio*125,
        marginTop: aosWidthRatio*65,
        marginBottom: aosWidthRatio*70,
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        justifyContent: 'center'
    },
    aosPickerText: {
        fontFamily: 'Pretendard',
        fontSize: aosWidthRatio*13,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})