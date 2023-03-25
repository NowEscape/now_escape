import React from 'react';
import {Image, Text, View, Alert, StyleSheet, FlatList, Platform, ScrollView, Linking} from "react-native";
import Button from "../Button/button";
import TextTicker from 'react-native-text-ticker';
import escapeListStore from "../../store/escapeListStore";
import LocationSVG from '../../assets/iconLocation'
import * as Font from 'expo-font'

import axios from "axios";
import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'
import _ from "lodash";

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

const renderItem = ({item}) => {
    return(
        <Text style={styles.timeListItem}>{_.split(item.themeTime, ' ', 2)[1]}</Text>
    );
}

export default function ListItemDetail(props){
    const {escapeList} = escapeListStore();
    const {escapeID} = props;
    const [isFont, setIsFont] = React.useState(false);

    escapeList[escapeID].themeDateList = _.sortBy(escapeList[escapeID].themeDateList, (a)=>a.themeTime);

    React.useEffect(() => {
      Font.loadAsync({
        "Pretendard": require('../../assets/fonts/Pretendard-Bold.otf'),
        "Pretendard-Medium": require('../../assets/fonts/Pretendard-Medium.otf'),
        "Pretendard-Regular": require('../../assets/fonts/Pretendard-Regular.otf'),
      }).then(() => setIsFont(true));
    },[])

    async function openURL(url){
        const supported = await Linking.canOpenURL(url);
        if(supported){
            await Linking.openURL(url);
        }else{
            Alert.alert('해당 URL이 존재하지 않습니다.');
        }
    }

    return(
        <View style={styles.container}>
                <View style={styles.listItem}>
                    <Image style={styles.poster} source={{uri:escapeList[escapeID].theme.themeImageUrl}}/>
                    <View style={styles.textBox}>
                        <TextTicker
                            style={styles.title}
                            duration={10000}
                            loop
                            bounce={false}
                            repeatSpacer={30}
                            marqueeDelay={2000}
                        >
                            {escapeList[escapeID].theme.themeName}
                        </TextTicker>
                        <View style={styles.locationBox}>
                            <LocationSVG height={aosHeightRatio*12.1}/>
                            <Text style={styles.textLocation}>{escapeList[escapeID].cafeName}</Text>
                        </View>                        
                        <View style={styles.timeList}>
                            {renderItem.length == 1 ?
                            <FlatList
                            key={'!'}
                            data={escapeList[escapeID].themeDateList.slice(0, 8)}
                            renderItem={renderItem}
                            keyExtractor={(item) => '!'+item.id}
                            numColumns={1}
                            contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start',}}
                            /> :
                            <FlatList
                                key={"@"}
                                data={escapeList[escapeID].themeDateList}
                                renderItem={renderItem}
                                keyExtractor={(item) => '@'+item.id}
                                numColumns={4}
                                contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start', }}
                        />                                            
                            }

                        </View>
                    </View>
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView 
                        contentContainerStyle={styles.scrollBox}
                        showsVerticalScrollIndicator={false}
                        >
                        <Text style={styles.synopsis}>
                            {escapeList[escapeID].theme.themeDescription}
                        </Text>
                    </ScrollView>
                </View>
                <Button 
                    onPress={()=>{openURL(escapeList[escapeID].shortCutUrl)}}
                    text={'예약하기'}
                    active={true} 
                    rounded={true} 
                    canceled={false} 
                    height={Platform.OS==='ios'?iosHeightRatio*63:aosHeightRatio*60} 
                    width={Platform.OS==='ios'?iosWidthRatio*331:aosWidthRatio*318}/>
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
        overflow: 'hidden',
        ...Platform.select({
            android:{
                height: aosHeightRatio*469,
                width: aosWidthRatio*360,
                paddingTop: aosHeightRatio*39,
                paddingLeft: aosWidthRatio*21,
                paddingRight: aosWidthRatio*21,
                paddingBottom: aosHeightRatio*17
            },
            ios:{
                height: iosHeightRatio*488,
                width: iosWidthRatio*375,
                paddingTop: iosHeightRatio*41,
                paddingLeft: iosWidthRatio*22,
                paddingRight: iosWidthRatio*22,
                paddingBottom: iosHeightRatio*17
            }
        })
    },
    listItem:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        ...Platform.select({
            android: {},
            ios: {}
        })
    },
    poster:{
        borderRadius:6,
        backgroundColor: 'rgb(216,216,216)',
        ...Platform.select({
            android:{
                height: aosHeightRatio*123,
                width: aosWidthRatio*96,        
            },
            ios:{
                height: iosHeightRatio*128,
                width: iosWidthRatio*100,
            }
        })
    },
    textBox:{
        display: 'flex',
        flexDirection: 'column',
        ...Platform.select({
            android:{
                paddingTop: aosHeightRatio*9,
                paddingBottom: aosHeightRatio*4.3,
                marginLeft: aosWidthRatio*14.1,
                width:aosWidthRatio*190
            },
            ios:{
                paddingTop: iosHeightRatio*8.9,
                paddingBottom: iosHeightRatio*4.8,
                marginLeft: iosWidthRatio*14.5,
                width: iosWidthRatio*200
            }
        })
    },
    locationBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*8.3,
                height: aosWidthRatio<1?aosWidthRatio*14:13,

            },
            ios:{
                marginTop: iosHeightRatio*5.8,
            }
        }),
    },
    textLocation:{
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1?aosWidthRatio*14:13,
                lineHeight: aosWidthRatio<1?aosWidthRatio*14:13,                
                letterSpacing: aosWidthRatio*0.26,
                marginLeft: aosWidthRatio*5.1,
            },
            ios:{
                fontSize: iosWidthRatio<1?iosWidthRatio*15:14,
                letterSpacing: iosWidthRatio*0.28,
                marginLeft: iosWidthRatio*5.3,
            }
        }),
    },
    timeList:{
        display:'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        ...Platform.select({
            android:{
                marginTop: aosHeightRatio*18.4,
                height: aosHeightRatio*45.7,
                width: aosWidthRatio*215
            },
            ios:{
                marginTop: iosHeightRatio*18.8,
                height: iosHeightRatio*45.7,
                width: iosWidthRatio*220
            }
        })
    },
    title:{
        fontFamily: 'Pretendard',
        textAlign:'left',
        color:'black',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio<1?aosWidthRatio*21:20,
            },
            ios:{
                fontSize: iosWidthRatio<1?iosWidthRatio*22:21,
            }
        })
    },
    timeListItem: {
        fontFamily: 'Pretendard-Medium',
        backgroundColor: 'rgba(234, 75, 155, 0.13)',
        textAlign: 'center',
        color:'black',
        overflow:'hidden',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*12,
                marginBottom: aosHeightRatio*9.2,
                marginRight: aosWidthRatio*7,
                paddingTop: aosHeightRatio*1.3,
                letterSpacing: 0.26,
                height: aosHeightRatio*17.4,
                width: aosWidthRatio*46.2,
                borderRadius: 8.7,
            },
            ios:{
                fontSize: iosWidthRatio*13,
                marginBottom: iosHeightRatio*9.6,
                marginRight: iosWidthRatio*6,
                paddingTop: iosHeightRatio*1.8,
                letterSpacing: 0.26,
                height: iosHeightRatio*18.1,
                width: iosWidthRatio*48.1,
                borderRadius: 9,
            }
        })
    },
    synopsis:{
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left',
        color:'black',
        ...Platform.select({
            android:{
                fontSize: aosWidthRatio*13,
                lineHeight: 24,
                letterSpacing: 0.26,
            },
            ios:{
                fontSize: iosWidthRatio*16,
                lineHeight: 24,
                letterSpacing: 0.28,
            }
        })
    },
    scrollContainer:{
        display:'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'rgb(255,232,242)',
        borderRadius: 6,
        ...Platform.select({
            android:{
                height: renderItem.length==1?aosHeightRatio*204:aosHeightRatio*199,
                width: aosWidthRatio*318,
                marginTop: renderItem.length==1?aosHeightRatio*20:aosHeightRatio*25,
                marginBottom: aosHeightRatio*11
            },
            ios:{
                height: renderItem.length==1?iosHeightRatio*213:iosHeightRatio*208,
                width: iosWidthRatio*330,
                marginTop: renderItem.length==1?iosHeightRatio*15:iosHeightRatio*20,
                marginBottom: iosHeightRatio*11
            }
        })
    },
    scrollBox:{
        ...Platform.select({
            android:{
                padding: aosWidthRatio*14,

            },
            ios:{
                padding: iosWidthRatio*14,
                
            }
        })
    }
})