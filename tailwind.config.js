module.exports = {
  purge: [
    "./src/pages/**/*.{js,md,mdx}",
    "./src/components/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
              backgroundColor: "transparent",
              color: "currentColor",
            },
          },
        },
        lg: {
          css: {
            pre: {
              padding: 0,
              backgroundColor: "transparent",
              color: "currentColor",
            },
          },
        },
      },
      fontFamily: {
        mono:
          `"Triplicate T4c", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`,
        serif:
          `"Source Serif Variable", Iowan Old Style, Apple Garamond, Palatino Linotype, Times New Roman, "Droid Serif", Times, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
