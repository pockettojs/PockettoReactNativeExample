/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                success: '#179C5F',
                error: '#FF3B30',
                info: '#007AFF',
                warning: '#FF9500',
                react: {
                    50: '#E3F8FF',
                    100: '#B3ECFF',
                    200: '#81DEFD',
                    300: '#5ED0FA',
                    400: '#40C3F7',
                    500: '#61DAFB',
                    600: '#1B9BFF',
                    700: '#0B83F0',
                    800: '#0071E3',
                    900: '#0055B4',
                }
            },
        },
    },
    plugins: [],
};
