const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('./src'),
                '@assets': resolve('./src/assets'),
                '@components': resolve('./src/components')
            }
        }
    },
    devServer: {
        before(app){
            apiRoutes.get('/getDiscList',(req,res)=>{
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url,{
                    headers: {
                        referer: 'https://y.qq.com/portal/playlist.html',
                        host: 'y.qq.com'
                    },
                    params: req.query
                }).then((response)=>{
                    res.json(response.data)
                }).catch((e)=>{
                    console.log(e)
                })
            })

            apiRoutes.get('/getSingerList',(req,res)=>{
                const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
                axios.get(url,{
                    headers: {
                        referer: 'https://y.qq.com/portal/singer_list.html',
                        host: 'y.qq.com'
                    },
                    params: req.query
                }).then((response)=>{
                    res.json(response.data)
                }).catch((e)=>{
                    console.log(e)
                })
            })
            
            app.use("/api",apiRoutes)
        }
    }
}