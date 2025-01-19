import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '410px',
            },
            flex: {
                '0.5': '0.5',
            },
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: ["light"],
    },
};