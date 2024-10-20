import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

export function DemoRealTimeView({
    navigation,
}: {
    navigation: NativeStackScreenProps<any>['navigation'];
}) {
    const route = useRoute();
    const { id } = route.params;
    console.log('id: ', id);

    return <View></View>
}