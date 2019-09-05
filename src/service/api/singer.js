import jsonp from '@/utils/jsonp.js'
import { commonParams,options } from './config'
import axios from 'axios'

export function getSingerList() {
    const url = '/api/getSingerList'
    const singerData = JSON.stringify({
        "comm":{"ct":24,"cv":0},
        "singerList":{
            "module":"Music.SingerListServer",
            "method":"get_singer_list",
            "param":{
                "area":-100,
                "sex":-100,
                "genre":-100,
                "index":-100,
                "sin":0,
                "cur_page":1
            }
        }
    })

    const data = Object.assign({},commonParams,{
        needNewCode: 0,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq.json',
        data: singerData
    })
    return axios.get(url,{
        params: data
    }).then((res)=>{
        return Promise.resolve(res.data)
    })
}