import { StyleSheet, TextInput, View } from 'react-native'
import SearchIcon from '../assets/search.svg'
import ClearSearchIcon from '../assets/x.svg'
// import { useFonts } from 'expo-font'

export default function SearchBar({
    searchQuery,
    setSearchQuery
}) {

    // const [fontsLoaded] = useFonts({
    //     'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    //     'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    // });

    return <View style={styles.outer}>
        <View style={styles.searchContainer}>

        <SearchIcon/>

        <TextInput placeholder='Search' 
        style={{fontFamily: 'SF-Pro-Display-Regular', ...styles.searchInput}} 
        onChangeText={text => setSearchQuery(text)} 
        value={searchQuery}/>

        <ClearSearchIcon style={styles.clear} onPress={() => setSearchQuery('')}/>
    </View>
    </View>;
}

const styles = StyleSheet.create({
    outer: {
        width: "100%",
        paddingHorizontal: 30
    },
    searchContainer: {
        backgroundColor: "#edebf4",
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 9,
        color: "#000000",
        flexDirection: "row",
        alignItems: "center"
    },
    searchInput: {
      marginLeft: 14
    },
    clear: {
        width: 18,
        height: 18,
        position: "absolute",
        right: 14
    }
  });