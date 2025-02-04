import {  Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";



export default function Index() {



    return (
        <SafeAreaView className={'bg-blue-950 flex-1 px-5'}>
            <Text className={'text-white text-center mb-5'}>Salutare admin </Text>
            <Text>Adauga profesoare</Text>
        </SafeAreaView>
    )
}
