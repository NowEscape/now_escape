import * as React from 'react';
import {Image, View, Text, StyleSheet, Pressable, SafeAreaView, Platform, FlatList} from "react-native";
import Label from "../../components/Label/label";
import ListItem from "../../components/ListItem/listItem";

export default function Index(){
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.filterBar}>
                    <Label
                        height={32}
                        width={130}
                        borderRadius={16}
                        type={'mainLabel'}
                        text={'2022.11.24'}
                    />
                    <Label
                        height={32}
                        width={115}
                        borderRadius={16}
                        type={'mainLabel'}
                        text={'서울/홍대'}
                    />
                    <Text>Search Button</Text>
                </View>
                <View style={styles.banner}></View>
                <ListItem/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        ...Platform.select({
            android:{},
            ios:{
                height:60,
                width:'100%'
            }
        })
    },
    filterBar:{
        display:'flex',
        flexDirection:'row',
        ...Platform.select({
            android:{},
            ios:{
                paddingTop:15,
                paddingBottom:13,
                paddingLeft:17
            }
        })
    },
    banner:{
        display:'flex',
        backgroundColor: 'rgb(255,223,232)',
        ...Platform.select({
            android:{},
            ios:{
                height:168,
                width:'100%'
            }
        })
    }

})