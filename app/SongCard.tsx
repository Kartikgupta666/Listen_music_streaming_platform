import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { IconSymbol } from '@/components/ui/IconSymbol';


// Sample Component to Render
const SongCard = ({ title, image, artist, url }) => {

    const navigation = useNavigation();
    const handleNavigation = () => {
        // console.log('Navigating to music player');
        navigation.navigate('MusicPlayer', { title, url, image });
    };
    const handelAddtoplaylist = () => {
        // console.log('Navigating to Add_to_playlist');
        navigation.navigate('Add_to_playlist', { title, image, artist, url });
    }

    return (
        <View style={styles.playlistItem} >
            <TouchableOpacity onPress={handleNavigation} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: image }}
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        resizeMode="cover" />
                    <View>
                        <Text style={styles.playlistTitle}>{title}</Text>
                        {/* <Text style={styles.playlistDescription}>{artist}</Text> */}
                    </View>
                </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={handelAddtoplaylist}>
                <IconSymbol size={30}  name="playlist-add" color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    searchIcon: {
        color: "#fff",
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    tabText: {
        color: "#fff",
        fontSize: 16,
    },
    playlistContainer: {
        flex: 1,
    },
    playlistItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        // borderBottomWidth: 1,
        paddingBottom: 16,
        paddingTop: 16,
        justifyContent: "space-between",
    },
    icon: {
        color: "#1DB954",
        marginRight: 16,
    },
    playlistTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 16,
    },
    playlistDescription: {
        color: "#B3B3B3",
        fontSize: 14,
        marginLeft: 16,
    },
});

export default SongCard
