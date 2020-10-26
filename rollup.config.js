import babel from "@rollup/plugin-babel";
import localResolve from "rollup-plugin-local-resolve";
import copy from "rollup-plugin-copy";
import typescript from 'rollup-plugin-typescript2';

const config = [
  {
    input: "src/client/public/js/index.js",
    output: {
      dir: "dist/client/public/js",
      format: "iife",
    },
  },
  {
    input: "src/server/app.ts",
    output: {
      dir: "dist/server",
      format: "cjs",
    },
    plugins: [
      typescript({
        typescript: require('typescript')
      }),
      localResolve(),
      babel({ babelHelpers: "runtime" }),
      copy({
        targets: [
          { src: "src/client/public/css", dest: "dist/client/public" },
          { src: "src/client/public/images", dest: "dist/client/public" },
          { src: "src/client/views", dest: "dist/client" },
        ],
      }),
    ],
  },
];

export default config;
