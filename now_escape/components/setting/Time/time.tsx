import * as React from 'react';
import {Text, View, StyleSheet, Pressable, Platform} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Button from "../../Button/button";
import timeStore from "../../../store/timeStore";

export default function Time(){
    const {time, setTime, timeList} = timeStore();
    const timeListItem = timeList.map(
        (value, index)=>(
            <Picker.Item
                key={index}
                style={styles.pickerItem}
                label={value}
                value={value}
            />));

    return(
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
              <Button text={'취소'} active={true} rounded={true} canceled={true} height={48} width={144}/>
              <Button text={'적용'} active={true} rounded={true} canceled={false} height={48} width={144}/>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        ...Platform.select({
            android:{

            },
            ios:{
                height:350,
                width:325,
                borderRadius: 8,
                backgroundColor: 'white',
                overflow:'hidden',
                paddingTop: 26,
                paddingBottom:20
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
    picker:{
        display:'flex',
        justifyContent:'center',
        ...Platform.select({
            android:{},
            ios:{
                height:200,
                width:144,
                marginVertical: 15
            }
        })
    },
    pickerItem:{
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 'bold'
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