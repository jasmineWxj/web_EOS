const fs = require('fs')
var http = require('http');
const glob = require('glob')
const path = require('path')

class UploadSourceMapWebpackPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        console.log('UploadSourceMapWebPackPlugin apply')
        // 打包结束后执行
        compiler.hooks.done.tap("upload-sourcemap-plugin", async status => {
            console.log('webpack runing')
            const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
            for (let filename of list) {
                await this.upload(this.options.uploadUrl, filename)
            }
        });
    }
    upload(url, file) {
        return new Promise(resolve => {
            console.log('uploadMap:', file)
            const req = http.request(
                `${url}?name=${path.basename(file)}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        Connection: "keep-alive",
                        "Transfer-Encoding": "chunked"
                    }
                }
            )
            fs.createReadStream(file)
                .on("data", chunk => {
                    req.write(chunk);
                })
                .on("end", () => {
                    req.end();
                    resolve()
                });
        })
    }
}

module.exports = UploadSourceMapWebpackPlugin;
