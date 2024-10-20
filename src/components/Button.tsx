import React, { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function Button({
    onPress,
    label,
}: {
    onPress?: () => void;
    label: string;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const animateScale = (toValue: number) => {
        Animated.timing(scale, {
            toValue,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <AnimatedPressable
            onPressIn={() => animateScale(0.9)}
            onPressOut={() => animateScale(1)}
            onPress={onPress}
            style={[{ transform: [{ scale }] }]}
            className="py-2 px-4 rounded-md bg-react-700"
        >
            <Text className="text-white font-medium text-lg text-center">
                {label}
            </Text>
        </AnimatedPressable>
    );
}
