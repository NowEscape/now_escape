import * as React from 'react';
import {Text, View, StyleSheet, FlatList, Platform, Pressable, ScrollView} from "react-native";

const renderItem = ({item}, page) => {
    const {genreList} = genreStore();

    return(
        <Pressable>
            <Text style={styles(genreList[item.index], page).text}>{item}</Text>
        </Pressable>
    );
}

interface typeSetting{
    genre: [string];
}

const genre = ["전체장르","감성","로맨스","공포","SF","추리","ㅇ","ㅇ","기타"];

export default function Genre(props){
    const {search} = props;
    const {setGenreList} = genreStore();

    return(
        <ScrollView horizontal={true} style={styles(0, search).container}>
            <FlatList
                data={genre}
                renderItem={renderItem}
                keyExtractor={(item)=> String(item.index)}
                onClick={(item)=>setGenreList(item.index)}
            />
        </ScrollView>
    );
}

const styles = (selected, search) => StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'spaceBetween',
        backgroundColor: search?'rgb(255,232,242)':'rgba(254,254,254,0.9)',
        ...Platform.select({
            android: {
                width: "100%",
                height: "48dp",
                paddingHorizontal: "40dp",
                paddingVertical: "16dp"
            },
            ios: {
                width: "100%",
                height: 50,
                paddingHorizontal: 42,
                paddingVertical: "17dp"
            }
        })
    },
    text:{
        color: selected? 'rgb(234,75,155)':'black',
        textAlign: 'center',
        ...Platform.select({
            android:{
                fontSize: '13sp'
            },
            ios:{
                fontSize: 14
            }
        })
    }
})