import { View, Text, ImageBackground, Platform, SafeAreaView} from "react-native";

import IconLogo from './ios/iconLogo'
import {iosWidth, iosHeight} from '../../globalStyles_ios'
import {aosWidth, aosHeight} from '../../globalStyles_aos'

const iosWidthRatio = iosWidth as unknown as number;
const iosHeightRatio = iosHeight as unknown as number;
const aosWidthRatio = aosWidth as unknown as number;
const aosHeightRatio = aosHeight as unknown as number;

export default function SplashScreen() {
  if (Platform.OS === 'ios') {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require("./ios/background.png")} style={{width: '100%', height: '100%',flex: 1, alignItems: 'center'}}>
        <View style={{paddingTop: iosHeightRatio*283}}>
          <IconLogo height={iosHeightRatio*218}/>
        </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
      <ImageBackground source={require("./aos/background.png")} style={{width: '100%', height: '100%',flex: 1, alignItems: 'center'}}>
      <View style={{paddingTop: aosHeightRatio*225}}>
        <IconLogo height={aosHeightRatio*189.5}/>
      </View>
      </ImageBackground>
    </View>
    )
  }
}
