import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import asyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../utils/http';
import { useDispatch } from "react-redux"
import { baseUrl } from '../App';
import { actions } from '../redux/slice/userSlice';


const Home = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const [user, setUser] = useState({ email: "", password: "" })

    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false
        })
    }, []);

    const login = async () => {
        try {
            const { data = {} } = await http({}).post(`${baseUrl}/api/users/login`, user)
            if (data?.token) {
                await asyncStorage.setItem('token', data?.token);
                navigate.navigate("Home");
                dispatch(actions.addUser(data))
            }

        } catch (error) {
            console.log("Error: [login]", error)
        }
    }
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="bg-white w-full h-[70%]">
                <Text
                    className="pb-1 pt-2 width-full h-[10%] text-center">
                    Sign In</Text>
                <TextInput
                    placeholder='Email'
                    className="border-b-2 border-gray-300 pb-1 width-full h-[10%] rounded-sm"
                    onChangeText={(val) => setUser({ ...user, email: val })}
                    value={user.email}
                />
                <TextInput
                    placeholder='Password'
                    className="border-b-2 border-gray-300 pb-1 width-full h-[10%] rounded-sm"
                    onChangeText={(val) => setUser({ ...user, password: val })}
                    value={user.password}
                />
                <TouchableOpacity className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12" onPress={() => {
                    login()
                }}>
                    <Text className="text-2xl font-semibold uppercase tracking-wider text-gray-100">
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Home