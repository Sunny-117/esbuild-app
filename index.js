const esbuild = require('esbuild')
const MyPlugin = {
    name: 'http-url',
    setup(build) {
        // onResolve
    }
}
esbuild.build({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js'
})