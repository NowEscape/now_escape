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

import {fonts, width, height} from '../../globalStyles'

import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'

const currentWidth = width as unknown as number;
const currentHeight = height as unknown as number;

export default function Search(){
    const {searchText, setSearchText} = searchStore();
    const {genre} = genreStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(true);


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={{marginTop: currentHeight*4.5}}><ArrowBackSVG/></View>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text)=>{setSearchText(text)}}
                />
                <SearchSVG/>
            </View>
            <View style={{
                width: currentWidth*300,
                height: 1,
                marginTop: 8,
                marginLeft: 25,
                backgroundColor: "#000000",
            }}></View>

            <View style={{marginTop: currentHeight*20}}>
                <Label
                    height={currentHeight*49}
                    width={currentWidth*341}
                    borderRadius={10}
                    type={"searchLabel"}
                    icon={'date'}
                    text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                    open={()=>{setDateVisible(dateVisible)}}
                />
            </View>
            <Date/>

            <View style={{marginTop: currentHeight*14}}>
            <Label
                height={currentHeight*49}
                width={currentWidth*341}
                borderRadius={10}
                type={"searchLabel"}
                icon={'time'}
                text={time + ' 이후'}
                open={()=>{setTimeVisible(timeVisible)}}
            />
            </View>
            <Time/>

            <View style={styles.thirdContainer}>
                <Label
                    height={currentHeight*49}
                    width={currentWidth*165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={genre}
                    open={()=>setIsGenreSettingOpen((prevState => !prevState))}
                    arrow='true'
                />
                <Label
                    height={currentHeight*49}
                    width={currentWidth*165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={"서울 홍대"}
                    arrow='true'
                />
            </View>
            <View style={{height: currentHeight*70}}>
            {isGenreSettingOpen === true ? <Genre search={true}/> : null}
            </View>

            <View style={{ flex: 1}}/>
            <View
            style={{
                position: 'absolute',
                bottom: currentHeight*17
            }}>
            <Button
                    text={'검색'}
                    active={true}
                    rounded={true}
                    canceled={false}
                    height={currentHeight*63}
                    width={currentHeight*341}
            />   
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection:'column',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        ...Platform.select({
            android:{},
            ios:{
                marginTop: currentHeight*59,
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
    rowContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    thirdContainer: {
        flexDirection: 'row',
        width: currentWidth*341,
        justifyContent: 'space-between',
        marginTop: currentHeight*17      
    }
})