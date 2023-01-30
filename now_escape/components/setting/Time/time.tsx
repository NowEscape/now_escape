import * as React from 'react';
import {Text, View, StyleSheet, Platform, Modal} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Button from "../../Button/button";
import timeStore from "../../../store/timeStore";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Time(){
    const {time, setTime, timeList, timeVisible, setTimeVisible} = timeStore();
    const timeListItem = timeList.map(
        (value, index)=>(
            <Picker.Item
                key={index}
                style={styles.pickerItem}
                label={value}
                value={value}
            />));

    return(
        <Modal animationType={'slide'} transparent={true} visible={timeVisible} onRequestClose={()=>setTimeVisible(timeVisible)}>
            <View style={styles.container}>
                <Text style={styles.text}>{'테마 시작 시간 설정'}</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={time}
                    numberOfLines={3}
                    onValueChange={(itemValue, itemIndex) =>
                        setTime(itemValue)
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
                        onPress={()=>setTimeVisible(timeVisible)}/>
                    <Button 
                        text={'적용'} 
                        active={true} 
                        rounded={true} 
                        canceled={false} 
                        height={iosHeightRatio*48} 
                        width={iosWidthRatio*145} 
                        onPress={()=>setTimeVisible(timeVisible)}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
                marginTop: aosHeightRatio*169,
                marginLeft: aosWidthRatio*24,
                paddingTop: aosHeightRatio*25,
                paddingBottom: aosHeightRatio*12,
            },
            ios:{
                height:iosHeightRatio*285,
                width:iosWidthRatio*325,
                marginTop: iosHeightRatio*249,
                marginLeft: iosWidthRatio*25,
                paddingTop: iosHeightRatio*26,
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
            }
        })
    },
    picker:{
        ...Platform.select({
            android:{},
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