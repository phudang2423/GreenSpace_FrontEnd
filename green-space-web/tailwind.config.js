module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your React component files
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-up": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "fade-out-up": "fade-out-up 0.7s ease-out",
      },
    },
  },
  plugins: [],
};
