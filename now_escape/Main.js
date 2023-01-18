import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import Genre from "./components/setting/Genre/genre";

export default class Loading extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Genre search={true}/>
          <Genre search={false}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
      flex:0.12,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});