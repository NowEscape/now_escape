import React, {useCallback, useState} from 'react'
import { Image, View, Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native'
import Button from '../../components/Button/button'
import Label from "../../components/Label/label";
import Rigion from "../../components/setting/Rigion/rigion";
import rigionStore from "../../store/rigionStore";
import { useFonts } from 'expo-font'


export default function RegionSetting() {
  const {rigion} = rigionStore();
  const [isRigionSettingOpen, setIsRigionSettingOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    'Pretendard' : require('now_escape/assets/fonts/Pretendard-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (!fontsLoaded) {
      return <ActivityIndicator/>;
    }
  })

  return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text_1}
            >방탈출 지역을{"\n"}설정해주세요</Text>
            <Text style={styles.text_2}>선택한 지역의 방탈출을 모아 볼 수 있어요.</Text>
          </View>
          <View style={styles.secondBox}>
            <Image style={styles.doorOpenImage}
                   source= {require('now_escape/assets/img_door_open.png')}/>
            <View style={styles.sectionBar}/>
            <Label
                height={54}
                width={341}
                borderRadius={16}
                type={'mainLabel'}
                text={rigion}
                open={()=>setIsRigionSettingOpen((prevState => !prevState))}
            />
            {isRigionSettingOpen === true ? <Rigion/> : null}
          </View>
          <View style={styles.confirmButton}>
            {rigion !== ""
                ?<Button
                    text="시작하기"
                    height={74}
                    width={375}
                    active={true}
                />
                :<Button
                    text="시작하기"
                    height={74}
                    width={375}
                />
            }
          </View>
        </View>
      </SafeAreaView>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal:17
  },
  textBox: {
    width: '100%',
    height: '15%',
    marginLeft: 22,
    marginTop: 42,
  },
  text_1: {
    width: '100%',
    height: '80%',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 34,
    letterSpacing: 0.48,
    textAlign: 'left',
    color: '#000000',
    marginLeft:5
  },
  text_2: {        
    width: '100%',
    height: '20%',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#535353',
    marginLeft:5
  },
  secondBox: {
    display:'flex',
    alignItems: 'center',
  },
  doorOpenImage: {
    marginLeft: '69%'
  },
  sectionBar: {
    display:'flex',
    alignItems:"center",
    justifyContent:"space-around",
    width: 341.,
    height: 3,
    marginTop: '-1%',
    backgroundColor: '#ea4b9b',
    marginBottom: 40
  },
  confirmButton: {
    width: '100%',
    flex: 1,
    flexDirection: 'column-reverse'
  }
})