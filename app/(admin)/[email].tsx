import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

export default function Profile(){
    const { email } = useLocalSearchParams();

    return <SafeAreaView>
        <Text>{email}</Text>

    </SafeAreaView>
}