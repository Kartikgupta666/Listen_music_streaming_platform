import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getId, signIn, signUp } from './lib/Auth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
const AuthScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        getId()
    }, [])


    // Handle login
    const handleLogin = async () => {
        signIn(email, password)
        navigation.navigate("(tabs)", { sAuthScreen: "CreatePlaylist" });
    };

    // Handle signup
    const handleSignup = async () => {
        signUp(email, password)
        navigation.navigate("(tabs)", { sAuthScreen: "CreatePlaylist" });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button style={styles.login}
                title={isLogin ? 'Login' : 'Sign Up'}
                onPress={isLogin ? handleLogin : handleSignup}
            />

            <Button style={styles.switch}
                title={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white'
    },
    login: {
        backgroundColor: "purple",
        marginBottom:1
    },
    switch: {
        marginTop:1,
        backgroundColor: "transparent"
    }
});

export default AuthScreen;