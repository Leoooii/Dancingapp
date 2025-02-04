
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { Client, Account, ID, Models } from 'react-native-appwrite';
import React, { useState } from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";


let client: Client;
let account: Account;

client = new Client();
client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT!)
// .setPlatform('com.lione.inpasidedans');  // Your package name / bundle identifier

 account = new Account(client);
export {account}
export default function App() {
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function login(email: string, password: string) {
        console.log(email, password, 'pressed');
        try {
            const response = await account.createEmailPasswordSession(email, password);
            console.log('Session created:', response);  // Debugging log
            setLoggedInUser(await account.get());
            router.push('/(admin)');
        } catch (error) {
            console.error('Login error:', error);  // Capturing and logging any error
        }
    }


    async function register(email: string, password: string, name: string) {
        console.log(email, password, name, 'register pressed');  // Debugging log
        try {
            const response = await account.create(ID.unique(), email, password, name);
            console.log('Account created:', response);  // Log when account creation is successful
            await login(email, password);  // Login immediately after registration
        } catch (error) {
            console.error('Register error:', error);  // Log any error encountered
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text className={'text-white'}>
                {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
            </Text>
            <Image
                source={require("../../assets/images/logo3.png")}
                resizeMode={"contain"}
                className={'w-full mb-10'}
            />
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => login(email, password)}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> register(email, password, name)}
                >
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await account.deleteSession('current');
                        setLoggedInUser(null);
                    }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        padding:50
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
});


