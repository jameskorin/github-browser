import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Logo from './assets/github-mark.svg'

export default function App() {

  const originalWidth = 98;
  const originalHeight = 96;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = 50;

  return (
      <LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>

        <View style={styles.header}>
        <View style={{ width: windowWidth, aspectRatio }}>
          <Logo width="100%" 
            height="100%" 
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}/>
            </View>
          <Text style={styles.title}>GitHub Repo Search</Text>
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 75,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingStart: 20,
    maxHeight: 50
  },
  logo: {
    width: 98,
    height: 96
  },
  title: {
    fontWeight: "700",
    marginLeft: 10
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center'
  }
});
