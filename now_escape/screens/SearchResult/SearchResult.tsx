import * as React from 'react';
import axios from "axios";
import {useState, useRef, useEffect, useMemo} from "react";
import {StatusBar, Image, View, Text, StyleSheet, SafeAreaView, Platform, TextInput, ScrollView,Modal, Pressable} from "react-native";
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
import DateSetting from "../../components/setting/Date/dateSetting";
import Time from "../../components/setting/Time/time";
import Genre from "../../components/setting/Genre/genre";
import Rigion from "../../components/setting/Rigion/rigion";

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import {format} from "date-fns";
import escapeListStore from "../../store/escapeListStore";
import currentPageStore from "../../store/currentPageStore";
import _ from "lodash";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;
const statusBarHeight = StatusBar.currentHeight


export default function SearchResult({navigation}){
    const {setCurrentPage, currentPage} = currentPageStore();
    const {searchData, setSearchData, searchText, setSearchText} = searchStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible, setDate} = dateStore();
    const {rigion, setRigionList, rigionListString, rigionList, rigionName, setRigion} = rigionStore();
    const {escapeList, getEscapeList} = escapeListStore();
    const {genre} = genreStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);

    async function getList(searchData){
        const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
            {
                region1: searchData.region1,
                region2: searchData.region2==="전체"?"":searchData.region2,
                searchWord: searchData.searchWord,
                genreName: searchData.genreName==="전체장르"?"":searchData.genreName,
                themeTime: searchData.themeTime,
            })
        getEscapeList(response.data);
    }

    return(
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <View style={styles.container}>
        <View style={styles.searchContainer}>
            <Pressable 
                onPress={()=>{
                    getList({
                        region1: "서울",
                        region2: "",
                        searchWord: "",
                        genreName: "",
                        themeTime: format(new Date(), 'yyyy-MM-dd')+ ' ' + time

                    });
                    setRigion(rigionName, rigionListString, 0, 0);
                    setRigionList(rigionList, 0, 0);
                    setDate(new Date());
                    setCurrentPage("Index");
                    navigation.navigate('Index')
                }}
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
                    getList({
                        region1: _.split(rigion, ' ', 2)[0],
                        region2: _.split(rigion, ' ', 2)[1],
                        searchWord: searchText,
                        genreName: genre,
                        themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time
                    });
                    navigation.navigate('SearchResult');
                }}
                style={styles.searchIcon}
            >
                <SearchSVG height={Platform.OS=='ios'?iosHeightRatio*21.1:aosHeightRatio*20.2}/>
            </Pressable>
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
                        fontSize={Platform.OS==='ios'?iosWidthRatio*13:aosWidthRatio*12}
                        type={"mainLabel"}
                        icon={'date'}
                        text={String(format(date, 'yyyy.MM.dd'))}
                        open={()=>{setDateVisible(dateVisible)}}
                    /><DateSetting/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*107:aosWidthRatio*100}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*13:aosWidthRatio*12}
                        type={"mainLabel"}
                        icon={'time'}
                        text={time + ' ~'}
                        open={()=>{setTimeVisible(timeVisible)}}
                    /><Time/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*84:aosWidthRatio*81}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*13:aosWidthRatio*12}
                        type={"mainLabel"}
                        text={rigion}
                        active={isRigionSettingOpen?true:false}
                        open={()=>{
                            setIsRigionSettingOpen((prevState => !prevState))
                            setModal(true)
                            {isGenreSettingOpen?setIsGenreSettingOpen(false):null}
                        }}
                    />                    
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*31:aosHeightRatio*30}
                        width={Platform.OS==='ios'?iosWidthRatio*84:aosWidthRatio*81}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*5:aosWidthRatio*5}
                        fontSize={Platform.OS==='ios'?iosWidthRatio*13:aosWidthRatio*12}
                        type={"mainLabel"}
                        text={genre}
                        active={isGenreSettingOpen?true:false}
                        open={()=>{
                            setIsGenreSettingOpen((prevState => !prevState))
                            {isRigionSettingOpen?setIsRigionSettingOpen(false):null}
                        }}
                    />
                </ScrollView>
                </View>

                <View
                    style={{
                        width:Platform.OS==='ios'?iosWidthRatio*375:aosWidthRatio*360,
                        height: Platform.OS==='ios'?iosHeightRatio*620:aosHeightRatio*501
                    }}>
                    <ListItem scrollEnabled/>
                    
                    {isGenreSettingOpen === true ?
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                            }}
                        >
                            <Genre search={false} isOpen={()=>setIsGenreSettingOpen((prevState => !prevState))}/>
                        </View>
                        : null}
                </View>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        ...Platform.select({
            android:{
                paddingTop: statusBarHeight,

            },
            ios:{

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

})