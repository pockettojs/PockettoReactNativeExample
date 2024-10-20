import React, { useRef, useState } from "react";
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
            duration: 100, // Duration of the animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    };

    return (
        <AnimatedPressable
            onPressIn={() => animateScale(0.9)}  // Scale down when pressed
            onPressOut={() => animateScale(1)}    // Scale back up when released
            onPress={onPress}                     // Execute onPress action
            style={[{ transform: [{ scale }] }]}  // Apply the animated scale value
            className="p-2 rounded-md bg-react-700"
        >
            <Text className="text-white font-semibold text-lg text-center">
                {label}
            </Text>
        </AnimatedPressable>
    );
}
