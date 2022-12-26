const shell = require('shelljs');

const gitUser = arg => new Promise((reslove,reject)=>{
    const { line, column, file } = arg
    //
    try {
        shell.exec(`git blame  ../client/src/${file} -L  ${line},${line}`, function (_code, stdout, _stderr) {
            reslove(stdout)
        })
    } catch (error) {
        reject(stdout)
    }
})

module.exports = gitUser