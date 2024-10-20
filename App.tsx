import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
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
        </SafeAreaView>
    );
}
export default App;
