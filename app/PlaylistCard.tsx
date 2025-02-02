import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { deletePlaylist } from './lib/Playlistoperations';
const PlaylistCard = ({ title, description, id, refreshPlaylists }) => {
      
    return (
        <View style={styles.playlistItem}>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconSymbol size={40} name="music" color="white" />
                <View>
                    <Text style={styles.playlistTitle}>{title}</Text>
                    <Text style={styles.playlistDescription}>Playlist • {description}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => deletePlaylist(id, refreshPlaylists)}>
                <IconSymbol size={30} name="delete" color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default PlaylistCard


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
        borderBottomWidth: 1,
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

