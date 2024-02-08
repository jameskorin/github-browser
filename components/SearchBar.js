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

    return <View style={styles.searchContainer}>

        <SearchIcon/>

        <TextInput placeholder='Search' 
        style={{fontFamily: 'SF-Pro-Display-Regular', ...styles.searchInput}} 
        onChangeText={text => setSearchQuery(text)} 
        value={searchQuery}/>

        <ClearSearchIcon width="18px" height="18px" onPress={() => setSearchQuery('')}/>
    </View>;
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: "#edebf4",
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 9,
        color: "#000000",
        marginTop: 20,
        marginHorizontal: 30,
        flexDirection: "row",
        alignItems: "center"
    },
    searchInput: {
      width: "100%",
      marginLeft: 14
    } 
  });