import { StyleSheet, TextInput, TouchableHighlight, View } from 'react-native'
import SearchIcon from '../assets/search.svg'
import ClearSearchIcon from '../assets/x.svg'

export default function SearchBar({
    searchQuery,
    setSearchQuery,
    isSticky
}) {

    return <View style={[styles.outer, isSticky && styles.sticky]}>
        <View style={styles.searchContainer}>

        <SearchIcon style={styles.searchIcon}/>

        <TextInput placeholder='Search'
        style={{fontFamily: 'SF-Pro-Display-Regular', ...styles.searchInput}} 
        onChangeText={text => setSearchQuery(text)} 
        value={searchQuery}/>

        <TouchableHighlight onPress={() => setSearchQuery('')} 
        style={styles.clear} 
        underlayColor={'#edebf4'}>
            <View style={{
                width: 18,
                height: 18
            }}>
                <ClearSearchIcon style={{
                    position: 'absolute',
                    top: -2,
                    left: 0
                }}/>
            </View>
        </TouchableHighlight>
    </View>
    </View>;
}

const styles = StyleSheet.create({
    outer: {
        width: "100%",
        paddingHorizontal: 30,
        paddingBottom: 16,
        marginBottom: 2
    },
    sticky: {
        backgroundColor: "#e2dcee",
        borderBottomColor: "#D9D2E5",
        borderBottomWidth: 1
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
      marginLeft: 14,
      width: "80%",
      maxWidth: "80%"
    },
    clear: {
        width: 18,
        height: 18,
        position: "absolute",
        right: 14
    },
    searchIcon: {
        width: 24,
        height: 24
    }
  });