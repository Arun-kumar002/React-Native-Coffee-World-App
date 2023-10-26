import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { coffee } from '../assets';
import asyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux"

const Home = () => {
    const navigate = useNavigation();
    const user = useSelector(state => state.user);
    console.log(user)
    const getKey = async () => {
        try {
            const value = await asyncStorage.getItem('token');
            console.log(value)
        } catch (error) {
            console.log("Error:[getKey]", error)
        }
    }
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false
        })
        getKey().then()
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