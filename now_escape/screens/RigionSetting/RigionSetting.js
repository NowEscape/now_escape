import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import Button from '../../components/Button/button'

export default class RegionSetting extends React.Component  {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text_1}        
        >방탈출 지역을{"\n"}설정해주세요</Text>
        <Text style={styles.text_2}        
        >선택한 지역의 방탈출을 모아 볼 수 있어요.</Text>
        <View style={styles.sectionBar}/>
        <Image style={styles.doorOpenImage}
          source= {require('now_escape/assets/img_door_open.png')}/>
        <View style={styles.regionList}/>
        <View style={styles.confirmButton}>
          <Button text="시작하기" height={74}/>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // width: 375,
    // height: 600,
    flex: 1,
    backgroundColor: '#ffffff'   
  },
  text_1: {
    position: 'absolute',
    top: 70,
    left: 22,
    width: '100%',
    height: 63,
    // fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 34,
    letterSpacing: 0.48,
    textAlign: 'left',
    color: '#000000',
  },
  text_2: {
    position: 'absolute',
    top: 152,
    left: 22,          
    width: '100%',
    height: 18,
    // fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#535353'
  },
  sectionBar: {
    position: 'absolute',
    top: 238.9,
    left: 17.3,          
    width: '90%',
    height: 3,
    backgroundColor: '#ea4b9b'  
  },
  doorOpenImage: {
    position: 'absolute',
    top: 185.7,
    right: 17.3,
    width: 68.4,
    height: 54.7,
  },
  regionList: {
    position: 'absolute',
    top: 282,
    left: 17,
    alignItems: 'center',
    width: '90%',
    height: 54,
    borderRadius: 10,
    backgroundColor: '#ffe8f2',    
  },
  confirmButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
})