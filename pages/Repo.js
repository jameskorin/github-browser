import { StyleSheet, Text } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useContext } from 'react'
import { Context } from '../App'

export default function Repo() {

    const context = useContext(Context);

    return <LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>
        <Text>hella</Text>
    </LinearGradient>
}

const styles = StyleSheet.create({
    linearGradient: {
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingHorizontal: 30
    }
  });