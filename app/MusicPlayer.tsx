import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRoute } from "@react-navigation/native";

const MusicPlayer = () => {
    const route = useRoute();
    const { url, title, image } = route.params;

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        loadAudio();

        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, [url]);  // Ensure this runs when a new song is selected

    const loadAudio = async () => {
        try {
            // Stop and unload previous sound if exists
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );

            setSound(newSound);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);
                }
            });

            setIsPlaying(true);
        } catch (error) {
            console.error("Error loading audio:", error);
        }
    };

    const handlePlayPause = async () => {
        if (!sound) return;

        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = async (value) => {
        if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.artwork} />
            <Text style={styles.title}>{title}</Text>

            <View style={styles.progressBarContainer}>
                <Text style={styles.time}>{formatTime(position)}</Text>
                <Slider
                    style={styles.slider}
                    value={position / duration || 0}
                    minimumValue={0}
                    maximumValue={1}
                    thumbTintColor="#fff"
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="#ccc"
                    onSlidingComplete={handleSliderChange}
                />
                <Text style={styles.time}>
                    {formatTime(duration) || "0:00"}
                </Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={handlePlayPause}>
                    <IconSymbol size={50} name={isPlaying ? "pause-circle" : "play-circle"} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282828",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    artwork: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        color: "#fff",
        marginBottom: 10,
        textAlign: "center",
    },
    progressBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 10,
    },
    slider: {
        flex: 1,
        marginHorizontal: 10,
    },
    time: {
        color: "#fff",
        fontSize: 14,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 20,
    },
});

export default MusicPlayer;
