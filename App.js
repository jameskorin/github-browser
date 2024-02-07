import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import Logo from './assets/github-mark.svg'
import axios from 'axios'
import { useState, useEffect } from 'react'
import RepoCard from './components/RepoCard'
import SearchBar from './components/SearchBar'
import { useFonts } from 'expo-font'

export default function App() {

  const originalWidth = 98;
  const originalHeight = 96;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = 50;

  const [searchQuery, setSearchQuery] = useState('tetris+language:assembly&sort=stars&order=desc');
  const [repos, setRepos] = useState([]);

  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Display-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
  });

  const search =async ()=> {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&per_page=20`;
    try {
      const r = await axios.get(url,{
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_KEY}`,
          "X-GitHub-Api-Version": '2022-11-28',
        }
      });
      setRepos(r.data.items);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

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
        onPress={search}/>

        {/* List of results */}
        <FlatList
        style={styles.cardList}
        data={repos}
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

// Update font
// Highlight search term in titles and descriptions in results page
// Construct search query (search for terms in names, readmes, etc. instead of just submitting the keyword)
// Collapse the header on scroll
// Debounce on search input update
// Navigate to second page with details