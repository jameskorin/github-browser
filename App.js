import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import Logo from './assets/github-mark.svg'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function App() {

  const originalWidth = 98;
  const originalHeight = 96;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = 50;

  const [searchQuery, setSearchQuery] = useState('tetris+language:assembly&sort=stars&order=desc');
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.log(searchQuery);
  },[searchQuery])

  const search =async ()=> {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&per_page=20`;
    console.log(`fetching: ${searchQuery}`);
    try {
      const r = await axios.get(url,{
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_KEY}`,
          "X-GitHub-Api-Version": '2022-11-28',
        }
      });
      console.log('done');
      console.log(r.data);
      setRepos(r.data.items);
    } catch (err) {
      console.log(JSON.stringify(err));
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
          <Text style={styles.title}>GitHub Repo Search</Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder='Search' style={styles.searchInput} onChangeText={text => setSearchQuery(text)} value={searchQuery}/>
        </View>

        <Button title={'Seach'}
        onPress={search}/>

        {/* List of results */}
        {repos.map((item,index) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        ))}
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 9,
    color: "#000000"
  },
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


// Make the call to search
// Debounce on search input update
// Display the list of results
// Navigate to second page with details