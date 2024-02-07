import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function RepoCard({
    repo
}) {
    console.log(JSON.stringify(repo, null, 2));
    // if(repo === undefined || repo === null) return <View><Text>oops</Text></View>;
    // return null;
    return <View style={styles.card}>
        <View style={styles.cardTopRow}>
            <Image style={styles.avatar} source={{uri: repo.owner.avatar_url}}/>
            <Text style={styles.name}>{repo.full_name}</Text>
        </View>
        <Text style={styles.description}>
            {repo.description}
        </Text>
    </View>
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
      shadowOffset: 0
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    description: {
        marginTop: 12
    },
    name: {
        marginLeft: 11
    },  
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 5
    }
  });