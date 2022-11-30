import { defineConfig } from "vite"; // to leverage intellisense
import react from "@vitejs/plugin-react";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { resolve } from "path";

const baseConfig = {
  plugins: [peerDepsExternal(), react()],
};

const production = {
  build: {
    chunkSizeWarningLimit: 100,
    lib: {
      entry: resolve(__dirname, "src/lib/main.jsx"),
      name: "ContextHelper",
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ["react, react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
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
