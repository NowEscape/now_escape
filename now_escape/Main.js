import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import Label from "./components/Label/label";

export default class Loading extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          {/* <Text>Main</Text> */}
          <Label width={165} height={49} type="searchLabel" text="전체장르"></Label>
          <StatusBar style="auto" />
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