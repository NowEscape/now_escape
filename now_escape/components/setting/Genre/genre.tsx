import * as React from 'react';
import {Text, StyleSheet, FlatList, Platform, Pressable} from "react-native";
import genreStore from "../../../store/genreStore";

interface genrePropsType{
    search: boolean;
}

const genre = ["전체장르","감성","로맨스","공포","SF","추리","19금","기타"];

export default function Genre(props:genrePropsType){
    const {genreList, setGenreList} = genreStore();
    const {search} = props;

    const renderItem = ({item, index}:{item:any, index:number}) => {
        const search = true;
        return(
            <Pressable onPress={()=>setGenreList(genreList, index)}>
                <Text style={styles(genreList[index],search).text}>{item}</Text>
            </Pressable>

        );
    }

    return(
        <FlatList
                style={styles(0, search).container}
                data={genre}
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
        width: "100%",
        backgroundColor: search?'rgb(255,232,242)':'rgba(254,254,254,0.9)',
        ...Platform.select({
            android: {
                height: 48,
                paddingHorizontal: "40dp",
                paddingVertical: "16dp"
            },
            ios: {
                height: 50,
                paddingHorizontal: 42,
                paddingVertical: 17
            }
        })
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