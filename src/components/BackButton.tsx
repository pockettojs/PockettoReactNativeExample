import { View, Text, Pressable, Animated } from "react-native";
import React, { forwardRef, useRef } from 'react';
import { ChevronLeft } from "src/components/icons/ChevronLeft";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const BackButton = forwardRef<React.ElementRef<typeof Pressable>, { onPress: () => void }>(
    ({ onPress }, ref) => {
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
                ref={ref}
                className="flex flex-row items-center py-2 px-0 rounded-md"
                style={{
                    transform: [{ scale }],
                }}
                onPress={onPress}
                onPressIn={() => animateScale(0.9)}
                onPressOut={() => animateScale(1)}
            >
                <ChevronLeft className='w-8 h-8 text-react-700' />
                <View className="w-1"></View>
                <Text className="text-react-700 font-medium text-xl">Back</Text>
            </AnimatedPressable>
        );
    }
);
