import * as React from 'react';
import {Image, View, Text, StyleSheet, Pressable, SafeAreaView, Platform, FlatList, Modal, Animated, StatusBar} from "react-native";
import axios from "axios";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";
import SearchSvg from '../../assets/iconSearchBlack'
import Date from "../../components/setting/Date/date";
import dateStore from "../../store/dateStore";
import rigionStore from "../../store/rigionStore";
import Rigion from "../../components/setting/Rigion/rigion";
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
    const {date, setDateVisible, dateVisible} = dateStore();
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const swiperRef = useRef<HTMLDivElement>(null);
    const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(false);
    const [loop, setLoop] = useState<any>();
    const {rigion} = rigionStore();
    const [modal, setModal] = useState(false);
    const scrollX = React.useRef(new Animated.Value(0)).current;

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


      
    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={styles.filterBar}>
                    <View style={styles.filterLabel}>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*32:aosHeightRatio*31}
                        width={Platform.OS==='ios'?iosWidthRatio*130:aosWidthRatio*125}
                        type={'mainLabel'}
                        bold={true}
                        marginRight={Platform.OS==='ios'?iosWidthRatio*10:aosWidthRatio*10}
                        text={ String(format(date, 'yyyy.MM.dd'))}
                        open={()=>{setDateVisible(dateVisible)}}
                        arrow={true}
                    /><Date/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*32:aosHeightRatio*31}
                        width={Platform.OS==='ios'?iosWidthRatio*115:aosWidthRatio*110}                    
                        type={'mainLabel'}
                        bold={true}
                        text={rigion}
                        open={()=>{
                            setIsRigionSettingOpen((prevState => !prevState))
                            setModal(true)
                        }}
                        arrow={true}
                    />
                    </View>
                    <Pressable 
                        onPress={()=>{navigation.navigate('Search')}}
                        style={styles.filterIcon}
                    >
                        <SearchSvg
                            onPress={()=>{navigation.navigate('Search')}}
                            height={Platform.OS==='ios'?iosHeightRatio*21.1:aosHeightRatio*20.2}/>
                    </Pressable>
                </View>

                <ScrollView style={styles.listContainer}>
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
                    <ListItem/>
                </ScrollView>
                
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
    }
})