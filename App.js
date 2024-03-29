import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from './pages/Search'
import Repo from './pages/Repo'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Context } from './util/Context'
import { SafeAreaView, View } from 'react-native'
import { useFonts } from 'expo-font'

const Stack = createNativeStackNavigator();

export default function App() {

  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [languages, setLanguages] = useState([]);
  const [highlight, setHighlight] = useState('');

  useEffect(() => {
    setLanguages([]);
    if(selectedRepo !== '')
      getLanguages();
  },[selectedRepo])

  const search =async (searchQuery)=> {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&per_page=20`;
    try {
      const r = await axios.get(url,{
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_KEY}`,
          "X-GitHub-Api-Version": '2022-11-28',
        }
      });
      setHighlight(searchQuery);
      setRepos(r.data.items);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  const getLanguages =async ()=> {
    const repo = repos.find(e => e.id === selectedRepo);
    const url = `https://api.github.com/repos/${repo.full_name}/languages`;
    try {
      const r = await axios.get(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_KEY}`,
          "X-GitHub-Api-Version": '2022-11-28',
        }
      });
      let keysToStringArray = Object.entries(r.data).map(entry => entry[0]);
      if(keysToStringArray.length > 6)
        keysToStringArray = keysToStringArray.slice(0,6).concat(['Other']);
      setLanguages(keysToStringArray);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  const [fontsLoaded] = useFonts({
      'SF-Pro-Display-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
      'SF-Pro-Display-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
  });

  if(!fontsLoaded) return null;

  return (
    <>
    <SafeAreaView style={{ flex:0, backgroundColor: '#e2dcee' }} />
    <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <NavigationContainer>
        <Context.Provider value={{
          repos: repos,
          search: search,
          selectedRepo: selectedRepo,
          setSelectedRepo: setSelectedRepo,
          languages: languages,
          highlight: highlight
        }}>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Repo" component={Repo}/>
      </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
    </View>
    </>
  );
}