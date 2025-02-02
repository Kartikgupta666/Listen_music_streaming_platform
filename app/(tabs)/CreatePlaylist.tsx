import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getId } from "../lib/Auth";
import { SavePlaylist } from "../lib/InsertData";

const CreatePlaylist = () => {
    const [id, setId] = useState("");
    const [inputText, setInputText] = useState("");
    const navigation = useNavigation();

    const fetchId = async () => {
        try {
            const retrievedId = await getId();
            // console.log(retrievedId)// Wait for the ID to be retrieved
            if (!retrievedId) {
                // If no ID, redirect to AuthScreen
                navigation.navigate("AuthScreen");
            } else {
                setId(retrievedId); // Set the ID if retrieved
            }
        } catch (error) {
            console.error("Failed to fetch ID:", error);
        }
    };

    useEffect(() => {
        fetchId();
    }, []);





    const handleNavigation = () => {
        navigation.navigate("playlist");
    };

    const handelSubmission = () => {
        if (inputText === '') {
            return "input Text is empty"
        }
        const newPlaylist = SavePlaylist(id, inputText);
        setInputText('')
        
        if (newPlaylist) {
            navigation.navigate("playlist", { refresh: true });
        }
    }

    return (


        <View style={styles.container}>
            <Text style={styles.Heading}>Give your Playlist a name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Playlist name"
                value={inputText}
                onChangeText={setInputText}
            // Called when the "Search" key is pressed
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonCancel} onPress={handleNavigation}>
                    <Text style={{ color: "white" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handelSubmission}>
                    <Text style={{ color: "white" }}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default CreatePlaylist;

const styles = StyleSheet.create({
    Heading: {
        color: "white",
        fontSize: 34,
        marginTop: 30,
        marginBottom: 40,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    input: {
        textAlign: "center",
        width: "80%",
        borderWidth: 1,
        fontSize: 18,
        borderColor: "grey",
        padding: 10,
        marginBottom: 20,
        color: "white",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "purple",
        padding: 15,
        borderRadius: 90,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    buttonCancel: {
        backgroundColor: "grey",
        padding: 15,
        borderRadius: 90,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
});
