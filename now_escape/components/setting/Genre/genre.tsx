import * as React from 'react';
import {Text, StyleSheet, FlatList, Platform, Pressable} from "react-native";
import genreStore from "../../../store/genreStore";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

interface genrePropsType {
    search: boolean;
    isOpen: () => void;
}


export default function Genre(props:genrePropsType){
    const {genreList, setGenreList, genreListName, setGenreValue} = genreStore();
    const {search, isOpen} = props;

    const renderItem = ({item, index}:{item:any, index:number}) => {
        const search = true;
        return(
            <Pressable onPress={()=>
                {setGenreList(genreList, index);
                setGenreValue(genreListName, index);
                isOpen();
                }}>
                <Text style={styles(genreList[index],search).text}>{item}</Text>
            </Pressable>

        );
    }

    return(
        <FlatList
                style={styles(0, search).container}
                data={genreListName}
                renderItem={renderItem}
                keyExtractor={(item, index)=> String(index)}
                horizontal={true}
        />
    );
}

const styles = (selected, search) => StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'row',
        width: iosWidthRatio*375,
        zIndex:2,
        backgroundColor: search?'rgb(255,232,242)':'rgba(254,254,254,0.9)',
        ...Platform.select({
            android: {
                height: 48,
                paddingHorizontal: "40dp",
                paddingVertical: "16dp",
            },
            ios: {
                height: iosHeightRatio*50,
                paddingHorizontal: iosWidthRatio*35,
                paddingVertical: iosHeightRatio*17
            }
        })
    },
    text:{
        display:'flex',
        color: selected? 'rgb(234,75,155)':'black',
        textAlign: 'center',
        height: iosHeightRatio*50,
        marginHorizontal: 8,
        ...Platform.select({
            android:{
                fontSize: 13
             },
            ios:{
                fontSize: iosHeightRatio<1?iosHeightRatio*16:14,
                fontWeight: 'normal'
            }
})
}
})