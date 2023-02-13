import * as React from 'react';
import {Text, StyleSheet, FlatList, Platform, Pressable, View} from "react-native";
import genreStore from "../../../store/genreStore";

import {iosWidth, iosHeight} from '../../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../../globalStyles_aos'
import dateStore from "../../../store/dateStore";
import searchStore from "../../../store/searchStore";
import timeStore from "../../../store/timeStore";
import rigionStore from "../../../store/rigionStore";
import _ from "lodash";
import {format} from "date-fns";

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
    const {setSearchData, searchText} = searchStore();
    const {date} = dateStore();
    const {genre, } = genreStore();
    const {time} = timeStore();
    const {rigion} = rigionStore();

    const renderItem = ({item, index}:{item:any, index:number}) => {
        const search = true;
        return(
            <Pressable onPress={()=>
                {setGenreList(genreList, index);
                setGenreValue(genreListName, index);
                setSearchData({
                    region1: _.split(rigion, ' ', 2)[0],
                    region2: _.split(rigion, ' ', 2)[1],
                    searchWord: searchText,
                    genreName: genreListName[index],
                    themeTime: format(date, 'yyyy-MM-dd')+ ' ' + time
                });
                isOpen();
                }}>
                <Text style={styles(genreList[index],search).text}>{item}</Text>
            </Pressable>
        );
    }

    return(
        <View style={styles(0, search).container}>
            <FlatList
                data={genreListName}
                renderItem={renderItem}
                keyExtractor={(item, index)=> String(index)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles(0, search).flatListStyle}
            />
        </View>
    );
}

const styles = (selected, search) => StyleSheet.create({
    container:{
        display:'flex',
        justifyContent: 'center',
        zIndex:2,
        backgroundColor: search?'rgb(255,232,242)':'rgba(254,254,254,0.9)',
        ...Platform.select({
            android: {
                height: aosHeightRatio*48,
            },
            ios: {
                height: iosHeightRatio*51,
            }
        })
    },
    flatListStyle:{
        alignItems: 'center',
        ...Platform.select({
            android: {
                paddingHorizontal: aosWidthRatio*35,

            },
            ios: {
                paddingHorizontal: iosWidthRatio*35,
            }
        })
    },
    text:{
        display:'flex',
        color: selected? 'rgb(234,75,155)':'black',
        textAlign: 'center',
        fontWeight: 'normal',
        marginHorizontal: 8,
        ...Platform.select({
            android:{
                fontSize: aosHeightRatio<1?aosHeightRatio*15:13,
                lineHeight: aosHeightRatio<1?aosHeightRatio*15:13,
             },
            ios:{
                fontSize: iosHeightRatio<1?iosHeightRatio*16:14,
                lineHeight: iosHeightRatio<1?iosHeightRatio*16:14,
            }
        })
    }
})