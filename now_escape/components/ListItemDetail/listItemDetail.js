import React from 'react';
import {Image, Text, View, StyleSheet, FlatList, Platform, ScrollView} from "react-native";
import Button from "../Button/button";

const renderItem = ({item}) => {
    return(
        <Text style={styles.text.timeListItem}>{item}</Text>
    );
}

export default function ListItemDetail(props){
    const {poster, title, location, time, synopsis} = props;
    return(
        <View style={styles.container}>
                <View style={styles.listItem}>
                    <Image style={styles.poster} source={poster}/>
                    <View style={styles.textBox}>
                        <Text style={styles.text.title}>{title}</Text>
                        <View style={styles.locationBox}>
                            <Image style={styles.locationIcon} source={require('../../assets/icon_location.png')}/>
                            <Text style={styles.text.location}>{location}</Text>
                        </View>
                        <View style={styles.timeList}>
                            <FlatList data={time} renderItem={renderItem} keyExtractor={(item) => String(item.index)} numColumns={1} contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}/>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollBox}>
                    <Text style={styles.text.synopsis}>
                        {synopsis}
                    </Text>
                </ScrollView>
                <Button onPress={()=>{}} text={'예약하기'} active={true} rounded={true} canceled={false} height={63} width={331}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor:'white',
        ...Platform.select({
            android:{
            },
            ios:{
                height: 488,
                width: 375,
                overflow: 'hidden',
                paddingTop: 41,
                paddingLeft: 22,
                paddingRight: 22,
                paddingBottom: 17
            }
        })
    },
    listItem:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        ...Platform.select({
            android: {},
            ios: {
                height: 128,
                width: 331
            }
        })
    },
    poster:{
        ...Platform.select({
            android:{},
            ios:{
                height:128,
                width:100,
                borderRadius:6,
                backgroundColor: 'rgb(216,216,216)'
            }
        })
    },
    textBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        ...Platform.select({
            android:{},
            ios:{
                height: 114.3,
                width: 216.5,
                paddingTop: 8.9,
                paddingBottom: 4.8,
                marginLeft: 14.5
            }
        })
    },
    locationBox: {
        flexDirection: 'row',
        ...Platform.select({
            android:{},
            ios:{
                marginTop: 8.7
            }
        })
    },
    locationIcon:{
        color:'rgb(234,75,155)',
        ...Platform.select({
            android:{},
            ios:{
                height:13.3,
                width:9.3
            }
        })
    },
    timeList:{
        display:'flex',
        flexDirection: 'column',
        flexWrap:'warp',
        ...Platform.select({
            android:{},
            ios:{
                marginTop: 18.8,
                height: 45.7,
                width: 216.5
            }
        })
    },
    text:{
        ...Platform.select({
            android:{},
            ios:{
                title:{
                    fontSize:21,
                    fontWeight: 'bold',
                    textAlign:'left',
                    color:'black'
                },
                location:{
                    fontSize: 14,
                    textAlign:'left',
                    letterSpacing: 0.28,
                    marginLeft: 4.3
                },
                timeListItem: {
                    height: 18.1,
                    width: 48.1,
                    borderRadius: 9,
                    backgroundColor: 'rgba(234, 75, 155, 0.13)',
                    fontSize: 13,
                    textAlign: 'center',
                    paddingTop: 1.8,
                    letterSpacing: 0.26,
                    color:'black',
                    overflow:'hidden',
                    marginBottom: 9.6
                },
                synopsis:{
                    fontSize: 14,
                    textAlign: 'left',
                    lineHeight: 21,
                    letterSpacing: 0.28,
                    color:'black'
                }
            }
        })
    },
    scrollBox:{
        backgroundColor: 'rgb(255,232,242)',
        borderRadius: 6,
        ...Platform.select({
            android:{},
            ios:{
                overflow:'hidden',
                height: 213,
                width: 331,
                padding: 14,
                marginTop: 15,
                marginBottom:11
            }
        })
    }
})