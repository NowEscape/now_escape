import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {Image, Text, View, StyleSheet, FlatList, Platform, Modal, Pressable} from 'react-native';
import escapeListStore from "../../store/escapeListStore";
import _ from "lodash";
import LocationSVG from '../../assets/iconLocation'
import ListItemDetail from "../ListItemDetail/listItemDetail";
import * as Font from 'expo-font'

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

import searchStore from "../../store/searchStore";
import axios from "axios";
import currentPageStore from "../../store/currentPageStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

const RenderEscapeListItem = ({cafeName, theme, themeDateList, setModal, onPress}) => {
    return(
        <Fragment>
            <Pressable
                onPress={()=>{
                    setModal(true)
                    onPress()
                }}
            >
                <View style={styles.itemContainer}>
                    <Image style={styles.poster} source={{uri:theme.themeImageUrl}}/>
                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>{theme.themeName}</Text>
                        <View style={styles.locationBox}>
                            <LocationSVG height={aosHeightRatio*12.1}/>
                            <Text style={styles.textLocation}>{cafeName}</Text>
                        </View>
                        <View style={styles.timeList}>
                            {themeDateList.length == 2 ?
                                <FlatList
                                    key={0}
                                    data={themeDateList}
                                    renderItem={({index})=><RenderTimeList
                                        themeDateListItem = {themeDateList[index]}
                                    />}
                                    keyExtractor={(item) => item.themeDateId}
                                    numColumns={1}
                                /> :
                                <FlatList
                                    key={1}
                                    data={themeDateList}
                                    renderItem={({index})=><RenderTimeList
                                        themeDateListItem = {themeDateList[index]}
                                    />}
                                    keyExtractor={(item) => item.themeDateId}
                                    numColumns={4}
                                />
                            }
                        </View>
                    </View>
                </View>
            </Pressable>
        <View style={styles.sectionBar}/>
        </Fragment>
    );
}

const RenderTimeList = ({themeDateListItem}) => {
    return(
        <View>
            {
                themeDateListItem.isOpen ?
                    <Text style={styles.timeListItem}>{_.split(themeDateListItem.themeTime, ' ', 2)[1]}</Text>:
                    null
            }
        </View>
    );
}

export default function ListItem(props) {
    const {currentPage} = currentPageStore();
    const {scrollEnabled} = props;
    const {escapeList, getEscapeList,isEscapeListNull,setIsEscapeListNull} = escapeListStore();
    const {searchData} = searchStore();
    const [modal, setModal] = useState(false);
    const [escapeID, setEscapeID] = useState(0);
    const [isRefreshing,setIsRefreshing] = useState(false);
    const [isFont, setIsFont] = useState(false);

    useEffect(() => {
      Font.loadAsync({
        "Pretendard": require('../../assets/fonts/Pretendard-Bold.otf'),
        "Pretendard-Medium": require('../../assets/fonts/Pretendard-Medium.otf'),
        "Pretendard-Regular": require('../../assets/fonts/Pretendard-Regular.otf'),
      }).then(() => setIsFont(true));
    },[])

    async function getList(searchData){
        setIsRefreshing(true)
        if(currentPage==="index"){
            searchData.genreName="";
            searchData.searchWord="";
        }
        const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
            {
                region1: searchData.region1,
                region2: searchData.region2==="전체"?"":searchData.region2,
                searchWord: searchData.searchWord,
                genreName: searchData.genreName==="전체장르"?"":searchData.genreName,
                themeTime: searchData.themeTime,
            })
        if(response.data.length === 0){
            setIsEscapeListNull(true);
        }else{
            setIsEscapeListNull(false);
        }
        getEscapeList(response.data);
        setIsRefreshing(false);
    }

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={escapeList}
                refreshing={isRefreshing}
                onRefresh={()=>getList(searchData)}
                renderItem={({item, index})=><RenderEscapeListItem
                    cafeName={item.cafeName}
                    theme={item.theme}
                    themeDateList={item.themeDateList}
                    setModal={()=>setModal(true)}
                    onPress={()=>setEscapeID(index)}
                />}
                scrollEnabled={scrollEnabled}
            />
            <Modal
                visible={modal}
                transparent={true}
                animationType={'fade'}
                onRequestClose={()=>{
                    setModal(false)
                }}
            >
                <View style={{
                    flex: 1,
                    display: 'flex',
                    backgroundColor: "rgba(0, 0, 0, 0.55)"}}
                >
                
                <Pressable 
                    style={{flex:1}}
                    onPress={()=>setModal(false)}
                />                
                <ListItemDetail escapeID={escapeID}/>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        ...Platform.select({
            android:{
                width: aosWidthRatio*360,
                marginTop: aosHeightRatio*7
            },
            ios:{
                width: iosWidthRatio*375,
                marginTop: iosHeightRatio*3.7
            }
        }),
    },
    itemContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        ...Platform.select({
            android:{
                width: aosWidthRatio*326.8,
                height: aosHeightRatio*147,
                paddingLeft: aosWidthRatio*4.4,
                paddingTop: aosHeightRatio*14.6,
                paddingBottom: aosHeightRatio*15.3,
            },
            ios:{
                width: iosWidthRatio*340.4,
                height: iosHeightRatio*160,
                paddingLeft: iosWidthRatio*4.7,
                paddingTop: iosHeightRatio*15.3,
                paddingBottom: iosHeightRatio*15.9,
            }
        }),
    },
    poster: {
        borderRadius: 6,
        backgroundColor: 'rgb(216, 216, 216)',
        ...Platform.select({
            android:{
                width: aosWidthRatio*87,
                height: aosWidthRatio*117,
            },
            ios:{
                width: iosWidthRatio*91,
                height: iosWidthRatio*122,
            }
        }),
    },
    textBox: {
        display: 'flex',
        flexDirection: 'column',
        ...Platform.select({
            android:{
                paddingTop: aosHeightRatio*12,
                marginLeft: aosWidthRatio*26.2,
            },
            ios:{
                paddingTop: iosHeightRatio*12.5,
                marginLeft: iosWidthRatio*26.8,
            }
        }),
    },
    locationBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*6.8,
                height: aosWidthRatio<1?aosWidthRatio*14:13,

            },
            ios:{
                marginTop: iosHeightRatio*5.8,
            }
        }),
    },
    textLocation:{
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1?aosWidthRatio*14:13,
                lineHeight: aosWidthRatio<1?aosWidthRatio*14:13,                
                letterSpacing: aosWidthRatio*0.26,
                marginLeft: aosWidthRatio*5.1,
            },
            ios:{
                fontSize: iosWidthRatio<1?iosWidthRatio*15:14,
                letterSpacing: iosWidthRatio*0.28,
                marginLeft: iosWidthRatio*5.3,
            }
        }),
    },
    timeList: {
        display: 'flex',
        flexDirection: 'column',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*12.8,
            },
            ios:{
                marginTop: iosHeightRatio*17.1,
            }
        }),
    },
    // text: {
        textTitle: {
            fontFamily: 'Pretendard',
            textAlign: 'left',
            color: 'black',
            ...Platform.select({
                android:{
                    fontSize: aosWidthRatio<1?aosWidthRatio*17.5:17,
                    lineHeight: 18,
                    letterSpacing: 0.68, 
                },
                ios:{
                    fontSize: iosWidthRatio<1?iosWidthRatio*18.5:18,
                    lineHeight: 19,
                    letterSpacing: 0.72,
                }
            }),
        },
        timeListItem: {
            fontFamily: 'Pretendard-Medium',
            display:'flex',
            flexDirection: 'row',
            backgroundColor: 'rgba(234, 75, 155, 0.13)',
            textAlign: 'center',
            color: 'black',
            overflow: 'hidden',
            ...Platform.select({
                android:{
                    width: aosWidthRatio*40.7,
                    height: aosHeightRatio*17.3,
                    borderRadius: aosWidthRatio*8.7,
                    fontSize: aosWidthRatio*11,
                    paddingTop: aosHeightRatio*1.7,
                    letterSpacing: 0.22,
                    marginBottom: aosHeightRatio*5.4,
                    marginRight:aosWidthRatio*5.8,
                },
                ios:{
                    width: iosWidthRatio*42.4,
                    height: iosHeightRatio*18,
                    borderRadius: iosWidthRatio*9,
                    fontSize: iosWidthRatio*12,
                    paddingTop: iosWidthRatio*1.8,
                    letterSpacing: 0.24,
                    marginBottom: iosHeightRatio*5.6,
                    marginRight:iosWidthRatio*6.1,
                }
            }),
        },
        sectionBar: {
            backgroundColor: "#e9e9e9",
            ...Platform.select({
                android:{
                    width: aosWidthRatio*326.8,
                    height: aosHeightRatio*1.5,
                },
                ios:{
                    width: iosWidthRatio*340.4,
                    height: iosHeightRatio*1.5,
                }
            }),
        }
    // }
})