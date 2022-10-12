const esbuild = require('esbuild')
const axios = require('axios')
const MyPlugin = {
    name: 'http-url',
    setup(build) {
        // onResolve
        build.onResolve({ filter: /^https?:\/\// }, (args) => {
            // console.log(args)
            return {
                path: args.path,
                namespace: 'http-url'
            }
        })
        build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args) => {
            console.log(args) //命名空间为http - url的时候在进行处理即可
            // console.log(new URL(args.path, args.importer).toString())
            return {
                namespace: 'http-url',
                path: new URL(args.path, args.importer).toString()
            }

        })
        build.onLoad({
            filter: /.*/, namespace: "http-url",
        }, async (args) => {
            // console.log(args)
            const { data } = await axios(args.path)
            // console.log(data)
            return {
                contents: data,
            }
        })
        // onload

    }
}
esbuild.build({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js',
    plugins: [MyPlugin]
})


// 优化：不是每次都需要重新async，可以用缓存（官网）