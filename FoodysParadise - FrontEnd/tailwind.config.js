/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Editorial cookbook" palette -- warm paper instead of stark white,
        // a terracotta/paprika brand accent instead of default Tailwind
        // yellow. Every color used site-wide should trace back to one of
        // these tokens rather than an ad hoc Tailwind default or one-off hex.
        paper: "#FAF3E6",
        sand: "#EDE1CB",
        ink: "#2A211A",
        "ink-light": "#6B5D4F",
        paprika: "#C1502E",
        "paprika-dark": "#A43F22",
        saffron: "#E0A438",
        sage: "#74804F",
        brick: "#9C3B2E",
      },
      fontFamily: {
        // Mogent: existing local brand font, scoped to the logo wordmark +
        // homepage hero headline only -- not a catch-all like `.custom-font`
        // used to be. Fraunces: recipe titles/section headers (the
        // editorial/cookbook voice). Inter: everything functional.
        display: ["Mogent", "cursive"],
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
