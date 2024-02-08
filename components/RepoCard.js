import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { useFonts } from 'expo-font'
import { Context } from '../util/Context'
import splitTextForHighlight from '../util/splitTextForHighlight'

export default function RepoCard({
    repo,
    navigate
}) {

    const context = useContext(Context);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    });
    const bold = 'SF-Pro-Display-Bold';
    const regular = 'SF-Pro-Display-Regular';

    if(!fontsLoaded) return null;

    const split_name = splitTextForHighlight({text: repo.full_name, highlight: context.highlight});
    const split_description = splitTextForHighlight({text: repo.description, highlight: context.highlight});
    const regex = new RegExp(`(${context.highlight})`, 'gi');

    return <TouchableWithoutFeedback onPress={() => {
        context.setSelectedRepo(repo.id);
        navigate('Repo');
    }}>
    <View style={styles.card}>
        <View style={styles.cardTopRow}>
            <Image style={styles.avatar} source={{uri: repo.owner.avatar_url}}/>

            {/* full name of repo, w/search query highlighted */}
            <Text style={styles.name}>
                {split_name.map((item,index) => (
                    <Text style={{
                        fontFamily: regex.test(item) ? bold : regular,
                        ...styles.name
                    }}>{item}</Text>
                ))}
            </Text>
        </View>

        {/* description of repo, w/search query highlighted */}
        <Text style={styles.description}>
            {split_description.map((item,index) => (
                <Text style={{
                    fontFamily: regex.test(item) ? bold : regular,
                    ...styles.description
                }}>{item}</Text>
            ))}
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
        marginBottom: 16,
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    description: {
        marginTop: 12,
        fontSize: 14
    },
    name: {
        marginLeft: 11,
        fontSize: 14
    },  
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 5
    }
  });