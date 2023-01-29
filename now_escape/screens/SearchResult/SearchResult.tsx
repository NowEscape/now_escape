import * as React from 'react';
import {Image, View, Text, StyleSheet, SafeAreaView, Platform, TextInput, ScrollView} from "react-native";
import Label from "../../components/Label/label";
import ListItem from '../../components/ListItem/listItem';

import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'
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

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

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
                <View style={{marginTop: iosHeightRatio*4.5}}><ArrowBackSVG/></View>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text)=>{setSearchText(text)}}
                />
                <SearchSVG/>
            </View>
            <View style={{
                width: iosWidthRatio*300,
                height: 1,
                marginTop: 8,
                marginLeft: 25,
                backgroundColor: "#000000",
            }}></View>

            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollLabelContainer}
                showsHorizontalScrollIndicator={false}
            >
                <Label
                    height={iosHeightRatio*31}
                    width={iosWidthRatio*124}
                    fontSize={16}
                    type={"mainLabel"}
                    icon={'date'}
                    text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                    open={()=>{setDateVisible(dateVisible)}}
                /><Date/>
                <Label
                    height={iosHeightRatio*31}
                    width={iosWidthRatio*107}
                    fontSize={16}
                    type={"mainLabel"}
                    icon={'time'}
                    text={time + ' ~'}
                    open={()=>{setTimeVisible(timeVisible)}}
                /><Time/>
                <Label
                    height={iosHeightRatio*31}
                    width={iosWidthRatio*83}
                    fontSize={16}
                    type={"mainLabel"}
                    text={genre}
                    open={()=>setIsGenreSettingOpen((prevState => !prevState))}
                />
                <Label
                    height={iosHeightRatio*31}
                    width={iosWidthRatio*90}
                    fontSize={16}
                    type={"mainLabel"}
                    text={rigion}
                    open={()=>setIsRigionSettingOpen((prevState => !prevState))}
                />
            </ScrollView>
            {isGenreSettingOpen === true ? <Genre search={true}/> : null}
            {isRigionSettingOpen === true ? <Rigion/> : null}
            <View
            style={{
                width:iosWidthRatio*375,
                height: iosHeightRatio*600
            }}>
            <ListItem/>
            </View>
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
        width: iosWidthRatio*375,
        height: iosHeightRatio*812,
        // paddingHorizontal:17,
    },
    rowContainer:{
        display:"flex",
        width:iosWidthRatio*375,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'gray',
        ...Platform.select({
            android:{},
            ios:{
                marginTop: iosHeightRatio*18,
                paddingHorizontal:iosWidthRatio*28,
                // paddingVertical: iosHeightRatio*7
            }
        })
    },
    scrollLabelContainer:{
        display:'flex',
        // paddingHorizontal:iosWidthRatio*17,
        // paddingVertical: iosHeightRatio*7,
        justifyContent: 'flex-start',
        width:iosWidthRatio*375,
        height:iosHeightRatio*31,
        marginTop: iosHeightRatio*16.7,
        marginBottom: iosHeightRatio*17.3,
        paddingLeft: 17
    },
    searchInput:{
        display:'flex',
        width: iosWidthRatio*250,
        height: iosHeightRatio*30,
        marginLeft: iosWidthRatio*20,
        marginRight: iosWidthRatio*20,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
})