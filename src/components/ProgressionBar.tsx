import { useCallback } from "react";
import { DimensionValue, View } from "react-native";
import { cn } from "src/utils/cn";

export function ProgressionBar({
    percentage,
}: {
    percentage: number;
}) {
    const getPaidColor = useCallback((percentage: number) => {
        if (percentage >= 50) {
            return 'bg-success';
        }
        if (percentage >= 20) {
            return 'bg-warning';
        }
        return 'bg-error';
    }, []);

    return <View className={cn(
        'h-1 rounded-full bg-gray-300',
    )}>
        <View
            className={cn(
                'h-1 rounded-full',
                getPaidColor(percentage),
            )}
            style={{
                width: percentage + '%' as DimensionValue,
            }}
        ></View>
    </View>;
}