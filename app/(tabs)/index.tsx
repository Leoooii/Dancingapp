import React from 'react';
import {View, Text, Button, ImageBackground,StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import '../../global.css'
import { router} from "expo-router";


const IndexScreen=()=>{
    const image = {uri: 'https://www.inpasidedans.ro/wp-content/uploads/2016/07/logo-in-pasi-de-dans.png'};

    return  <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']} className={'p-10'}>
            <ImageBackground source={image} resizeMode="contain" style={styles.image} className={'p-10'}>
                <Text style={styles.text}>In pasi de dans!</Text>
                <View className={'flex flex-row gap-2 justify-center'} >
                    <Button title={'Intrare in cont'} onPress={()=>{router.push('/(tabs)/auth')}} color={'red'} />


                </View>
            </ImageBackground>
        </SafeAreaView>
    </SafeAreaProvider>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'space-around',
        // backgroundColor:'blue'
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#000000c0',
    },
});

export default IndexScreen;  // Exportă componenta corect