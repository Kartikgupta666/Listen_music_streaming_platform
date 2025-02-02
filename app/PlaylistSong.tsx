import { ScrollView, Text, View, StyleSheet } from 'react-native';
import SongCard from './SongCard';
import Loader from '@/components/Loader';
import { useRoute } from "@react-navigation/native";
import { fetch_data_from_playlist_ID } from './lib/Playlistoperations';
import { useEffect, useState } from 'react';

const PlaylistSong = () => {
    const route = useRoute();
    const { id } = route.params;

    const [song, setSong] = useState([]);
    const [data, setData] = useState({}); // ✅ Initialize with an empty object
    const [loading, setLoader] = useState(true); // ✅ Start with loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch_data_from_playlist_ID(id);
            if (response && response.length > 0) {
                setData(response[0]); // ✅ Store the first object directly
                setSong(response[0].song_list || []); // ✅ Ensure `song_list` is always an array
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoader(false); // ✅ Stop loading after fetching
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{data?.playlist_name || "Loading..."}</Text>
            </View>

            {/* Playlist Items */}
            {loading ? (
                <Loader />
            ) : (
                <ScrollView style={styles.playlistContainer}>
                    {song.map((item, index) => (
                        <SongCard key={index} title={item.title} image={item.image} url={item.url} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default PlaylistSong;

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
