import { useRef } from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import { cn } from "src/utils/cn";

export function Input({
    value,
    onChange,
    keyboardType = 'default',
    className = "",
    disabled = false,
}: {
    value: string;
    onChange?: (value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    className?: string;
    disabled?: boolean;
}) {
    const ref = useRef(null);
    return <TextInput
        ref={ref}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChange}
        className={cn(
            "border rounded-md px-4 border-slate-300 h-12 w-full",
            className,
            disabled && "opacity-50"
        )}
        onFocus={() => {
            disabled && ref.current.blur();
        }}
    />
}