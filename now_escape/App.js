// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Loading from './Loading';
// import Main from './Main'
import RigionSetting from 'now_escape/screens/RigionSetting/RigionSetting.js'

export default class extends React.Component {
  state = {
    isLoading : true
  };
  render() {
    if(this.state.isLoading) {
      return <Loading/>
    }
    else {
      return <RigionSetting/>
    }
  }

  componentDidMount = async() => {
    // 1000초가 1초
    setTimeout(() => {this.setState({isLoading: false})}, 3000);
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
