const path = require('path');
const glob = require("glob");
const pagesInfo = require("./pages.config");

const debug = process.env.NODE_ENV !== 'production';
const pages = {};

function resolve(dir) {
    return path.join(__dirname, dir)
}

const moduleNames = process.argv.splice(3);
//对多页面pages参数处理
glob.sync("./src/module/**/main.js").forEach(p => {
    let result = p.match(/\.\/src\/module\/(.*)\/main\.js/);
    result = result ? result[1] : "";
    const key = result ? result : "main";
    if(moduleNames.length > 0 && !moduleNames.includes(key)){
        return false;
    }
    if (pagesInfo[key]) {
        pages[key] = {
            entry: result ? `src/module/${result}/main.js` : "src/main.js"
        };
        for (const info in pagesInfo[key]) {
            pages[key] = {
                ...pages[key],
                [info]: pagesInfo[key][info]
            };
        }
    }
});

module.exports = {
    publicPath: './',
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本，尽量配置为false，否则会使得包增加10kb
    lintOnSave: false,
    pages,
    devServer: {
        hot: true,
        proxy: {
            '/': {
                // target:'http://10.170.10.11:18808',
                target: 'http://10.101.15.221:18808',
                ws: false, // proxy websockets
                changeOrigin: true  // needed for virtual hosted sites
            }
        }
    },
    configureWebpack: (config) => {
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
    },
    chainWebpack: (config) => {
        // 防止多页面打包卡顿
        config => config.plugins.delete("named-chunks");

        config.resolve.alias
            .set('@', resolve('src'))
            .set('ApiUtil', resolve('src/utils/ApiUtil.js'))
            .set('AppUtil', resolve('src/utils/AppUtil.js'))
            .set('ArrayUtil', resolve('src/utils/ArrayUtil.js'))
            .set('AxiosUtil', resolve('src/utils/AxiosUtil.js'))
            .set('BrowserUtil', resolve('src/utils/BrowserUtil.js'))
            .set('CacheUtil', resolve('src/utils/CacheUtil.js'))
            .set('DateUtil', resolve('src/utils/DateUtil.js'))
            .set('ErrorUtil', resolve('src/utils/ErrorUtil.js'))
            .set('FunctionUtil', resolve('src/utils/FunctionUtil.js'))
            .set('ParamsUtil', resolve('src/utils/ParamsUtil.js'))
            .set('TreeUtil', resolve('src/utils/TreeUtil.js'))
            .set('UrlUtil', resolve('src/utils/UrlUtil.js'))
    },
}