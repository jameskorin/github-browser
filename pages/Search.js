import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import Logo from '../assets/github-mark.svg'
import { useState, useContext, useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import SearchBar from '../components/SearchBar'
// import { useFonts } from 'expo-font'
import { Context } from '../util/Context'

export default function Search({ navigation }) {

    navigation.setOptions({ headerShown: false });

    const originalWidth = 98;
    const originalHeight = 96;
    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = 40;

    const context = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('tetris+language:assembly&sort=stars&order=desc');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }, [searchQuery]);

    useEffect(() => {
      if (debouncedSearchQuery)
        context.search(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const handleScroll =(event)=> {
      const scrollPosition = event.nativeEvent.contentOffset.y;
      if (scrollPosition > 62) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    // const [fontsLoaded] = useFonts({
    //     'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    //     'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    // });

    return (<LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>

        <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}
        style={styles.scrollView} onScroll={handleScroll}
        scrollEventThrottle={16}>

          {/* Header */}
        <View style={styles.header}>
          <View style={{ width: windowWidth, aspectRatio }}>
            <Logo width="100%" 
            height="100%" 
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}/>
          </View>
          <Text style={{fontFamily: 'SF-Pro-Display-Bold', ...styles.title}}>
            GitHub Repo Search
          </Text>
        </View>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSticky={isSticky}/>

          {context.repos.map((item, index) => (
            <RepoCard
            repo={item}
            key={item.id}
            navigate={navigation.navigate}/>
          ))}

        </ScrollView>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    paddingBottom: 60
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxHeight: 50,
    paddingHorizontal: 30,
    marginBottom: 24
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
    paddingVertical: 20
  }  
});