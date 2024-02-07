import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import Logo from '../assets/github-mark.svg'
import { useState, useContext } from 'react'
import RepoCard from '../components/RepoCard'
import SearchBar from '../components/SearchBar'
import { useFonts } from 'expo-font'
import { Context } from '../App'

export default function Search() {

  const originalWidth = 98;
  const originalHeight = 96;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = 50;

  const context = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('tetris+language:assembly&sort=stars&order=desc');

  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
  });

  return (
      <LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ width: windowWidth, aspectRatio }}>
            <Logo width="100%" 
            height="100%" 
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}/>
          </View>
          <Text style={{fontFamily: 'SF-Pro-Display-Bold', ...styles.title}}>GitHub Repo Search</Text>
        </View>

        {/* Search bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

        <Button title={'Seach'}
        onPress={() => context.search(searchQuery)}/>

        {/* List of results */}
        <FlatList
        style={styles.cardList}
        data={context.repos}
        renderItem={({item}) => (
          <RepoCard
          repo={item}
          key={item.id}
          onPress={() => console.log(item.name)}/>
        )}
        />
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 75,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 30
  },
  cardList: {
    width: "100%",
    paddingBottom: 60
  }  
});