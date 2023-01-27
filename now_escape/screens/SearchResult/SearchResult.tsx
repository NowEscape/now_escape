import * as React from 'react';
import {Image, View, Text, StyleSheet, SafeAreaView, Platform, TextInput, ScrollView} from "react-native";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";

import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'
import {iosHeight, iosWidth} from "../../globalStyles_ios";
import searchStore from "../../store/searchStore";
import timeStore from "../../store/timeStore";
import dateStore from "../../store/dateStore";
import rigionStore from "../../store/rigionStore";
import genreStore from "../../store/genreStore";
import {useState} from "react";
import Date from "../../components/setting/Date/date";
import Time from "../../components/setting/Time/time";
import Genre from "../../components/setting/Genre/genre";
import Rigion from "../../components/setting/Rigion/rigion";

const currentWidth = iosWidth as unknown as number;
const currentHeight = iosHeight as unknown as number;

export default function SearchResult(){
    const {searchText, setSearchText} = searchStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const {rigion} = rigionStore();
    const {genre} = genreStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={{marginTop: currentHeight*4.5}}><ArrowBackSVG/></View>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text)=>{setSearchText(text)}}
                />
            </View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollLabelContainer}
                showsHorizontalScrollIndicator={false}
            >
                <Label
                    height={currentHeight*31}
                    width={currentWidth*150}
                    borderRadius={10}
                    type={"mainLabel"}
                    icon={'date'}
                    text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                    open={()=>{setDateVisible(dateVisible)}}
                /><Date/>
                <Label
                    height={currentHeight*31}
                    width={currentWidth*130}
                    borderRadius={10}
                    type={"mainLabel"}
                    icon={'time'}
                    text={time + ' ~'}
                    open={()=>{setTimeVisible(timeVisible)}}
                /><Time/>
                <Label
                    height={currentHeight*31}
                    width={currentWidth*83}
                    borderRadius={10}
                    type={"mainLabel"}
                    text={genre}
                    open={()=>setIsGenreSettingOpen((prevState => !prevState))}
                    arrow='false'
                />
                <Label
                    height={currentHeight*31}
                    width={currentWidth*90}
                    borderRadius={10}
                    type={"mainLabel"}
                    text={rigion}
                    open={()=>setIsRigionSettingOpen((prevState => !prevState))}
                    arrow='false'
                />
            </ScrollView>
            {isGenreSettingOpen === true ? <Genre search={true}/> : null}
            {isRigionSettingOpen === true ? <Rigion/> : null}
            <ListItem/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:"100%",
        height:"100%",
        paddingHorizontal:17
    },
    scrollLabelContainer:{
        display:'flex',
        paddingHorizontal:currentWidth*17,
        paddingVertical: currentHeight*7,
        width:currentWidth*515,
        justifyContent:"space-around"
    },
    rowContainer:{
        display:"flex",
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            android:{},
            ios:{
                paddingHorizontal:currentWidth*28,
                paddingVertical: currentHeight*7
            }
        })
    },
    searchInput:{
        display:'flex',
        width: currentWidth*250,
        height: currentHeight*30,
        marginLeft: currentWidth*20,
        marginRight: currentWidth*20,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
})