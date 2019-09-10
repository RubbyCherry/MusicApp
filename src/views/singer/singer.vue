<template>
    <div class="singer">
        <ListView :data="singers" @select="selectSinger"></ListView>
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from '@/service/api/singer.js'
import { ERR_OK } from '@/service/api/config.js'
import singer from '@/utils/singerInfo.js'
import ListView from '@components/listview.vue'
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
    name: 'Singer',
    data () {
        return{
            singers: []
        }
    },
    components: {
        ListView
    },
    created () {
        this._getSingerList()
    },
    methods: {
        selectSinger (singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList () {
            getSingerList().then((res)=>{
                if(res.code === ERR_OK){
                    this.singers = this._normalizeSinger(res.data.list)
                    // console.log(this.singers)
                }
            })
        },
       _normalizeSinger (list) {
           let map = {
               hot: {
                   title: HOT_NAME,
                   items: []
               }
           }
           list.forEach((item,index)=>{
               if(index < HOT_SINGER_LEN){
                   map.hot.items.push(new singer({
                       id: item.Fsinger_mid,
                       name: item.Fsinger_name
                   }))
               }
               const key = item.Findex
               if(!map[key]){
                   map[key] = {
                       title: key,
                       items: []
                   }
               }
                map[key].items.push(new singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
              })) 
           })
           //为了得到有序的数组,a~z有序的排序
           let hot = []
           let ret = []
           for(var k in map){
               let val = map[k]
               if(val.title.match(/[a-zA-Z]/)){
                   ret.push(val)
               } else if(val.title === HOT_NAME){
                   hot.push(val)
               }
           }
           ret.sort((a,b)=>{
               return a.title.charCodeAt(0) - b.title.charCodeAt(0)
           })
           //将所有的ret值合并为一个数组
           return hot.concat(ret)
       },
       ...mapMutations({
           setSinger: 'SET_SINGER'
       }) 
    }
}
</script>

<style lang="stylus" scoped>
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>