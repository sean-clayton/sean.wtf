module.exports = {
  purge: [
    "./src/pages/**/*.{js,md,mdx}",
    "./src/components/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        code: {
          green: "#b5f4a5",
          yellow: "#ffe484",
          purple: "#d9a9ff",
          red: "#ff8383",
          blue: "#93ddfd",
          white: "#fff",
        },
      },
      fontFamily: {
        mono:
          `"Triplicate T4c", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`,
        serif:
          `"Palatino Linotype", Garamond, "Hoefler Text", ui-serif, "Times New Roman", Times, serif`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
