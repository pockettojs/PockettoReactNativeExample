import React, { useEffect, useRef } from "react";
import { Animated, Text, useWindowDimensions, View } from "react-native";
import { cn } from "../utils/cn";

export function Alert({
    show = false,
    type,
    title,
    icon,
}: {
    show?: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    icon?: React.ReactNode;
}) {
    const { height } = useWindowDimensions();
    const translateY = useRef(new Animated.Value(height + 200)).current;

    useEffect(() => {
        if (show) {
            Animated.timing(translateY, {
                toValue: 4,
                duration: 800,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: height + 200,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [show, translateY]);

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
            }}
            className={cn(
                'absolute bottom-[20px] left-[4%] w-[92%] px-6 py-4 rounded-md z-40',
                type === 'success' && 'bg-success',
                type === 'error' && 'bg-error',
                type === 'warning' && 'bg-warning',
                type === 'info' && 'bg-info',
                !type && 'bg-info'
            )}
        >
            <View className="flex flex-row">
                {icon}
                <Text className="mt-0.5 text-[16px] text-white font-medium">{title}</Text>
            </View>
        </Animated.View>
    );
}
