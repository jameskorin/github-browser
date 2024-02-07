import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from './pages/Search'
import Repo from './pages/Repo'
import axios from 'axios'
import { useState, createContext, useEffect } from 'react'

const Stack = createNativeStackNavigator();

export const Context = createContext({ repos: [], search: null });

export default function App() {

  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');

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

  return (
      <NavigationContainer>
        <Context.Provider value={{
          repos: repos,
          search: search,
          selectedRepo: selectedRepo,
          setSelectedRepo: setSelectedRepo
        }}>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Repo" component={Repo}/>
      </Stack.Navigator>
      </Context.Provider>
      </NavigationContainer>
  );
}

// Navigate to second page with details
// Navigate back to main page with back arrow

// Get rid of that hokey ass header from the navigation wrapper

// Collapse the header on scroll
// Debounce on search input update and call endpoint from input changes

// Fix font import issue

// Highlight search term in titles and descriptions in results page
// Construct search query (search for terms in names, readmes, etc. instead of just submitting the keyword)