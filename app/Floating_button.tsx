
import { TouchableOpacity, StyleSheet, View } from "react-native"
import Loader from "@/components/Loader"
import { useNavigation } from "@react-navigation/native";


const Floating_button = () => {
   const navigation = useNavigation()
    return (<View>
        <TouchableOpacity style={styles.overlayButton} onPress={()=>navigation.navigate('MusicPlayer')} >
            <Loader />
        </TouchableOpacity>
    </View>)
}

export default Floating_button

const styles = StyleSheet.create({
    overlayButton: {
        position: "absolute",
        bottom: 60,
        right: 20,
        backgroundColor: "purple",
        paddingTop: 19,
        paddingBottom: 19,
        paddingRight: 26,
        paddingLeft: 26,
        borderRadius: 50,
        zIndex: 100,
        elevation: 5, // For Android shadow
        margin:2
    }
})