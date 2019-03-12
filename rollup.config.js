import buble from "rollup-plugin-buble"
import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import {uglify} from "rollup-plugin-uglify"
import replace from "rollup-plugin-replace"
import includePaths from "rollup-plugin-includepaths"

export default {
  external: ["jquery"],
  plugins: [
    includePaths({
      include: {},
      paths: [`${process.env.npm_package_config_paths_src}/js`],
      external: [],
      extensions: [".js", ".json"]
    }),
    resolve({
      jsnext: true, // Default: false
      main: true, // Default: true
      browser: true,
      extensions: [".js", ".json"]
    }),
    commonjs({
      include: ["node_modules/**", `${process.env.npm_package_config_paths_src}/**`],
      extensions: [".js", ".json"],
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: true, // Default: true
    }),
    buble(),
    replace({
      exclude: "node_modules/**",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    (process.env.NODE_ENV === "production" && uglify())
  ],
  output: {
    format: "iife",
    globals: {
      jquery: "$"
    },
    sourcemap: (process.env.NODE_ENV !== "production") ? true : false
  }
}
