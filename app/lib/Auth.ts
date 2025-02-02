import AsyncStorage from "@react-native-async-storage/async-storage";
import Supabase from "./Supabase"

// Sign up
const signUp = async (email, password) => {
    try {
        const { data, error } = await Supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Sign up error:', error.message);
        } else {
            console.log('User signed up:', data);
            console.log(data.user.id);
            setId(data.user.id)
        }
    }
    catch (error) {
        console.log(error)
    }
};

// Sign in
const signIn = async (email, password) => {
    try {
        const { data, error } = await Supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Sign in error:', error.message);
            // return false;
        } else {
            console.log('User signed in:', data);
            console.log(data.user.id);
            setId(data.user.id)
            // return true;
        }
    }
    catch (error) {
        console.log(error)
    }
};

// Sign out
const signOut = async () => {
    const { error } = await Supabase.auth.signOut();

    if (error) {
        console.error('Sign out error:', error.message);
    } else {
        console.log('User signed out');
    }
};

const setId = async (id) => {
    try {
        await AsyncStorage.setItem('user_id', id);
        console.log('ID stored successfully!');
    } catch (error) {
        console.error('Failed to store the ID:', error);
    }
}

const getId = async () => {

    try {
        const id = await AsyncStorage.getItem('user_id');
        if (id !== null) {
            // console.log('Retrieved ID:', id);
            return id;
        }
    } catch (error) {
        console.error('Failed to retrieve the ID:', error);
    }
};

export { signIn, signUp, getId }