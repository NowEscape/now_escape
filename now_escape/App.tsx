import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import SplashScreen from './screens/SplashScreen/SplashScreen';
import SearchResult from './screens/SearchResult/SearchResult';
import Index from './screens/Index/Index';
import RegionSetting from './screens/RegionSetting/RegionSetting';
import Search from './screens/Search/Search';
import regionStore from './store/regionStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const {region} = regionStore();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        setFontIsLoaded(true);
        await new Promise(resolve => setTimeout(resolve, 2300));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady && !fontIsLoaded) {
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName={'Index'}
          screenOptions={{
            headerShown: false
          }}
      >
        <Stack.Screen name={'RegionSetting'} component={RegionSetting}/>
        <Stack.Screen name={'Index'} component={Index}/>
        <Stack.Screen name={'Search'} component={Search}/>
        <Stack.Screen name={'SearchResult'} component={SearchResult}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
