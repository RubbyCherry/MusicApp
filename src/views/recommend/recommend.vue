<template>
  <div class="recommend">
      <ScrollCom ref="scroll" class="recommend-content" :data="discList">
        <div>
          <div v-if="recommends.length" class="slider-wrapper">
            <Slider>
              <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl" >
                  <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
                </a>
              </div>
            </Slider>
          </div>
          <div class="recommend-list">
              <h1 class="list-title">热门歌单推荐</h1>
              <ul>
                <li class="item" v-for="item in discList" :key="item.dissid">
                  <div class="icon">
                    <img width="60" height="60" v-lazy="item.imgurl"/>
                  </div>
                  <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                  </div>
                </li>
              </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <Loading></Loading>
        </div> 
      </ScrollCom>
  </div>
</template>

<script>
import Slider from '@components/slider.vue'
import ScrollCom from '@components/scroll.vue'
import Loading from '@components/loading/loading.vue'
import { getRecommend,getDiscList } from '@/service/api/recommend.js'
import { ERR_OK } from '@/service/api/config.js'

export default {
  name: 'Recommend',
  components: {
    Slider,
    ScrollCom,
    Loading
  },
  data () {
    return{
      recommends: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()   
  },
  methods: {
    _getRecommend () {
        getRecommend().then(res=>{
            if(res.code === ERR_OK){
              this.recommends = res.data.slider
            }
        })
    },
    _getDiscList(){
      getDiscList().then(res=>{
        if(res.code === ERR_OK){
          this.discList = res.data.list
        }
        
      })
    },
    loadImage () {
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }  
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/stylus/variable.styl'
.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>