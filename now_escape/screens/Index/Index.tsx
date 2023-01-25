import * as React from 'react';
import {Image, View, Text, StyleSheet, Pressable, SafeAreaView, Platform, FlatList} from "react-native";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";
import SearchSvg from '../../assets/iconSearchBlack'
import Date from "../../components/setting/Date/date";
import dateStore from "../../store/dateStore";

export default function Index(){
    const {date, setDateVisible, dateVisible} = dateStore();

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.filterBar}>
                    <View style={{flexDirection:'row',flex: 1, justifyContent: 'flex-start' }}>
                    <Label
                        height={32}
                        width={130}
                        borderRadius={16}
                        type={'mainLabel'}
                        text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                        open={()=>{setDateVisible(dateVisible)}}
                    /><Date/>
                    <Label
                        height={32}
                        width={115}
                        borderRadius={16}
                        type={'mainLabel'}
                        text={'서울/홍대'}
                    />
                    </View>
                    <View style={{display: 'flex', paddingRight: 23.1, justifyContent: 'center',}}>
                    <SearchSvg/>                        
                    </View>

                </View>
                <View style={styles.banner}></View>
                <ListItem/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        ...Platform.select({
            android:{
                height:'84dp',
            },
            ios:{
                height:60,
            }
        })
    },
    filterBar:{
        display:'flex',
        flexDirection:'row',
        ...Platform.select({
            android:{},
            ios:{
                paddingTop:15,
                paddingBottom:13,
                paddingLeft:17
            }
        })
    },
    banner:{
        display:'flex',
        backgroundColor: 'rgb(255,223,232)',
        ...Platform.select({
            android:{},
            ios:{
                height:168,
                width:'100%'
            }
        })
    }

})