/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-coin": "spin-coin 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        "spin-coin": {
          "0%": { transform: "rotateX(0deg) translateY(0)" },
          "50%": { transform: "rotateX(720deg) translateY(-150px)" },
          "100%": { transform: "rotateX(1440deg) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
