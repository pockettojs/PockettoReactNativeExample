import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    Linking,
    SafeAreaView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { DemoRealTimeListView } from './src/pages/DemoRealTimeListView';
import { DemoRealTimeView } from './src/pages/DemoRealTimeView';

const SCREEN_OPTIONS = {
    headerShown: false,
    animation: 'default',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
};

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    };

    return (
        <SafeAreaView style={backgroundStyle} className='w-full h-full'>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View className='h-full w-full bg-white'>
                <View className="flex flex-row justify-start px-4 pt-4">
                    <Text
                        onPress={() => {
                            Linking.openURL('https://reactnative.dev/');
                        }}
                        className="text-2xl font-semibold text-react-500 underline"
                    >React Native</Text>
                    <Text className="text-2xl font-semibold text-black"> + </Text>
                    <Text
                        className="text-2xl font-semibold text-[#646cff] underline"
                        onPress={() => {
                            Linking.openURL('https://pocketto.dev/');
                        }}
                    >Pocketto</Text>
                </View>
                <Text className="px-4 text-slate-500 text-sm">
                    Click on the React Native and Pocketto text to learn more
                </Text>
                <View className="h-4"></View>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
                        <Stack.Screen
                            name="realtime-list"
                            component={DemoRealTimeListView}
                        />
                        <Stack.Screen
                            name="realtime/:id"
                            component={DemoRealTimeView}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    );
}
export default App;
