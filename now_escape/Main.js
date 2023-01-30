import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

import Index from "./screens/Index/Index";
import RigionSetting from "./screens/RigionSetting/RigionSetting";
import Search from "./screens/Search/Search";
import SearchResult from "./screens/SearchResult/SearchResult";


export default class Loading extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <SearchResult/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});