import * as React from 'react';
import axios from "axios";
import {useState, useRef, useEffect, useMemo} from "react";
import {Image, View, Text, StyleSheet, SafeAreaView, Platform, TextInput, ScrollView,Modal, Pressable} from "react-native";
import Label from "../../components/Label/label";
import ListItem from '../../components/ListItem/listItem';
import 'react-native-gesture-handler'
import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'
import searchStore from "../../store/searchStore";
import timeStore from "../../store/timeStore";
import dateStore from "../../store/dateStore";
import rigionStore from "../../store/rigionStore";
import genreStore from "../../store/genreStore";
import Date from "../../components/setting/Date/date";
import Time from "../../components/setting/Time/time";
import Genre from "../../components/setting/Genre/genre";
import Rigion from "../../components/setting/Rigion/rigion";

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import {format} from "date-fns";
import escapeListStore from "../../store/escapeListStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function SearchResult({navigation}){
    const {searchData, setSearchData, searchText, setSearchText} = searchStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const {rigion} = rigionStore();
    const {escapeList, getEscapeList} = escapeListStore();
    const {genre} = genreStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        let completed = false;
        async function getList(){
            const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
                {
                    region1: searchData.region1,
                    region2: searchData.region2,
                    searchWord: searchData.searchWord,
                    genreName: searchData.genreName,
                    themeTime: searchData.themeTime,
                })
            if(!completed) getEscapeList(response.data);
        }
        getList();
        return()=>{
            completed = true;
        };
    },[JSON.stringify(searchData)])

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Pressable onPress={()=>{navigation.navigate('Index')}}>
                        <View style={{marginTop: Platform.OS==='ios'?iosHeightRatio*4.5:aosHeightRatio*4.4}}><ArrowBackSVG/></View>
                    </Pressable>
                    <TextInput
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={(text)=>{setSearchText(text)}}
                    />
                    <SearchSVG height={Platform.OS==='ios'?iosHeightRatio*21.1:aosHeightRatio*20.4}/>
                </View>
                <View style={styles.sectionBar}></View>

                <View style={styles.scrollLabelContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewStyle}
                >
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*124:aosWidthRatio*120}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={13}
                        type={"mainLabel"}
                        icon={'date'}
                        text={String(format(date, 'yyyy.MM.dd'))}
                        open={()=>{setDateVisible(dateVisible)}}
                    /><Date/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*107:aosWidthRatio*103}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={13}
                        type={"mainLabel"}
                        icon={'time'}
                        text={time + ' ~'}
                        open={()=>{setTimeVisible(timeVisible)}}
                    /><Time/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*84:aosWidthRatio*81}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={13}
                        type={"mainLabel"}
                        text={genre}
                        active={isGenreSettingOpen?true:false}
                        open={()=>{
                            setIsGenreSettingOpen((prevState => !prevState))
                            {isRigionSettingOpen?setIsRigionSettingOpen(false):null}
                        }}
                    />
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*84:aosWidthRatio*81}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={13}
                        type={"mainLabel"}
                        text={rigion}
                        active={isRigionSettingOpen?true:false}
                        open={()=>{
                            setIsRigionSettingOpen((prevState => !prevState))
                            setModal(true)
                            {isGenreSettingOpen?setIsGenreSettingOpen(false):null}
                        }}
                    />
                </ScrollView>
                </View>

                <View
                    style={{
                        width:Platform.OS==='ios'?iosWidthRatio*375:aosWidthRatio*360,
                        height: Platform.OS==='ios'?iosHeightRatio*620:aosHeightRatio*501
                    }}>
                    <ListItem/>
                    
                    {isGenreSettingOpen === true ?
                        <View
                            style={{
                                position: 'absolute',
                                top: Platform.OS==='ios'?iosHeightRatio*11:aosHeightRatio*11,
                            }}
                        >
                            <Genre search={false} isOpen={()=>setIsGenreSettingOpen((prevState => !prevState))}/>
                        </View>
                        : null}
                </View>
                {isRigionSettingOpen === true ?
                    <Modal
                        visible={modal}
                        transparent={true}
                        animationType={'slide'}
                        onRequestClose={()=>{
                            setIsRigionSettingOpen(false)
                            }
                        }
                    >
                        <Pressable style={{flex:1}}
                            onPress={()=>{
                                setModal(false)
                                setIsRigionSettingOpen(false)
                            }
                        }
                        />
                        <Rigion isOpen={()=>setIsRigionSettingOpen((prevState => !prevState))}/>
                    </Modal> : null}
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
        // width: iosWidthRatio*375,
        // height: iosHeightRatio*812,
    },
    rowContainer:{
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            android:{
                width:aosWidthRatio*360,
                paddingHorizontal:aosWidthRatio*27.4,
            },
            ios:{
                width:iosWidthRatio*375,
                paddingHorizontal:iosWidthRatio*28,
            }
        })
    },
    scrollLabelContainer:{
        display:'flex',
        justifyContent: 'flex-start',
        ...Platform.select({
            android:{
                width:aosWidthRatio*360,
                height:aosHeightRatio*30,
                marginTop:aosHeightRatio*15.8,
                marginBottom: aosHeightRatio*2.3,
            },
            ios:{
                width:iosWidthRatio*375,
                height:iosHeightRatio*31,
                marginTop: iosHeightRatio*15.8,
                marginBottom: iosHeightRatio*2.3,
            }
        })
    },
    scrollViewStyle:{
        ...Platform.select({
            android:{
                marginLeft: aosWidthRatio*17, 
                paddingRight: aosWidthRatio*23,
            },
            ios:{
                marginLeft: iosWidthRatio*16, 
                paddingRight: iosWidthRatio*25,
            }
        }),
    },
    searchInput:{
        display:'flex',
        ...Platform.select({
            android:{
                width: aosWidthRatio*250,
                height: aosHeightRatio*30,
                marginLeft: aosWidthRatio*20.2,
            },
            ios:{
                width: iosWidthRatio*252.5,
                height: iosHeightRatio*30,
                marginLeft: iosWidthRatio*20,
            }
        })
    },
    sectionBar:{
        backgroundColor: "#000000",
        height: 1,
        ...Platform.select({
            android:{
                width: aosWidthRatio*289.5,
                marginTop: aosHeightRatio*8.8,
                marginLeft: aosWidthRatio*20.2,
            },
            ios:{
                width: iosWidthRatio*300,
                marginTop: iosHeightRatio*8,
                marginLeft: iosWidthRatio*25,
            }
        })
    }
})