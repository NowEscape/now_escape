import React, {useCallback, useState} from 'react'
import { Image, View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Platform, Modal, Pressable} from 'react-native'
import Button from '../../components/Button/button'
import Label from "../../components/Label/label";
import Rigion from "../../components/setting/Rigion/rigion";
import rigionStore from "../../store/rigionStore";
import DoorOpenSVG from "../../assets/iconDoorOpen"
import { useFonts } from 'expo-font'
import 'react-native-gesture-handler'

import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import _ from "lodash";
import {format} from "date-fns";
import searchStore from "../../store/searchStore";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function RegionSetting({navigation}) {
  const {rigion} = rigionStore();
  const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);
  const [modal, setModal] = useState(false);


  // const [fontsLoaded] = useFonts({
  //   'Pretendard' : require('now_escape/assets/fonts/Pretendard-Bold.otf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (!fontsLoaded) {
  //     return <ActivityIndicator/>;
  //   }
  // })

  return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text_1}
            >방탈출 지역을{"\n"}설정해주세요</Text>
            <Text style={styles.text_2}>선택한 지역의 방탈출을 모아 볼 수 있어요.</Text>
          </View>
          <View style={styles.secondBox}>
            <View style={styles.iconContainer}>
              <DoorOpenSVG height={iosHeightRatio*54.7}/>
            </View>
            <View style={styles.sectionBar}/>
            <Label
              height={Platform.OS==='ios'?iosHeightRatio*54:aosHeightRatio*51}
              width={Platform.OS==='ios'?iosWidthRatio*341:aosWidthRatio*328}
              type={'mainLabel'}
              text={rigion}
              open={()=>{
                setIsRigionSettingOpen((prevState => !prevState))
                setModal(true)
            }}
              arrow={true}
            />
            {/* {isRigionSettingOpen === true
                ? <Rigion isOpen={()=>setIsRigionSettingOpen((prevState => !prevState))}/>
                : null} */}
          </View>
          <View style={styles.confirmButton}>
            {rigion !== ""
                ?<Button
                    text="시작하기"
                    height={Platform.OS==='ios'?iosHeightRatio*74:aosHeightRatio*71}
                    width={Platform.OS==='ios'?iosWidthRatio*375:aosHeightRatio*360}
                    active={true}
                    onPress={()=>{{
                      navigation.navigate('Index');
                    }}}
                />
                :<Button
                    text="시작하기"
                    height={Platform.OS==='ios'?iosHeightRatio*74:aosHeightRatio*71}
                    width={Platform.OS==='ios'?iosWidthRatio*375:aosHeightRatio*360}
                />
            }
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
  )
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffffff',
    ...Platform.select({
      android:{
        width: aosWidthRatio*360,
        height: aosHeightRatio*640
      },
      ios:{
        width: iosWidthRatio*375,
        height: iosHeightRatio*812
      }
  })
  },
  textBox: {
    ...Platform.select({
      android:{
        height: aosHeightRatio*95,
        marginLeft: aosWidthRatio*21,
        marginTop: aosHeightRatio*36,
      },
      ios:{
        height: iosHeightRatio*100,
        marginLeft: iosWidthRatio*22,
        marginTop: iosHeightRatio*42,
      }
  })
  },
  text_1: {
    // fontFamily: 'Pretendard',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#000000',
    ...Platform.select({
      android:{
        fontSize: aosWidthRatio*23,
        lineHeight: aosHeightRatio*33,
        letterSpacing: 0.46,
      },
      ios:{
        fontSize: iosWidthRatio*24,
        lineHeight: iosHeightRatio*34,
        letterSpacing: 0.48,
      }
  })
  },
  text_2: {        
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#535353',
    ...Platform.select({
      android:{
        fontSize: aosWidthRatio<1?aosWidthRatio*15:14,
        lineHeight: aosHeightRatio*20,
        letterSpacing: 0.3,
        marginTop: aosHeightRatio*19
      },
      ios:{
        fontSize: iosWidthRatio<1?iosWidthRatio*16:15,
        lineHeight: iosHeightRatio*21,
        letterSpacing: 0.3,
        marginTop: iosHeightRatio*19
      }
  })
  },
  secondBox: {
    display:'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    ...Platform.select({
      android:{
        width: aosWidthRatio*360,
        marginRight: aosWidthRatio*16.6,
      },
      ios:{
        width: iosWidthRatio*375,
        marginRight: iosWidthRatio*25,
      }
    })
  },
  sectionBar: {
    display:'flex',
    backgroundColor: '#ea4b9b',
    ...Platform.select({
      android:{
        width: aosWidthRatio*326.8,
        height: aosHeightRatio*3,
        marginBottom: aosHeightRatio*38.9,
        marginTop: aosHeightRatio*-3
      },
      ios:{
        width: iosWidthRatio*340.4,
        height: iosHeightRatio*3,
        marginBottom: iosHeightRatio*40.1,
        marginTop: iosHeightRatio*-3
      }
  })
  },
  confirmButton: {
    width: '100%',
    flex: 1,
    flexDirection: 'column-reverse',
  }
})