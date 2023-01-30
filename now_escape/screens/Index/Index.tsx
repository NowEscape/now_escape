import * as React from 'react';
import {Image, View, Text, StyleSheet, Pressable, SafeAreaView, Platform, FlatList, Modal} from "react-native";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";
import SearchSvg from '../../assets/iconSearchBlack'
import Date from "../../components/setting/Date/date";
import dateStore from "../../store/dateStore";
import rigionStore from "../../store/rigionStore";
import Rigion from "../../components/setting/Rigion/rigion";
import 'react-native-gesture-handler'
import {useState} from "react";

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function Index({navigation}){
    const {date, setDateVisible, dateVisible} = dateStore();
    const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
    const {rigion} = rigionStore();
    const [modal, setModal] = useState(false);

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
                        marginRight={Platform.OS==='ios'?iosWidthRatio*10:aosWidthRatio*10}
                        text={ String(date.getFullYear() + '.' + date.getMonth() + 1 + '.'+ date.getDate())}
                        open={()=>{setDateVisible(dateVisible)}}
                        arrow={true}
                    /><Date/>
                    <Label
                        height={Platform.OS==='ios'?iosHeightRatio*32:aosHeightRatio*31}
                        width={Platform.OS==='ios'?iosWidthRatio*115:aosWidthRatio*110}                    
                        type={'mainLabel'}
                        fontSize={15}
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
                <View style={styles.banner}>{""}</View>
                <ListItem/>
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
        ...Platform.select({
            android:{
                height:iosWidthRatio*162,
                width:iosWidthRatio*360               
            },
            ios:{
                height:iosWidthRatio*168,
                width:iosWidthRatio*375
            }
        })
    }

})