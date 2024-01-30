/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    maxWidth: {
      container: "1440px"
    },
    screens: {
      xs: "320px",
      sm: "375px",
      small: "500px",
      md: "768px",
      lg: "960px",
      large: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      title: ["Roboto", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    //colors
  },
};
export const plugins = [];


