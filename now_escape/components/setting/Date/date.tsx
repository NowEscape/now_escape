import * as React from 'react';
import {Text, View, StyleSheet, Platform, Modal} from "react-native";
import dateStore from "../../../store/dateStore";
import Button from "../../Button/button";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Date(){
    const {date, setDate, dateVisible, setDateVisible} = dateStore();

    return(
        <Modal animationType={'slide'} transparent={true} visible={dateVisible} onRequestClose={()=>setDateVisible(dateVisible)}>
            <View style={styles.container}>
                <Text style={styles.text}>{'테마 날짜 설정'}</Text>
                <DateTimePicker
                    style={styles.picker}
                    mode={'date'}
                    value={date}
                    onChange={(event, date)=>{setDate(date)}}
                />
                <View style={styles.buttonBox}>
                    <Button text={'취소'} active={true} rounded={true} canceled={true} height={48} width={144} onPress={()=>setDateVisible(dateVisible)}/>
                    <Button text={'적용'} active={true} rounded={true} canceled={false} height={48} width={144} onPress={()=>setDateVisible(dateVisible)}/>
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
        backgroundColor:'gray',
        marginTop: 200,
        marginLeft:20,
        ...Platform.select({
            android:{
            },
            ios:{
                height:285,
                width:325,
                borderRadius: 8,
                backgroundColor: 'white',
                overflow:'hidden',
                paddingTop: 26,
                paddingBottom:20
            }
        })
    },
    picker:{
        display:'flex',
        ...Platform.select({
            android:{},
            ios:{
                width: 170,
                height:150
            }
        })
    },
    text:{
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        fontSize:17,
        lineHeight: 33,
        letterSpacing:0.34
    },
    buttonBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        ...Platform.select({
            android:{},
            ios:{
                width:295
            }
        })
    }

})