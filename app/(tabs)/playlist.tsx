import PlaylistCard from "../PlaylistCard";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import FetchData from "../lib/FetchData";
import { getId } from "../lib/Auth";
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import Loader from "@/components/Loader";

const PlaylistScreen = () => {
  const [playlists, setData] = useState([]);
  const [loading, SetLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const fetchPlaylists = async () => {

    SetLoading(true)
    try {
      const id = await getId();
      const data = await FetchData(id);
      // console.log("Fetched Playlists:", data); // ✅ Debugging API Response
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
    SetLoading(false)

  };

  useEffect(() => {
    fetchPlaylists();
    if (route.params?.refresh) {  // ✅ Check if refresh is needed
      fetchPlaylists();
      navigation.setParams({ refresh: false }); // ✅ Reset flag
    }
  }, [route.params?.refresh]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
      </View>

      {/* Playlist Items */}
      {loading ? <Loader /> : <ScrollView style={styles.playlistContainer}>
        {playlists.map((item, index) => {
          const id = item.playlist_id;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => item.playlist_id
                ? navigation.navigate("PlaylistSong", { id })
                : console.warn("Missing playlist_id", item)
              }
            >
              <PlaylistCard
                title={item.playlist_name}
                id={item.playlist_id} // ✅ Handle missing ID
                refreshPlaylists={fetchPlaylists}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>}
    </View>
  );
};

export default PlaylistScreen;

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
