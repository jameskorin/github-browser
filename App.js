import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from './pages/Search'
import Repo from './pages/Repo'
import axios from 'axios'
import { useState, createContext, useEffect } from 'react'
import NavHeader from './components/NavHeader'

const Stack = createNativeStackNavigator();

export const Context = createContext({ repos: [], search: null });

export default function App() {

  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [languages, setLanguages] = useState([]);

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

  return (
      <NavigationContainer>
        <Context.Provider value={{
          repos: repos,
          search: search,
          selectedRepo: selectedRepo,
          setSelectedRepo: setSelectedRepo,
          languages: languages
        }}>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}
        options={{ headerTitle: (props) => <NavHeader {...props} /> }}/>
        <Stack.Screen name="Repo" component={Repo}
        options={{ headerTitle: (props) => <NavHeader {...props} /> }}/>
      </Stack.Navigator>
      </Context.Provider>
      </NavigationContainer>
  );
}

// Navigation header
  // Navigate back to main page with back arrow
  // Get rid of that hokey ass header from the navigation wrapper

// Search page
  // Collapse the header on scroll
  // Debounce on search input update and call endpoint from input changes
  // Add a chin to the bottom of the results page
  // Truncate long full names on cards in list
  // Scroll to top of list on list change

// Fix font import issue

// Highlight search term in titles and descriptions in results page
// Construct search query (search for terms in names, readmes, etc. instead of just submitting the keyword)

// Check UI scaling on all device resolutions