import React, {useState} from 'react';
import {Text, StyleSheet, Pressable, FlatList, ScrollView, Platform} from "react-native";

const renderItem = ({item}) => {
    return(
      <Pressable>{'One of Genre array'}</Pressable>
    );
}

export default function Genre(props){
    const {page} = props;
    const [genre, setGenre] = useState('전체장르');
    return(
        <View>
            <ScrollView>
                <FlatList/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        ...Platform.select({
            android:{

            },
            ios:{

            }
        })

    }
})