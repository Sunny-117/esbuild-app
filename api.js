const esbuild = require('esbuild');
(async function () {
    const r = await esbuild.build({
        entryPoints: ["app.jsx"],
        bundle: true,
        outfile: "out.js",
        plugins: []
    })
    console.log(r)
})()
