import { StyleSheet, Text, Image, View, TouchableOpacity, Linking } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useContext } from 'react'
import { Context } from '../util/Context'
import truncateNumber from '../util/truncateNumber'
import Star from '../assets/star.svg'
import Fork from '../assets/repo-forked.svg'
import Eye from '../assets/eye.svg'

export default function Repo({ navigation }) {

    navigation.setOptions({ headerShown: false });

    const context = useContext(Context);

    if(context.selectedRepo === '') return null;

    const repo = context.repos.find(e => e.id == context.selectedRepo);
    console.log(JSON.stringify(repo, null, 2));
    return <LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>

        <View style={styles.section}>
            <Image source={{uri: repo.owner.avatar_url}} 
            style={styles.avatar}/>

            <Text style={styles.title}>{repo.full_name}</Text>

            <View style={styles.statsRow}>

                {/* Watchers */}
                <View style={styles.statContainer}>
                    <Eye style={styles.statIcon}/>
                    <Text style={styles.stat}>{truncateNumber(repo.watchers)}</Text>
                </View>

                {/* Forks */}
                <View style={styles.statContainer}>
                    <Fork style={styles.statIcon}/>
                    <Text style={styles.stat}>{truncateNumber(repo.forks)}</Text>
                </View>

                {/* Stars */}
                <View style={styles.statContainer}>
                    <Star style={styles.statIcon}/>
                    <Text style={styles.stat}>{truncateNumber(repo.stargazers_count)}</Text>
                </View>
            </View>
        </View>

        <View style={styles.break}/>

        <View style={styles.section}>
            <Text>{repo.description}</Text>

            <Text style={styles.languageHeader}>Languages</Text>

            <View style={styles.languageList}>
                {context.languages.map((item, index) => (
                    <Text key={item} style={styles.language}>{item}</Text>
                ))}
            </View>
        </View>

        <View style={styles.repoLinkContainer}>
        <TouchableOpacity style={styles.repoLink} onPress={() => Linking.openURL(repo.html_url)}>
            <Text style={styles.repoLinkText}>Go to Repo</Text>
        </TouchableOpacity>
        </View>

    </LinearGradient>
}

const styles = StyleSheet.create({
    linearGradient: {
      alignItems: "left",
      width: "100%",
      height: "100%",
    },
    section: {
        paddingHorizontal: 30
    },
    break: {
        width: "100%",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        marginVertical: 24
    },
    avatar: {
        width: 78,
        height: 78,
        borderRadius: 1000
    },
    title: {
        marginTop: 20,
        fontSize: 18
    },
    statsRow: {
        flexDirection: "row"
    },
    statContainer: {
        flexDirection: "row",
        marginRight: 14,
        marginTop: 12,
        alignItems: "center"
    },
    stat: {
        color: "#707070",
        fontSize: 12
    },
    statIcon: {
        width: 12,
        height: 12,
        marginRight: 6
    },
    languageList: {
        flexDirection: "column"
    },
    languageHeader: {
        fontWeight: 700,
        marginTop: 24,
        marginBottom: 16
    },
    language: {
        marginBottom: 5
    },
    repoLinkContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 48,
        width: "100%",
        paddingHorizontal: 30
    },
    repoLink: {
        width: "100%",
        backgroundColor: "#1F6FEB",
        marginHorizontal: 30,
        borderRadius: 1000,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    repoLinkText: {
        color: "#FFFFFF",
        lineHeight: 16
    }
  });