import * as React from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView, Platform, TextInput, Text, Modal, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useEffect, useState} from "react";
import _ from "lodash";
import {format} from 'date-fns';
import Label from "../../components/Label/label"
import Button from "../../components/Button/button";
import searchStore from "../../store/searchStore";
import Genre from "../../components/setting/Genre/genre";
import genreStore from "../../store/genreStore";
import timeStore from "../../store/timeStore";
import dateStore from "../../store/dateStore";
import Date from "../../components/setting/Date/date";
import Time from "../../components/setting/Time/time";
import rigionStore from "../../store/rigionStore";
import Rigion from "../../components/setting/Rigion/rigion";
import 'react-native-gesture-handler'

import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import axios from "axios";
import escapeListStore from "../../store/escapeListStore";
import currentPageStore from "../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;
const statusBarHeight = StatusBar.currentHeight

export default function Search({navigation}){
    const {setCurrentPage} = currentPageStore();
    const {searchData, setSearchData, searchText, setSearchText} = searchStore();
    const {getEscapeList} = escapeListStore();
    const {genre} = genreStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const {rigion} = rigionStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);

    setCurrentPage("search");

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Pressable 
                        onPress={()=>{navigation.navigate('Index')}}
                        style={styles.arrowBackIcon}
                    >
                        <ArrowBackSVG height={aosHeightRatio*14}/>
                    </Pressable>
                    <TextInput
                        placeholder='테마/지점명'
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={(text)=>{setSearchText(text)}}
                        returnKeyType='search'
                        onSubmitEditing={()=>{
                            navigation.navigate('SearchResult');
                        }}
                    />
                    <Pressable
                        onPress={()=>{
                            navigation.navigate('SearchResult');
                        }}
                        style={styles.searchIcon}
                    >
                        <SearchSVG height={Platform.OS=='ios'?iosHeightRatio*21.1:aosHeightRatio*20.2}/>
                    </Pressable>
                </View>
                <View style={styles.sectionBar}></View>

                <View style={{marginTop: Platform.OS==='ios'?iosHeightRatio*20:aosHeightRatio*20}}>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*49:aosHeightRatio*47}
                        width={Platform.OS==='ios'?iosWidthRatio*341:aosWidthRatio*328}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        type={"searchLabel"}
                        icon={'date'}
                        text={ String(format(date, 'yyyy.MM.dd'))}
                        open={()=>{
                            Keyboard.dismiss()
                            setDateVisible(dateVisible)
                        }}
                    />
                </View>
                <Date/>
                <View style={{marginTop: Platform.OS==='ios'?iosHeightRatio*14:aosHeightRatio*13}}>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*49:aosHeightRatio*47}
                        width={Platform.OS==='ios'?iosWidthRatio*341:aosWidthRatio*328}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        type={"searchLabel"}
                        icon={'time'}
                        text={time + ' 이후'}
                        open={()=>{
                            Keyboard.dismiss()
                            setTimeVisible(timeVisible)
                        }}
                    />
                </View>
                <Time/>
                <View style={styles.thirdContainer}>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*49:aosHeightRatio*47}
                        width={Platform.OS==='ios'?iosWidthRatio*165:aosWidthRatio*159}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        type={"searchLabel"}
                        text={genre}
                        active={isGenreSettingOpen?true:false}
                        open={()=>{
                            Keyboard.dismiss()
                            {isRigionSettingOpen?setIsRigionSettingOpen(false):null}
                            setIsGenreSettingOpen((prevState => !prevState))
                        }}
                        arrow='true'
                    />
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*49:aosHeightRatio*47}
                        width={Platform.OS==='ios'?iosWidthRatio*165:aosWidthRatio*159}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*16:aosWidthRatio*15}
                        type={"searchLabel"}
                        text={rigion}
                        active={isRigionSettingOpen?true:false}
                        open={()=>{
                            Keyboard.dismiss()
                            {isGenreSettingOpen?setIsGenreSettingOpen(false):null}
                            setIsRigionSettingOpen((prevState => !prevState))
                            setModal(true)
                        }}
                        arrow='true'
                    />
                </View>
                {isGenreSettingOpen === true ?
                    <View
                        style={{
                            marginTop: Platform.OS==='ios'?iosHeightRatio*11:aosHeightRatio*11,
                        }}
                    >
                        <Genre search={true} isOpen={()=>setIsGenreSettingOpen((prevState => !prevState))}/>
                    </View>
                    : null}
                {isRigionSettingOpen === true ? 
                    <Modal 
                    visible={isRigionSettingOpen} 
                    transparent
                    animationType={'slide'}
                    onRequestClose={()=>{
                        setIsRigionSettingOpen((prevState => !prevState))
                    }}
                    >
                    <View style={{
                        flex: 1,
                        display: 'flex',
                        backgroundColor: "rgba(0, 0, 0, 0.55)"}}
                    >
                        <Pressable 
                            style={{flex:1}}
                            onPress={()=>
                            setIsRigionSettingOpen((prevState => !prevState))
                            }
                        />
                        <Rigion isOpen={()=>setIsRigionSettingOpen((prevState => !prevState))}/>
                    </View>
                    </Modal>
                : null}

                <View style={{ flex: 1}}/>
                <View
                    style={{
                        position: 'absolute',
                        bottom: Platform.OS==='android'?aosHeightRatio*17:0
                    }}>
                    <Button
                        text={'검색'}
                        active={true}
                        rounded={true}
                        canceled={false}
                        height={Platform.OS==='ios'?iosHeightRatio*63:aosHeightRatio*60}
                        width={Platform.OS==='ios'?iosHeightRatio*341:aosWidthRatio*323}
                        onPress={()=>{
                            navigation.navigate('SearchResult');
                        }}
                    />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        ...Platform.select({
            android:{
                paddingTop: statusBarHeight,

            },
            ios:{
                paddingTop: iosHeightRatio*10,
            }
        })
    },
    searchInput:{
        display:'flex',
        ...Platform.select({
            android:{
                width: aosWidthRatio*250,
                height: aosHeightRatio*30,
                paddingLeft: aosWidthRatio*5,
                paddingBottom: aosWidthRatio*5,
            },
            ios:{
                width: iosWidthRatio*250,
                height: iosHeightRatio*30,
                paddingLeft: iosWidthRatio*5
            }
        })
    },
    searchContainer:{
        display: 'flex',
        flexDirection: 'row',
        ...Platform.select({
            android:{
                alignItems: 'flex-start',                
                marginTop: aosHeightRatio*20
            },
            ios:{
                alignItems: 'center'
            }
        })
    },
    arrowBackIcon: {
        ...Platform.select({
            android:{
                paddingRight: aosWidthRatio*20,
                paddingLeft: aosWidthRatio*20,
                paddingVertical: aosHeightRatio*4.5,         
            },
            ios:{
                paddingRight: aosWidthRatio*20,
                paddingLeft: aosWidthRatio*20,
                paddingVertical: aosHeightRatio*4.5,
            }
        })
    },
    searchIcon: {
        ...Platform.select({
            android:{
                paddingRight: aosWidthRatio*30,
                paddingLeft: aosWidthRatio*5,
                paddingBottom: aosHeightRatio*4.5,         
            },
            ios:{
                paddingRight: aosWidthRatio*25,
                paddingLeft: aosWidthRatio*10,
                paddingBottom: aosHeightRatio*4.5,   
            }
        })
    },
    sectionBar: {
        backgroundColor: "#000000",
        alignSelf: 'flex-start',
        ...Platform.select({
            android:{
                width: aosWidthRatio*288,
                height: 1,
                marginLeft: aosWidthRatio*41,                
            },
            ios:{
                width: iosWidthRatio*300,
                height: 1,
                marginTop: iosHeightRatio*5,
                marginLeft: iosWidthRatio*46,
            }
        })
    },
    thirdContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Platform.select({
            android:{
                width: aosWidthRatio*328,
                marginTop: aosHeightRatio*17
            },
            ios:{
                width: iosWidthRatio*341,
                marginTop: iosHeightRatio*17
            }
        }),    
    },
})