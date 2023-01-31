import * as React from 'react';
import {Text, View, StyleSheet, Platform, Pressable} from "react-native";
import dateStore from "../../../store/dateStore";
import Button from "../../Button/button";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Date(){
    const {date, setDate, dateVisible, setDateVisible} = dateStore();

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
                value={date}
                onChange={(event, date)=>{setDate(date)}}
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
                    onPress={()=>setDateVisible(dateVisible)}/>
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
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow:'hidden',
        ...Platform.select({
            android:{
                height:aosHeightRatio*302,
                width:aosWidthRatio*312,
                // marginTop: aosHeightRatio*169,
                // marginLeft: aosWidthRatio*24,
                // paddingTop: aosHeightRatio*25,
                // paddingBottom: aosHeightRatio*12,
            },
            ios:{
                height:iosHeightRatio*285,
                width:iosWidthRatio*325,
                // marginTop: iosHeightRatio*249,
                // paddingTop: iosHeightRatio*26,
                // paddingBottom: iosHeightRatio*12,
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
                marginBottom: iosHeightRatio*60,
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