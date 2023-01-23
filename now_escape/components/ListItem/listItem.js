import React from 'react';
import {Image, Text, View, StyleSheet, FlatList} from 'react-native';
import escapeListStore from "../../store/escapeListStore";

const renderTimeList = ({timeItem}) => {
    return(
          <Text style={styles.text.timeListItem}>{timeItem}</Text>
    );
}

const renderEscapeList = ({escapeListItem}) => {
    return(
        <View style={styles.itemContainer}>
            <Image style={styles.poster} source={escapeListItem.theme.themeImageUrl}/>
            <View style={styles.textBox}>
                <Text style={styles.text.title}>{escapeListItem.theme.themeName}</Text>
                <View style={styles.locationBox}>
                    <Image style={styles.locationIcon} source={require('../../assets/icon_location.png')}/>
                    <Text style={styles.text.location}>{escapeListItem.cafeName}</Text>
                </View>
                <View style={styles.timeList}>
                    <FlatList data={escapeListItem.theme.themeDateList} renderItem={renderTimeList} keyExtractor={(item) => String(item.index)} numColumns={1} contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}/>
                </View>
            </View>
        </View>
    );
}

export default function ListItem() {
    const {escapeList, getEscapeList} = escapeListStore();
    getEscapeList();

    return(
        <View style={styles.container}>
            <FlatList data={escapeList} renderItem={renderEscapeList}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    itemContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 340.4,
        height: 153.3,
        paddingLeft: 4.7,
        paddingBottom: 15.9,
        paddingTop: 15.3,
        paddingRight: 36
    },
    poster: {
        width: 91,
        height: 122,
        borderRadius: 6,
        backgroundColor: 'rgb(216, 216, 216)'
    },
    textBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 181.9,
        height:120,
        paddingTop: 12.5,
        marginLeft: 26.8,
        paddingBottom: 12
    },
    locationBox: {
        flexDirection: 'row',
        marginTop: 7
    },
    locationIcon: {
      width: 8.8,
      height: 12.6,
      color: 'rgb(234, 75, 155)'
    },
    timeList: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 13,
        width: 181.4,
        height: 43
    },
    text: {
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 19,
            letterSpacing: 0.72,
            textAlign: 'left',
            color: 'black'
        },
        location:{
            fontSize: 14,
            textAlign: 'left',
            letterSpacing: 0.28,
            marginLeft: 5.3
        },
        timeListItem: {
            width: 42.4,
            height: 18,
            borderRadius: 9,
            backgroundColor: 'rgba(234, 75, 155, 0.13)',
            fontSize: 12,
            textAlign: 'center',
            paddingTop: 1.8,
            letterSpacing: 0.24,
            color: 'black',
            marginBottom: 5.6,
            overflow: 'hidden'
        }
    }
})