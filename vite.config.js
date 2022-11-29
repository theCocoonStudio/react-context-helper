import { defineConfig } from "vite"; // to leverage intellisense
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const baseConfig = {
  plugins: [react()],
};

const production = {
  build: {
    chunkSizeWarningLimit: 100,
    lib: { entry: resolve(__dirname, "lib/main.jsx"), name: "ContextHelper" },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ["react, react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
};

const development = {
  build: { minify: false },
  clearScreen: false,
};

export default defineConfig(({ mode }) => ({
  ...baseConfig,
  ...{ development, production }[mode],
}));
