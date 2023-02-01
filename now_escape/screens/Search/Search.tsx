import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Platform, TextInput, Text, Modal, Pressable} from "react-native";
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
import rigionStore from "../../store/rigionStore";
import Rigion from "../../components/setting/Rigion/rigion";
import 'react-native-gesture-handler'

import ArrowBackSVG from '../../assets/iconArrowBack'
import SearchSVG from '../../assets/iconSearchPink'

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Search({navigation}){
    const {searchText, setSearchText} = searchStore();
    const {genre} = genreStore();
    const {time, setTimeVisible, timeVisible} = timeStore();
    const {date, setDateVisible, dateVisible} = dateStore();
    const {rigion} = rigionStore();
    const [isGenreSettingOpen, setIsGenreSettingOpen] = useState(false);
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const [modal, setModal] = useState(false);


    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Pressable onPress={()=>{navigation.navigate('Index')}}>
                        <View style={{marginTop: iosHeightRatio*4.5}}><ArrowBackSVG/></View>
                    </Pressable>
                    <TextInput
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={(text)=>{setSearchText(text)}}
                    />
                    <SearchSVG height={Platform.OS=='ios'?iosHeightRatio*21.1:aosHeightRatio*100000}/>
                </View>
                <View style={styles.sectionBar}></View>

                <View style={{marginTop: iosHeightRatio*20}}>
                    <Label
                        height={iosHeightRatio*49}
                        width={iosWidthRatio*341}
                        borderRadius={10}
                        type={"searchLabel"}
                        icon={'date'}
                        text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                        open={()=>{setDateVisible(dateVisible)}}
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
                        open={()=>{setTimeVisible(timeVisible)}}
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
                        open={()=>{
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
                        open={()=>{
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
                                setIsRigionSettingOpen((prevState => !prevState))
                            }}
                        >
                            <Pressable
                                style={{flex:1}}
                                onPress={()=>setModal(false)}
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
                        onPress={()=>{navigation.navigate('SearchResult')}}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection:'column',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        ...Platform.select({
            android:{},
            ios:{
                paddingTop: iosHeightRatio*10,
            }
        })
    },
    searchInput:{
        display:'flex',
        ...Platform.select({
            android:{
                
            },
            ios:{
                width: iosWidthRatio*250,
                height: iosHeightRatio*30,
                marginLeft: iosWidthRatio*20,
                marginRight: iosWidthRatio*20,
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
            android:{},
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
            android:{},
            ios:{
                width: iosWidthRatio*341,
                marginTop: iosHeightRatio*17
            }
        }),    
    },
})