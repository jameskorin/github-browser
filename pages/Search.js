import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import Logo from '../assets/github-mark.svg'
import { useState, useContext, useEffect, useRef } from 'react'
import RepoCard from '../components/RepoCard'
import SearchBar from '../components/SearchBar'
import { useFonts } from 'expo-font'
import { Context } from '../util/Context'

export default function Search({ navigation }) {

    const scrollRef = useRef();

    const originalWidth = 98;
    const originalHeight = 96;
    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = 40;

    const context = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    },[])

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

    useEffect(() => {
      scrollToTop();
    },[context.repos])

    const scrollToTop = () => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    const handleScroll =(event)=> {
      const scrollPosition = event.nativeEvent.contentOffset.y;
      if (scrollPosition > 62) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      Keyboard.dismiss();
    }

    const [fontsLoaded] = useFonts({
        'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    });

    if(!fontsLoaded) return null;

    return (<LinearGradient colors={['#e2dcee', '#f1f1f1']} style={styles.linearGradient}>

        <ScrollView ref={scrollRef} 
        stickyHeaderIndices={[1]} 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView} 
        onScroll={handleScroll}
        scrollEventThrottle={16}>

          {/* Header */}
        <View style={styles.header}>
          <View style={{ width: windowWidth, aspectRatio }}>
            <Logo width="100%" 
            height="100%" 
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}/>
          </View>
          <Text style={styles.title}>
            GitHub Repo Search
          </Text>
        </View>

          <SearchBar searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isSticky={isSticky}/>

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
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 14,
    marginLeft: 10
  },
  linearGradient: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 20
  }  
});