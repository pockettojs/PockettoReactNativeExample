import { Animated, Text, View } from "react-native";
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
    if (!show) return <></>;
    return <Animated.View
        // initial={{ opacity: 0, y: -200 }}
        // animate={{ opacity: 1, y: 4 }}
        // exit={{ opacity: 0, y: -200 }}
        // transition={{ duration: 0.5 }}
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
            <Text className="text-white font-medium">{title}</Text>
        </View>
    </Animated.View>;
}