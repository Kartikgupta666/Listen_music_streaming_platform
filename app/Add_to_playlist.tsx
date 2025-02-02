
import PlaylistCard from "./PlaylistCard"
import { useEffect, useState } from "react"
import { getId } from "./lib/Auth"
import FetchData from "./lib/FetchData"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/core"
import { AddToPlaylist } from "./lib/InsertData"
import Loader from "@/components/Loader"
const Add_to_playlist = () => {
    const route = useRoute();
    const { title, image, artist, url } = route.params;
    const [playlists, setData] = useState([])
    const [loader, SetLoading] = useState(false)
    const fetchPlaylists = async () => {
        const id = await getId();
        const data = await FetchData(id);
        setData(data);
    }
    // console.log(playlists)
    useEffect(() => {
        SetLoading(true);
        fetchPlaylists();
        SetLoading(false);
    }, [])
    function handelAddtoplaylist(id) {
        console.log(id)
        const song = { title, image, artist, url }
        AddToPlaylist(song, id)
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Choose Playlist</Text>
            </View>


            {/* Playlist Items */}
            {loader ?<View style={{flex : 1 , justifyContent :"center" , alignItems : "center"}}> <Loader /> </View> : <ScrollView style={styles.playlistContainer}>
                {playlists.map((item, index) => (
                    <TouchableOpacity onPress={() => handelAddtoplaylist(item.playlist_id)} key={index}>
                        <PlaylistCard key={index} title={item.playlist_name} />
                    </TouchableOpacity>
                ))}
            </ScrollView>}
        </View>
    )
}

export default Add_to_playlist


const styles = StyleSheet.create({
    playlistContainer: {
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
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
});