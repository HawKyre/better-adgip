module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],

    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                120: '30rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwindcss-textshadow')],
};
