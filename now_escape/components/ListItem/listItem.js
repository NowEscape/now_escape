import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, FlatList} from 'react-native';

{/*
   const [data, setData] = useState([{
    poster: '',
    title: '시간의 타임',
    location: '키이스케이프 창동점',
    time: ['9:45','10:55','12:45','20:45','21:55']
}]);
*/}

const renderItem = ({item}) => {
    return(
          <Text style={styles.text.timeListItem}>{item}</Text>
    );
}

export default function ListItem(props) {
    const {poster, title, location, time} = props;
    return(
            <View style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container:{
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
        height: 40
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