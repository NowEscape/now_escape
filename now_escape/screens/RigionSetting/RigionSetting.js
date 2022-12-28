import React, {Component} from 'react'
import { Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Button from '../../components/Button/button'
import * as Font from 'expo-font'

export default class RegionSetting extends Component  {

  state = {
    isReady:false
  }

  componentDidMount = async() => {
    await Font.loadAsync({
      Pretendard: require('now_escape/assets/fonts/Pretendard-Bold.otf')
    });
    this.setState({isReady: true});
  }

  render() {
    if(!this.state.isReady) {
      return <ActivityIndicator/>;
    }


    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text_1}        
          >방탈출 지역을{"\n"}설정해주세요</Text>
          <Text style={styles.text_2}        
          >선택한 지역의 방탈출을 모아 볼 수 있어요.</Text>
        </View>
        <View style={styles.secondBox}>
          <Image style={styles.doorOpenImage}
              source= {require('now_escape/assets/img_door_open.png')}/>
          <View style={styles.sectionBar}/>
          <View style={styles.regionList}/>          
        </View>
        <View style={styles.confirmButton}>
          <Button text="시작하기" height={74}/>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffffff'   
  },
  textBox: {
    width: '100%',
    height: '15%',
    marginLeft: 22,
    marginTop: 70,
  },
  text_1: {
    width: '100%',
    height: '80%',
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 34,
    letterSpacing: 0.48,
    textAlign: 'left',
    color: '#000000',
  },
  text_2: {        
    width: '100%',
    height: '20%',
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#535353'
  },
  secondBox: {
    width: '100%',
    height: '20%',
    marginTop: '3%',
    alignItems: 'center',
  },
  doorOpenImage: {
    marginLeft: '69%'
  },
  sectionBar: {   
    width: '90%',
    height: 3,
    marginTop: '-1%',
    backgroundColor: '#ea4b9b'  
  },
  regionList: {
    width: '90%',
    height: '40%',
    marginTop: '12%',
    borderRadius: 10,
    backgroundColor: '#ffe8f2',    
  },
  confirmButton: {
    width: '100%',
    flex: 1,
    flexDirection: 'column-reverse'
  }
})