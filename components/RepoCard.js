import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
// import { useFonts } from 'expo-font'
import { Context } from '../util/Context'

export default function RepoCard({
    repo,
    navigate
}) {

    const context = useContext(Context);

    // const [fontsLoaded] = useFonts({
    //     'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    //     'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    // });

    return <TouchableWithoutFeedback onPress={() => {
        context.setSelectedRepo(repo.id);
        navigate('Repo');
    }}>
    <View style={styles.card}>
        <View style={styles.cardTopRow}>
            <Image style={styles.avatar} source={{uri: repo.owner.avatar_url}}/>
            <Text style={styles.name}>{repo.full_name}</Text>
        </View>
        <Text style={styles.description}>
            {repo.description}
        </Text>
    </View>
    </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 9,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "column",
      marginTop: 16,
      shadowColor: "#FFFFFF",
      shadowOpacity: 0.1,
      shadowOffset: 0,
      marginHorizontal: 30
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    description: {
        marginTop: 12,
        fontFamily: 'SF-Pro-Display-Regular'
    },
    name: {
        marginLeft: 11,
        fontFamily: 'SF-Pro-Display-Regular'
    },  
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 5
    }
  });