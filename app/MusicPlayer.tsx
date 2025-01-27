import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSearchParams } from "expo-router/build/hooks";
import { useRoute } from "@react-navigation/native";
// const songs = [
//     {
//         id: 1,
//         title: "Song 1",
//         uri: "https://aac.saavncdn.com/838/39dff4f5619081d57c8d690499a08552_320.mp4",
//         artwork: "https://c.saavncdn.com/186/Sunday-Trending-Version-Hindi-2024-20240119190236-500x500.jpg", // Add album art here
//     },
//     {
//         id: 2,
//         title: "Song 2",
//         uri: "https://aac.saavncdn.com/370/c8be69132a8d065ab3f5dfeb9b1f9d75_320.mp4",
//         artwork: "https://c.saavncdn.com/370/Love-Today-2004-500x500.jpg", // Add album art here
//     },
// ];

const MusicPlayer = () => {
    const route = useRoute();
    const { url , title ,image } = route.params;
    console.log(image)
   
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        loadAudio();
        return () => {
            if (sound) sound.unloadAsync(); // Cleanup on component unmount
        };
    }, [currentIndex]);



    const loadAudio = async () => {
        if (!url) {
            console.error("No URL provided for audio playback");
            return;
        }

        if (sound) {
            await sound.unloadAsync();
        }

        try {
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
        }
        catch (error) {
            console.log(error)
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

    const handleNext = () => {
            // const nextIndex = (currentIndex + 1) % songs.length;
            // setCurrentIndex(nextIndex);
    };

    const handlePrevious = () => {
            // const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            // setCurrentIndex(prevIndex);
    };

    const handleSliderChange = async (value) => {
        if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 50000);
        const seconds = Math.floor((time % 50000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <View style={styles.container}>
            {/* Album Art */}
            <Image
                source={{ uri: image }}
                style={styles.artwork}
            />
            {/* Song Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Progress Bar */}
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
                    onValueChange={handleSliderChange}
                />
                <Text style={styles.time}>
                    {formatTime(duration) || "0:00"}
                </Text>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity onPress={handlePrevious}>
                    <IconSymbol size={50} name="play-skip-back" color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePlayPause}>
                    <IconSymbol size={50} name={isPlaying ? "pause-circle" : "play-circle"} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <IconSymbol size={50} name="play-skip-forward" color="white" />
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
    button: {
        backgroundColor: "#1DB954",
        padding: 15,
        borderRadius: 50,
        width: "30%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default MusicPlayer;
