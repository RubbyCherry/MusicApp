<template>
    <div class="singer">
        hahahah
    </div>
</template>

<script>
// import BScroll from ''
import { getSingerList } from '@/service/api/singer.js'
import { ERR_OK } from '@/service/api/config.js'
export default {
    name: 'Singer',
    data () {
        return{
            singers: []
        }
    },
    created () {
        this._getSingerList()
    },
    methods: {
        _getSingerList () {
            getSingerList().then((res)=>{
                console.log(res)
                // if(res.code === ERR_OK){
                //     this.singers = res.data.singerlist
                //     console.log(this.singers)
                // }
            })
        }
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