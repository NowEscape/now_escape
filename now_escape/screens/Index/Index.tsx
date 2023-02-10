import * as React from 'react';
import {Image, View, Text, StyleSheet, Pressable, SafeAreaView, Platform, FlatList, Modal, Animated} from "react-native";
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

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Index({navigation}){
    const {date, setDateVisible, dateVisible} = dateStore();
    const {searchData} = searchStore();
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const {escapeList, getEscapeList} = escapeListStore();
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
        height:iosWidthRatio*168,
        width:iosWidthRatio*375
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
        let completed = false;
        async function getList(){
            const response = await axios.post('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList',
                {
                    region1: searchData.region1,
                    region2: searchData.region2,
                    searchWord: "",
                    genreName: "",
                    themeTime: searchData.themeTime,
                })
            if(!completed) getEscapeList(response.data);
        }
        getList();
        return()=>{
            completed = true;
        };

    }, [currentIndex, snapToOffsets, JSON.stringify(searchData)]);
    useInterval(() => {
        setCurrentIndex(prev => (prev === snapToOffsets.length - 1 ? 0 : prev + 1));
      }, 2400);


      
    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={styles.filterBar}>
                    <View style={styles.filterLabel}>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*32:aosHeightRatio*31}
                        width={Platform.OS==='ios'?iosWidthRatio*130:aosWidthRatio*125}
                        type={'mainLabel'}
                        fontSize={15}
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
                        fontSize={15}
                        bold={true}
                        text={rigion}
                        open={()=>{
                            setIsRigionSettingOpen((prevState => !prevState))
                            setModal(true)
                        }}
                        arrow={true}
                    />
                    </View>
                    <View style={styles.filterIcon}>
                        <Pressable onPress={()=>{navigation.navigate('Search')}}>
                            <SearchSvg height={iosHeightRatio*21.1}/>
                        </Pressable>
                    </View>
                </View>

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

                <View style={styles.listContainer}>
                <ListItem/>
                </View>
                
                {isRigionSettingOpen === true ? 
                <Modal 
                    visible={modal} 
                    transparent={true}
                    animationType={'slide'}
                    presentationStyle={'pageSheet'}
                    onRequestClose={()=>{
                        setModal(false)
                        setIsRigionSettingOpen((prevState => !prevState))
                    }}
                >
                    <Pressable 
                        style={{flex:1}}
                        onPress={()=>setModal(false)}
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
        justifyContent:'flex-start',
        backgroundColor: '#ffffff',
        ...Platform.select({
            android:{
                width: aosWidthRatio*360,
                paddingTop: aosHeightRatio*7,
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
        alignItems: 'center',
        ...Platform.select({
            android:{
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
                paddingRight: aosWidthRatio*20.2, 
            },
            ios:{
                paddingRight: iosWidthRatio*21, 
            }
        })
    },
    banner:{
        display:'flex',
        backgroundColor: 'rgb(255,223,232)',
        // resizeMode: 'center',
        ...Platform.select({
            android:{
                height:iosWidthRatio*162,
                width:iosWidthRatio*360               
            },
            ios:{
                height:iosHeightRatio*168,
                width:iosWidthRatio*375
            }
        })
    },
    listContainer: {
        ...Platform.select({
            android:{
                height: aosHeightRatio*394,
                width: aosWidthRatio*360,
                paddingBottom: aosHeightRatio*15         
            },
            ios:{
                height:iosHeightRatio*556,
                width:iosWidthRatio*375,
                paddingBottom: iosHeightRatio*15
            }
        })
    }
})