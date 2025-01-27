import PlaylistCard from "../PlaylistCard";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

export default playlist = () => {
  const playlists = [
    { title: "Your Episodes", description: "Saved & downloaded episodes", icon: "bookmark" },
    { title: "Liked Songs", description: "Playlist • 34 songs", icon: "heart" },
    { title: "Chill Hits", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "Aditya Rikhari Mix", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "My top tracks playlist", description: "Playlist • Kartik Gupta", icon: "music" },
    { title: "Your Episodes", description: "Saved & downloaded episodes", icon: "bookmark" },
    { title: "Liked Songs", description: "Playlist • 34 songs", icon: "heart" },
    { title: "Chill Hits", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "Aditya Rikhari Mix", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "My top tracks playlist", description: "Playlist • Kartik Gupta", icon: "music" },
    { title: "Your Episodes", description: "Saved & downloaded episodes", icon: "bookmark" },
    { title: "Liked Songs", description: "Playlist • 34 songs", icon: "heart" },
    { title: "Chill Hits", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "Aditya Rikhari Mix", description: "Playlist • Made for Kartik Gupta", icon: "music" },
    { title: "My top tracks playlist", description: "Playlist • Kartik Gupta", icon: "music" },
    { title: "Trending Now India", description: "Playlist • Made for Kartik Gupta", icon: "music" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
      </View>


      {/* Playlist Items */}
      <ScrollView style={styles.playlistContainer}>
        {playlists.map((item, index) => (
          <PlaylistCard key={index} title={item.title} description={item.description} />
        ))}
      </ScrollView>
    </View>
  );
};

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