import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";

export function DemoRealTimeListView({
    navigation,
}: {
    navigation: NativeStackScreenProps<any>['navigation'];
}) {
    return <View className="w-full h-full bg-white">
        <Text className="p-4 text-2xl font-medium">React Native + Pocketto</Text>
        <Pressable
            className="p-4 bg-gray-200"
            onPress={() => {
                navigation.navigate('realtime/:id', { id: 'new' });
            }}
        >
            <Text className="text-lg">Add New</Text>
        </Pressable>
    </View>
}