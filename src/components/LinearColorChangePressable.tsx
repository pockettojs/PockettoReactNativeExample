import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import { cn } from '../utils/cn';

export const LinearColorChangePressable = ({
    start,
    transitionColor = '#00ff00',
    children,
    className,
    onPress,
}: {
    start: boolean;
    transitionColor?: string;
    children?: React.ReactNode;
    className?: string;
    onPress?: () => void;
}) => {
    const [initialColor, setInitialColor] = useState('#ffffff');
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (start) {
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.delay(100),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [start]);


    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initialColor, transitionColor],
    });

    return (
        <Pressable onPress={onPress}>
            <Animated.View
                style={{
                    backgroundColor,
                }}
                className={cn(className)}
            >
                {children}
            </Animated.View>
        </Pressable>
    );
};

