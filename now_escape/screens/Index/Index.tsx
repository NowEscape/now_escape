import * as React from 'react';
import {Image, View, Text,RefreshControl, StyleSheet, Pressable, SafeAreaView, Platform, FlatList, Modal, Animated, StatusBar} from "react-native";
import axios from "axios";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";
import SearchSvg from '../../assets/iconSearchBlack'
import DateSetting from "../../components/setting/Date/dateSetting";
import dateStore from "../../store/dateStore";
import regionStore from "../../store/regionStore";
import genreStore from "../../store/genreStore";
import timeStore from "../../store/timeStore";
import Region from "../../components/setting/Region/region";
import useInterval from './useInterval';
import 'react-native-gesture-handler'
import {useState, useRef, useEffect, useMemo} from "react";


import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import {format} from "date-fns";
import searchStore from "../../store/searchStore";
import escapeListStore from "../../store/escapeListStore";
import { ScrollView } from 'react-native-gesture-handler';
import currentPageStore from "../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;
const statusBarHeight = StatusBar.currentHeight

export default function Index({navigation}){
    const {date, setDateVisible, dateVisible, setDate} = dateStore();
    const {setSearchText, searchData} = searchStore();
    const {setGenreValue, setGenreList, genreList, genreListName, genre} = genreStore();
    const {setTime} = timeStore();
    const {region, setRegion, setRegionList, regionList, regionListString, regionName} = regionStore();
    const [isRegionSettingOpen, setIsRegionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [isRefreshing,setIsRefreshing] = useState(false);
    const {getEscapeList,isEscapeListNull,setIsEscapeListNull} = escapeListStore();
    const nullTextContent = "조건에 맞는 예약 가능한\n방탈출이 없습니다.";

    async function getList(searchData){
        setIsRefreshing(true)
        try{
            const response = await axios.post('https://www.now-escape.kro.kr/openTimeThemeList',
                {
                    region1: searchData.region1,
                    region2: searchData.region2==="전체"?"":searchData.region2,
                    searchWord: "",
                    genreName: "",
                    themeTime: searchData.themeTime,
                })
            if(response.data.length === 0){
                setIsEscapeListNull(true);
            }else{
                setIsEscapeListNull(false);
            }
            getEscapeList(response.data);
            setIsRefreshing(false);
        } catch(err){
            console.log('err', err);
        }
    }

    const data = [
        {
            key: '1',
            image: require("../../assets/banner1.png"),
        },
        {
            key: '2',
            image: require("../../assets/banner2.png"),
        },
        {
            key: '3',
            image: require("../../assets/banner3.png"),
        },         
    ];

    const renderItem = ({item}) => <Image source={item.image} style={{
        ...Platform.select({
            android:{
                height:aosWidthRatio*162,
                width:aosWidthRatio*360
            },
            ios:{
                height:iosWidthRatio*168,
                width:iosWidthRatio*375
            }
        })
    }}
    />

    const offset = (iosWidthRatio*375)
    const snapToOffsets = useMemo(() => Array.from(Array(data.length)).map((_, index) => index * offset),
    [data],
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
      if (currentIndex !== snapToOffsets.length) {
        flatListRef.current?.scrollToOffset({
          animated: true,
          offset: snapToOffsets[currentIndex],
        });
      }

    }, [currentIndex, snapToOffsets]);
    useInterval(() => {
        setCurrentIndex(prev => (prev === snapToOffsets.length - 1 ? 0 : prev + 1));
      }, 5000);


    if (Platform.OS === 'ios') {
        return(
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <View style={styles.filterBar}>
                        <View style={styles.filterLabel}>
                        <Label
                            height={iosHeightRatio*32}
                            width={iosWidthRatio*130}
                            type={'mainLabel'}
                            bold={true}
                            marginRight={iosWidthRatio*10}
                            text={ String(format(date, 'yyyy.MM.dd'))}
                            open={()=>{setDateVisible(dateVisible)}}
                            arrow={true}
                        /><DateSetting/>
                        <Label
                            height={iosHeightRatio*32}
                            width={iosWidthRatio*115}                    
                            type={'mainLabel'}
                            bold={true}
                            text={region}
                            open={()=>{
                                setIsRegionSettingOpen((prevState => !prevState))
                                setModal(true)
                            }}
                            arrow={true}
                        />
                        </View>
                        <Pressable
                            onPress={()=>{
                                setSearchText("");
                                setTime("09:00");
                                setRegion(regionName, regionListString, 0, 0);
                                setRegionList(regionList, 0, 0);
                                setDate(new Date());
                                setGenreList(genreList, 0);
                                setGenreValue(genreListName, 0);
                                navigation.navigate('Search');
                            }}
                            style={styles.filterIcon}>
                            <SearchSvg height={iosHeightRatio*21.1}/>
                        </Pressable>
                    </View>
    
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={()=>{getList(searchData)}} />}
                        style={styles.listContainer}>
                        <View style={styles.banner}>         
                            <Animated.FlatList
                                key={4}
                                ref={flatListRef}
                                horizontal
                                renderItem={renderItem}
                                data={data}
                                keyExtractor={item => item.key}
                                snapToOffsets={snapToOffsets}
                                decelerationRate={'fast'}
                                scrollEnabled={true}
                                contentContainerStyle={{width:(iosWidthRatio*375)*3, height:iosHeightRatio*168}}
                                showsHorizontalScrollIndicator={false}
                            >
                            </Animated.FlatList>
                        </View>
                        {
                            isEscapeListNull?
                                <Text style={styles.nullText}>{nullTextContent}</Text>
                                :
                                <ListItem/>
                        }
                    </ScrollView>
                    
            {isRegionSettingOpen === true ?
                <Modal 
                  visible={isRegionSettingOpen}
                  transparent
                  animationType={'slide'}
                  onRequestClose={()=>{
                      setIsRegionSettingOpen((prevState => !prevState))
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
                          setIsRegionSettingOpen((prevState => !prevState))
                        }
                    />
                    <Region isOpen={()=>setIsRegionSettingOpen((prevState => !prevState))}/>
                  </View>
                </Modal>
              : null}
                </View>
            </SafeAreaView>
        );
    }
    else {
        return(
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <View style={styles.filterBar}>
                        <View style={styles.filterLabel}>
                        <Label
                            height={aosHeightRatio*31}
                            width={aosWidthRatio*125}
                            fontSize={aosWidthRatio<=1?aosWidthRatio*14:aosWidthRatio*12.5}
                            type={'mainLabel'}
                            bold={true}
                            marginRight={aosWidthRatio*10}
                            text={ String(format(date, 'yyyy.MM.dd'))}
                            open={()=>{setDateVisible(dateVisible)}}
                            arrow={true}
                        /><DateSetting/>
                        <Label
                            height={aosHeightRatio*31}
                            width={aosWidthRatio*110}       
                            fontSize={aosWidthRatio<=1?aosWidthRatio*14:aosWidthRatio*12.5}
                            type={'mainLabel'}
                            bold={true}
                            text={region}
                            open={()=>{
                                setIsRegionSettingOpen((prevState => !prevState))
                                setModal(true)
                            }}
                            arrow={true}
                        />
                        </View>
                        <Pressable
                            onPress={()=>{
                                setSearchText("");
                                setTime("09:00");
                                setRegion(regionName, regionListString, 0, 0);
                                setRegionList(regionList, 0, 0);
                                setDate(new Date());
                                setGenreList(genreList, 0);
                                setGenreValue(genreListName, 0);
                                navigation.navigate('Search');
                            }}
                            style={styles.filterIcon}>
                            <SearchSvg height={aosHeightRatio*20.2}/>
                        </Pressable>
                    </View>
    
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={()=>{getList(searchData)}} />}
                        style={styles.listContainer}>
                        <View style={styles.banner}>         
                            <Animated.FlatList
                                key={4}
                                ref={flatListRef}
                                horizontal
                                renderItem={renderItem}
                                data={data}
                                keyExtractor={item => item.key}
                                snapToOffsets={snapToOffsets}
                                decelerationRate={'fast'}
                                scrollEnabled={true}
                                contentContainerStyle={{width:(aosWidthRatio*375)*3, height:aosHeightRatio*168}}
                                showsHorizontalScrollIndicator={false}
                            >
                            </Animated.FlatList>
                        </View>
                        {
                            isEscapeListNull?
                                <Text style={styles.nullText}>{nullTextContent}</Text>
                                :
                                <ListItem/>
                        }
                    </ScrollView>
                    
            {isRegionSettingOpen === true ?
                <Modal 
                  visible={isRegionSettingOpen}
                  transparent
                  animationType={'slide'}
                  onRequestClose={()=>{
                      setIsRegionSettingOpen((prevState => !prevState))
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
                          setIsRegionSettingOpen((prevState => !prevState))
                        }
                    />
                    <Region isOpen={()=>setIsRegionSettingOpen((prevState => !prevState))}/>
                  </View>
                </Modal>
              : null}
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: '#ffffff',
        ...Platform.select({
            android:{
                paddingTop: statusBarHeight,
                width: aosWidthRatio*360,
                height: aosHeightRatio*640
        
            },
            ios:{
                width: iosWidthRatio*375,
                paddingTop: iosHeightRatio*15,
            }
        })
    },
    filterBar:{
        display:'flex',
        flexDirection:'row',
        alignItems: 'flex-start',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*7,
                paddingBottom: aosHeightRatio*12,
                paddingLeft: aosWidthRatio*16
            },
            ios:{
                paddingBottom: iosHeightRatio*13,
                paddingLeft:iosWidthRatio*17
            }
        })
    },
    filterLabel:{
        flexDirection:'row',
        flex: 1, 
        justifyContent: 'flex-start', 
    },
    filterIcon: {
        display: 'flex', 
        justifyContent: 'center',
        ...Platform.select({
            android:{
                paddingRight: aosWidthRatio*22.2, 
                paddingBottom: aosHeightRatio*3.6,
                paddingTop: aosHeightRatio*7.1,
                paddingLeft: aosWidthRatio*56.6,
            },
            ios:{
                paddingRight: iosWidthRatio*21, 
                paddingBottom: iosHeightRatio*3.8,
                paddingTop: iosHeightRatio*7.1,
                paddingLeft: iosWidthRatio*58,
            }
        })
    },
    banner:{
        display:'flex',
        backgroundColor: 'rgb(255,223,232)',
        // resizeMode: 'center',
        ...Platform.select({
            android:{
                height:aosWidthRatio*162,
                width:aosWidthRatio*360               
            },
            ios:{
                height:iosHeightRatio*168,
                width:iosWidthRatio*375
            }
        })
    },
    listContainer: {
        alignContent: 'stretch',
        ...Platform.select({
            android:{
                height: aosHeightRatio*556,
                width: aosWidthRatio*360,
            },
            ios:{
                height:iosHeightRatio*556,
                width:iosWidthRatio*375,
                paddingBottom: iosHeightRatio*15
            }
        })
    },
    nullText:{
        textAlign: 'center',
        color: 'rgb(147,147,147)',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1?aosWidthRatio*17.5:aosWidthRatio*15,
                lineHeight: aosHeightRatio*27,
                letterSpacing: aosWidthRatio*0.3,
                marginTop: aosHeightRatio*133
            },
            ios:{
                fontSize: iosWidthRatio<1?iosWidthRatio*18.5:iosWidthRatio*18,
                lineHeight: iosHeightRatio*27,
                letterSpacing: iosWidthRatio*0.32,
                marginTop: iosHeightRatio*190
            }
        }),
    }
})