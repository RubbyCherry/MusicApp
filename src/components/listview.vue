<template>
    <ScrollCom class="listview" 
    :data="data" 
    ref="listview" 
    :listenScroll="listenScroll"
    :probeType="probeType" 
    @scroll="scroll">
        <ul>
            <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item,index) in group.items" class="list-group-item" :key="index" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
        @touchstart="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :key="index" :class="{'current': currentIndex===index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <Loading></Loading>
        </div>
    </ScrollCom>
</template>

<script>
import ScrollCom from './scroll.vue'
import { getData } from '@/utils/dom.js'
import { setTimeout } from 'timers';
import Loading from '@components/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
    name: 'ListView',
    props: {
        data:{
            type: Array,
            default: []
        }
    },
    data () {
        return{
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    components: {
        ScrollCom,
        Loading
    },
    computed: {
        shortcutList () {
            return this.data.map((group)=>{
                return group.title.substr(0,1)
            })
        },
        fixedTitle () {
            if(this.scrollY > 0){
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    methods: {
        selectItem (item) {
            this.$emit('select',item)
        },
        onShortcutTouchStart (e) {
            // console.log(e)
            let anchorIndex = getData(e.target,'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove (e) {

           let firstTouch = e.touches[0]
           this.touch.y2 = firstTouch.pageY
           //向下取整
           let delta =  (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
           let anchorIndex = parseInt(this.touch.anchorIndex) + delta
           this._scrollTo(anchorIndex)
        },
        scroll (pos) {
            this.scrollY = pos.y
        },
        _scrollTo (anchorIndex) { 
            // console.log( this.listHeight)

            //解决"热门"上面和"Z"下面的空白处点击为null的情况         
            if(!anchorIndex && anchorIndex !==0){
                return
            }
            if(anchorIndex < 0){
                anchorIndex = 0
            } else if(anchorIndex > this.listHeight.length - 2){
                anchorIndex = this.listHeight.length - 2
            }
            // console.log(anchorIndex)
            this.scrollY = -this.listHeight[anchorIndex]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
        },
        _calculateHeight () {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i = 0; i < list.length; i++){
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    watch: {
        data () {
            setTimeout(()=>{
                this._calculateHeight()
            },20)
        },
        scrollY (newY) {
            const listHeight = this.listHeight
            //当滚动到顶部，newY>0
            if(newY>0){
                this.currentIndex = 0
            }
            //在中间部分滚动
            for(let i = 0; i < listHeight.length - 1; i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if(-newY >= height1 && -newY < height2){
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
            //当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2
        },
        diff (newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal-TITLE_HEIGHT : 0
            // console.log(this.fixedTop)
            // console.log("a" + newVal)
            if(this.fixedTop === fixedTop){
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    created () {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/stylus/variable.styl'
.listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
        padding-bottom: 30px
        .list-group-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-highlight-background
        .list-group-item
            display: flex
            align-items: center
            padding: 20px 0 0 30px
            .avatar
                width: 50px
                height: 50px
                border-radius: 50%
            .name
                margin-left: 20px
                color: $color-text-l
                font-size: $font-size-medium
    .list-shortcut
        position: absolute
        z-index: 30
        right: 0
        top: 50%
        transform: translateY(-50%)
        width: 20px
        padding: 20px 0
        border-radius: 10px
        text-align: center
        background: $color-background-d
        font-family: Helvetica
        .item
            padding: 3px
            line-height: 1
            color: $color-text-l
            font-size: $font-size-small
            &.current
                color: $color-theme
    .list-fixed
        position: absolute
        top: 0
        left: 0
        width: 100%
        .fixed-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-highlight-background
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>