import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {Image, Text, View, StyleSheet, FlatList, Platform, Modal, Pressable} from 'react-native';
import escapeListStore from "../../store/escapeListStore";
import _ from "lodash";
import LocationSVG from '../../assets/iconLocation'

import ListItemDetail from "../ListItemDetail/listItemDetail";

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

import axios from "axios";
import searchStore from "../../store/searchStore";

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
                            <LocationSVG/>
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

export default function ListItem({page}) {
    const {escapeList, getEscapeList} = escapeListStore();
    const {searchData} = searchStore();
    const [modal, setModal] = useState(false);
    const [escapeID, setEscapeID] = useState(0);

    useEffect(()=>{
        let completed = false;
        async function getList(){
            if(page==='searchResult'){
                const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
                    {
                        region1: searchData.region1,
                        region2: searchData.region2,
                        searchWord: searchData.searchWord,
                        genreName: searchData.genreName,
                        themeTime: searchData.themeTime,
                    })
                if(!completed) getEscapeList(response.data);
            }else{
                const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',{
                    region1: searchData.region1,
                    region2: searchData.region2,
                    themeTime: searchData.themeTime,
                })
                if(!completed) getEscapeList(response.data);
            }
        }
        getList();
        return()=>{
            completed = true;
        };
    },[JSON.stringify(searchData)])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={escapeList}
                renderItem={({item, index})=><RenderEscapeListItem
                    cafeName={item.cafeName}
                    theme={item.theme}
                    themeDateList={item.themeDateList}
                    setModal={()=>setModal(true)}
                    onPress={()=>setEscapeID(index)}
                />}
            />
            <Modal
                visible={modal}
                transparent={true}
                animationType={'slide'}
                // presentationStyle={'pageSheet'}
                onRequestClose={()=>{
                    setModal(false)
                }}
            >
                <Pressable 
                    style={{flex:1}}
                    onPress={()=>setModal(false)}
                />                
                <ListItemDetail escapeID={escapeID}/>
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
                height: aosHeightRatio*147.1,
                paddingLeft: aosWidthRatio*4.4,
                paddingTop: aosHeightRatio*14.6,
                paddingBottom: aosHeightRatio*15.3,
            },
            ios:{
                width: iosWidthRatio*340.4,
                height: iosHeightRatio*153.3,
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
            },
            ios:{
                marginTop: iosHeightRatio*5.8,
            }
        }),
    },
    timeList: {
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*16.4,
            },
            ios:{
                marginTop: iosHeightRatio*17.1,
            }
        }),
    },
    // text: {
        textTitle: {
            fontWeight: 'bold',
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
        textLocation:{
            textAlign: 'left',
            ...Platform.select({
                android:{
                    fontSize: aosWidthRatio<1?aosWidthRatio*14:13,
                    letterSpacing: 0.26,
                    marginLeft: aosWidthRatio*5.1,
                },
                ios:{
                    fontSize: iosWidthRatio<1?iosWidthRatio*15:14,
                    letterSpacing: 0.28,
                    marginLeft: iosWidthRatio*5.3,
                }
            }),
        },
        timeListItem: {
            display:'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(234, 75, 155, 0.13)',
            textAlign: 'center',
            color: 'black',
            overflow: 'hidden',
            ...Platform.select({
                android:{
                    width: aosWidthRatio*40.7,
                    height: aosHeightRatio*17.3,
                    borderRadius: 8.7,
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