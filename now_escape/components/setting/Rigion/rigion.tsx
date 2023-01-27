import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Pressable} from "react-native";
import {useState} from "react";
import _ from "lodash";
import regionStore from "../../../store/rigionStore";

export default function Rigion(props){
  const {rigion, rigionName, rigionListString, rigionList, setRigionList, setRigion} = regionStore();
  const [currentRigionIdx, setCurrentRigionIdx] = useState(findRigionIdx(rigionList));

  const renderRigionItem = ({item, index}:{item:any, index:number}) => {
      return(
          <Pressable
              onPress={()=>{
                setRigionList(rigionList,currentRigionIdx,index);
                setRigion(rigionName,rigionListString,currentRigionIdx,index)}}
          >
              <Text style={styles.rigionSecond}>{item}</Text>
          </Pressable>
      );
  }

  const renderItem = ({item, index}:{item:any, index:number}) => {
    return(
        <Pressable
            style={{backgroundColor:
                    index === currentRigionIdx
                        ? 'rgb(255,210,230)'
                        : 'rgb(239,239,239)'}}
            onPress={()=>setCurrentRigionIdx(index)}
        >
            <Text style={styles.rigionFirst}>{item}</Text>
        </Pressable>
    );
  }

    return(
      <View style={styles.container}>
          <Text style={styles.text}>지역 설정</Text>
          <View style={styles.rigionBox}>
              <FlatList
                  data={rigionName}
                  renderItem={renderItem}
              />
              {
                  <FlatList
                      data={rigionListString[currentRigionIdx]}
                      renderItem={renderRigionItem}
                  />
              }
          </View>
      </View>
    );
}

function findRigionIdx(rigionList:boolean[][]){
    for(let i=0; i<rigionList.length; i++){
        if(-1 !== _.indexOf(rigionList[i], true)){
            return i;
        }
    }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection: 'column',
    backgroundColor: "#ffffff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop:28,
      paddingHorizontal: 17,
      width:'100%',
      height:'90%'
  },
  text:{
      alignItems:'center',
    textAlign: 'center',
      fontWeight:'bold',
    ...Platform.select({
        android:{
            fontSize: 17
          },
        ios:{
            fontSize: 17,
            lineHeight:31,
            letterSpacing:0.34,
            marginBottom:20.9
        }
    })
  },
    rigionBox:{
      display:'flex',
        flexDirection:'row'
    },
    rigionFirst:{
      display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 17,
        ...Platform.select({
            android:{},
            ios:{
                width:117,
                height:61,
                paddingTop:20,
            }
        })
    },
    rigionSecond:{
      display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 17,
        ...Platform.select({
            android:{},
            ios:{
                height:61,
                paddingTop:20,
                width:224
            }
        })

    }
})