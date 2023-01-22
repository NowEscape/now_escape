import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Pressable} from "react-native";
import regionStore from "../../../store/rigionStore";

interface RigionPropsType{
    search: boolean;
}
interface obj {
	[key: string] : string[]
  서울 : string[],
  경기: string[]
  충청: string[]
}
const rigion: obj = {
  서울: ["강남", "홍대", "신촌"],
  경기: ["수원", "인천", "성남"],
  충청: ["충청a", "충청b", "충청c"]
};


export default function Rigion(props:RigionPropsType){
  const {rigionList, setRigionList} = regionStore();
  const {search} = props;

  const renderItem = ({item, index}:{item:any, index:number}) => {
    const search = true;
    console.log(rigion)
    return(
      <Pressable onPress={()=>setRigionList(rigionList, index)}>
        <Text>{item} {rigion[item]}</Text>
      </Pressable>
    );
    }

    return(
      <View>
        <FlatList
          style={styles(0, search).container}
          data={Object.keys(rigion)}
          renderItem={renderItem}
        />
      </View>
    );

}

const styles = (selected, search) => StyleSheet.create({
  container:{
    display:'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: "#ffffff",
  },
  text:{
    display:'flex',
    color: selected? 'rgb(234,75,155)':'black',
    textAlign: 'center',
    marginHorizontal: 8,
    ...Platform.select({
        android:{
            fontSize: 13
          },
        ios:{
            fontSize: 14
        }
    })
  }
})