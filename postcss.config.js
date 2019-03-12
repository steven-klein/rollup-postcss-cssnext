const path = require("path")

module.exports = ({env}) => ({
  "map": (env !== "production") ? true : false,
  "plugins": {
    "postcss-import": {
      "path": [
        `${process.env.npm_package_config_paths_src}/css`
      ]
    },
    "postcss-apply": true,
    "postcss-preset-env": {
      "stage": 2,
      "features": {
        "custom-media-queries": true,
        "color-mod-function": {
          "unresolved": "error"
        },
        "custom-properties": {
          "preserve": false
        },
        "custom-selectors": true,
        "nesting-rules": true,
      }
    },
    "postcss-url": [
      {
        filter: '**/node_modules/**', // node_module assets
        url: "inline",
        ignoreFragmentWarning: true,
        maxSize: 1, // KB
        fallback: "copy",
        assetsPath: path.resolve(process.cwd(), `${process.env.npm_package_config_paths_dest}/vendor`),
        useHash: true,
        hashOptions: {
          append: true
        },
      },
      {
        filter: `**/${process.env.npm_package_config_paths_src}/**`, // catch everything else from project.
        url: "inline",
        maxSize: 1, // KB
        fallback: "copy",
        assetsPath: path.resolve(process.cwd(), `${process.env.npm_package_config_paths_dest}/local`),
        useHash: true,
        hashOptions: {
          append: true
        },
        basePath: path.resolve(process.cwd(), `${process.env.npm_package_config_paths_src}`)
      },
    ],
    "cssnano": (env === "production") ? {
      "safe": true,
      "autoprefixer": false // handled by postcss-preset-env
    } : false,
    "postcss-browser-reporter": (env !== "production") ? true : false,
    "postcss-reporter": (env !== "production") ? true : false
  }
})
