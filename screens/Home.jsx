import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { coffee } from '../assets';

const Home = () => {
    const navigate = useNavigation();

    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false
        })
    }, []);
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="bg-white w-full h-[70%]">
                <Image
                    source={coffee}
                    className="w-full h-full rounded-1xl"
                />
            </View>
            <View>
                <Text>Coffee Ordering</Text>
                <Text>Made Simple</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home