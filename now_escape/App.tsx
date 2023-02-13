import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Entypo from '@expo/vector-icons/Entypo'

import SearchResult from "./screens/SearchResult/SearchResult";
import Index from "./screens/Index/Index";
import RigionSetting from "./screens/RigionSetting/RigionSetting";
import Search from "./screens/Search/Search";
import rigionStore from "./store/rigionStore";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const {rigion} = rigionStore();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
          initialRouteName={rigion==""?'RigionSetting':'Index'}
          screenOptions={{
            headerShown: false
          }}
      >
        <Stack.Screen name={'RigionSetting'} component={RigionSetting}/>
        <Stack.Screen name={'Index'} component={Index}/>
        <Stack.Screen name={'Search'} component={Search}/>
        <Stack.Screen name={'SearchResult'} component={SearchResult}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
