import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Platform, TextInput, Text, Modal, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useEffect, useState} from "react";
import _ from "lodash";
import {format} from 'date-fns';
import Label from "../../components/Label/label";
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

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Search({navigation}){
    const {searchData, setSearchData, searchText, setSearchText} = searchStore();
    const {getEscapeList} = escapeListStore();
    const {genre} = genreStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const {rigion} = rigionStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Pressable onPress={()=>{navigation.navigate('Index')}}>
                        <View style={{marginTop: iosHeightRatio*4.5}}><ArrowBackSVG/></View>
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
                    >
                        <SearchSVG height={Platform.OS=='ios'?iosHeightRatio*21.1:aosHeightRatio*100000}/>
                    </Pressable>
                </View>
                <View style={styles.sectionBar}></View>

                <View style={{marginTop: iosHeightRatio*20}}>
                    <Label
                        height={iosHeightRatio*49}
                        width={iosWidthRatio*341}
                        borderRadius={10}
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
                <View style={{marginTop: iosHeightRatio*14}}>
                    <Label
                        height={iosHeightRatio*49}
                        width={iosWidthRatio*341}
                        borderRadius={10}
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
                        height={iosHeightRatio*49}
                        width={iosWidthRatio*165}
                        borderRadius={10}
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
                        height={iosHeightRatio*49}
                        width={iosWidthRatio*165}
                        borderRadius={10}
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
                <View style={{marginTop: 11, height: iosHeightRatio*50}}>
                    {isGenreSettingOpen === true?
                    <Genre
                        search={true}
                        isOpen={()=>setIsGenreSettingOpen((prevState => !prevState))}
                        />
                        : null
                    }
                    {isRigionSettingOpen === true ?
                        <Modal
                            visible={modal}
                            transparent={true}
                            animationType={'slide'}
                            presentationStyle={'pageSheet'}
                            onRequestClose={()=>{
                                setModal(false)
                                setIsRigionSettingOpen((false))
                            }}
                        >
                            <Pressable
                                style={{flex:1}}
                                onPress={()=> {
                                    setModal(false)
                                    setIsRigionSettingOpen(false)
                                }}
                            />
                            <Rigion isOpen={()=>setIsRigionSettingOpen((prevState => !prevState))}/>
                        </Modal>
                        : null
                    }
                </View>

                <View style={{ flex: 1}}/>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }}>
                    <Button
                        text={'검색'}
                        active={true}
                        rounded={true}
                        canceled={false}
                        height={iosHeightRatio*63}
                        width={iosHeightRatio*341}
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
        overflow: 'scroll',
        ...Platform.select({
            android:{
                paddingTop: aosHeightRatio*10,

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
                marginLeft: aosWidthRatio*20,
                marginRight: aosWidthRatio*20, 
            },
            ios:{
                width: iosWidthRatio*250,
                height: iosHeightRatio*30,
                marginLeft: iosWidthRatio*25,
                marginRight: iosWidthRatio*15,
            }
        })
    },
    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionBar: {
        backgroundColor: "#000000",
        alignSelf: 'flex-start',
        ...Platform.select({
            android:{
                width: aosWidthRatio*288,
                height: 1,
                marginTop: aosHeightRatio*8.7,
                marginLeft: aosWidthRatio*55.4,                
            },
            ios:{
                width: iosWidthRatio*300,
                height: 1,
                marginTop: iosHeightRatio*9.1,
                marginLeft: iosWidthRatio*57.7,
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