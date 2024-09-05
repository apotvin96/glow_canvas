/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: "#fc4d3f",
                gray: "#54545c",
            },
            fontFamily: {
                oswald: ["Oswald", "sans-serif"],
                "roboto-mono": ["Roboto Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
