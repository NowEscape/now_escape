import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Platform, TextInput, Text, Modal} from "react-native";
import {useState} from "react";
import Label from "../../components/Label/label";
import Button from "../../components/Button/button";
import searchStore from "../../store/searchStore";
import Genre from "../../components/setting/Genre/genre";
import genreStore from "../../store/genreStore";
import timeStore from "../../store/timeStore";
import dateStore from "../../store/dateStore";
import Date from "../../components/setting/Date/date";
import Time from "../../components/setting/Time/time";

export default function Search(){
    const {searchText, setSearchText} = searchStore();
    const {genre} = genreStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(true);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <Text>뒤로가기</Text>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text)=>{setSearchText(text)}}
                />
            </View>
            <Label
                style={styles.firstLabel}
                height={49}
                width={341}
                borderRadius={10}
                type={"searchLabel"}
                text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                open={()=>{setDateVisible(dateVisible)}}
            />
            <Date/>
            <Label
                style={styles.secondLabel}
                height={49}
                width={341}
                borderRadius={10}
                type={"searchLabel"}
                text={time + ' 이후'}
                open={()=>{setTimeVisible(timeVisible)}}
            />
            <Time/>
            <View style={styles.rowContainer}>
                <Label
                    style={styles.thirdLabel}
                    height={49}
                    width={165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={genre}
                    open={()=>setIsGenreSettingOpen((prevState => !prevState))}
                />
                <Label
                    style={styles.thirdLabel}
                    height={49}
                    width={165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={"서울 홍대"}
                />
            </View>
            {isGenreSettingOpen === true ? <Genre search={true}/> : null}
            <Button
                text={'검색'}
                active={true}
                rounded={true}
                canceled={false}
                height={63}
                width={341}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        padding:17,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    searchInput:{
        display:'flex',
        flexDirection:'row',
        width:300,
        height: 30,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    rowContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    firstLabel:{
        ...Platform.select({
            android:{},
            ios:{
                marginTop: 20.7,
                marginBottom: 14,
            }
        })
    },
    secondLabel:{
        ...Platform.select({
            android:{},
            ios:{
                marginBottom: 17,
            }
        })
    },
    thirdLabel:{
        ...Platform.select({
            android:{},
            ios:{
                height:49
            }
        })
    }
})