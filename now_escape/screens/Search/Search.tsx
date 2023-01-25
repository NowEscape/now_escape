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

import { Dimensions } from 'react-native';
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
                <ArrowBackSVG/>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text)=>{setSearchText(text)}}
                />
                <SearchSVG/>
            </View>
            <View style={{
                    justifyContent: 'flex-end',
                    width: currentWidth*300,
                    height: 1,
                    backgroundColor: "#000000",
                    paddingLeft: 100,
                    alignContent: 'flex-end'
                }}></View>
            <Label
                style={styles.firstLabel}
                height={currentHeight*49}
                width={currentWidth*341}
                borderRadius={10}
                type={"searchLabel"}
                text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                open={()=>{setDateVisible(dateVisible)}}
            />
            <Date/>
            <Label
                style={styles.secondLabel}
                height={currentHeight*49}
                width={currentWidth*341}
                borderRadius={10}
                type={"searchLabel"}
                text={time + ' 이후'}
                open={()=>{setTimeVisible(timeVisible)}}
            />
            <Time/>
            <View style={styles.rowContainer}>
                <Label
                    style={styles.thirdLabel}
                    height={currentHeight*49}
                    width={currentWidth*165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={genre}
                    open={()=>setIsGenreSettingOpen((prevState => !prevState))}
                />
                <Label
                    style={styles.thirdLabel}
                    height={currentHeight*49}
                    width={currentWidth*165}
                    borderRadius={10}
                    type={"searchLabel"}
                    text={"서울 홍대"}
                />
            </View>
            {isGenreSettingOpen === true ? <Genre search={true}/> : null}
            <View
                style={{
                    position: 'absolute',
                    bottom: currentHeight*17
                }}
            >
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
        display:'flex',
        flexDirection:'column',
        width:'100%',
        alignItems: 'center',
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    searchInput:{
        display:'flex',
        flexDirection:'row',
        width: currentWidth*300,
        height: currentHeight*30,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    searchContainer:{
        display:'flex',
        flexDirection:'column',
        width: currentWidth*300,
        height: currentHeight*30,
        ...Platform.select({
            android:{},
            ios:{}
        })
    },
    rowContainer:{
        width: '100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        ...Platform.select({
            android:{},
            ios:{
                paddingLeft: currentWidth*17,
                paddingRight: currentWidth*17
            }
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
                // marginBottom: 17,
            }
        })
    },
    thirdLabel:{
        ...Platform.select({
            android:{},
            ios:{
                // height:49,
                // marginTop: 20
            }
        })
    }
})