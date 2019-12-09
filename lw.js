'use strict'
const fs = require('fs')
const ffi = require('ffi-napi')
const ref = require('ref-napi')


/**
 * 创建lw的对象，构造出输入一个函数
 */
class object_lw {
    constructor(dll_path) {
        this.isinit = false
        this.isbind = false
        this.dll = false
        this.state = 'noinit'
        this.errMsg_init = 'dll对象还未初始化，请使用[对象.init(dll路径)]方法进行初始化.'

        if (dll_path !== 'undefined' && fs.existsSync(dll_path)) {
            this.init(dll_path)
        } else {
            console.log('没有找到dll文件，请确认路径是否正确:[' + dll_path + '].')
        }
    }

    /**
     * 通过路径进行初始化
     *
     * @param      {string}  dll_path  dll的路径
     */
    init(dll_path) {
        console.log(`识别${dll_path}成功，开始初始化dll。`)
        try {
            this.dll = ffi.Library(dll_path, {
                'ver': ['double', []],
                'enumWindow': ['string', ['string', 'string']],
                'findWindow': ['int', ['string', 'string']],
                'findSonWindow': ['int', ['int', 'string', 'string']],
                'getClientSize': ['string', ['int']],
                'setWindowState': ['int', ['int', 'int']],
                'getWindowState': ['int', ['int', 'int']],
                'getWindowTitle': ['string', ['int']],
                'getWindowClass': ['string', ['int']],
                'bindWindow': ['int', ['int', 'int', 'int', 'int', 'int', 'int']],
                'unBindWindow': ['int', []],
                'unBindWindowEx': ['int', ['int']],
                'getBindState': ['int', []],
                'isBind': ['int', ['int']],
                'getBind': ['int', []],
                'moveTo': ['string', ['int', 'int']],
                'moveToEx': ['string', ['int', 'int', 'int', 'int']],
                'moveToTx': ['string', ['int', 'int', 'int', 'int']],
                'setPath': ['int', ['string']],
                'getPath': ['string', []],
                'capture': ['int', ['int', 'int', 'int', 'int', 'string']],
                'delay': ['int', ['int']],
                'leftClick': ['void', []],
                'test': ['int', []],
                'findPic': ['string', ['int', 'int', 'int', 'int', 'string', 'string', 'int', 'int', 'int', 'int', 'int', 'int', 'int']],
                'findColor': ['string', ['int', 'int', 'int', 'int', 'string', 'int', 'int', 'int', 'int', 'int', 'int']],
                'getOS': ['string', []],
                'random': ['int', ['int', 'int']],
            })
            this.isinit = true
            console.log(`初始化dll成功,版本:${this.dll.ver()}`)
        } catch (err) {
            console.log('导入模块中发生错误')
            console.log('错误信息：' + err)
        }
    }

    ver() {
        return this.dll.ver()
    }

    getOS() {
        return this.dll.getOS()
    }

    delay(n) {
        this.dll.delay(Number(n))
    }

    random(n, m) {
        return this.dll.random(n, m)
    }

}

if (require.main === module) {
    console.log('lw.js1')
    const lw = new object_lw('./test11.dll')
    for (var i = 20 - 1; i >= 0; i--) {
        console.log(lw.random(90, 500))
        lw.delay(1000)
    }
}

module.exports = dll_path => {
    return new object_lw(dll_path)
}