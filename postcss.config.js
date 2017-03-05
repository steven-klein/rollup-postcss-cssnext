var POSTCSS = {
    "input": "src/css/app.css",
    "output": "build/css/app.css",
    "use": [
        "postcss-import",
        "postcss-cssnext",
        "postcss-browser-reporter",
        "postcss-reporter"
    ],
    "postcss-import": {
        path: [
            "src/css"
        ]
    },
    "cssnano": {
        safe: true,
        autoprefixer: false //handled by postcss-cssnext
    },
    "local-plugins": true,
    "map": "file"
}

if(process.env.NODE_ENV === "production"){
    POSTCSS.use.push('cssnano'); // add cssnano in production
    POSTCSS.map = false; //sourcemaps to external file
}

module.exports = POSTCSS;
