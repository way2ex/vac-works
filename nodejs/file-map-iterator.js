var fs = require('fs')
var path = require('path')
// 获取当前目录的绝对路径
var filePath = path.resolve()   // 获取当前目录的绝对路径
var fileMap = {}       // 创建对象

iterateDir2(filePath, fileMap).then(() => {
    console.log(JSON.stringify(fileMap))
})

// 没有使用promise的方法
function iterateDir (filePath, obj) {
    fs.readdir(filePath, (err, files) => {
        if(err) {console.log(err); return}
        for (let fileName of files) {
            if (fileName.startsWith('.')) {
                continue
            }
            let curFilePath = path.join(filePath, fileName)
            // console.log(curFilePath)
            fs.stat(curFilePath, (err, stats) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (stats.isFile()) {
                    obj[fileName] = fileName
                } else if (stats.isDirectory()) {
                    obj[fileName] = {}
                    iterateDir(curFilePath, obj[fileName])
                }
            })
        }
    })
}

// iterate directory with promise
function iterateDir2 (filePath, obj) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (err, files) => {
            if(err) {
                console.log(err)
                return
            }
            let subPros = []
            for (let fileName of files) {
                if(fileName.startsWith('.')) {
                    continue
                }
                let curFilePath = path.join(filePath, fileName)

                let subPro = new Promise((resolve, reject) => {
                    fs.stat(curFilePath, (err, stats) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        if(stats.isFile()) {
                            obj[fileName] = fileName
                            resolve()
                        } else if (stats.isDirectory()) {
                            obj[fileName] = {}
                            iterateDir2(curFilePath, obj[fileName]).then(() => {
                                resolve()
                            }, (err) => {
                                console.log(err)
                                reject(err)
                            })
                        }
                    })
                })
                subPros.push(subPro)
            }
            Promise.all(subPros).then(() => {
                resolve()
            },(err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}
