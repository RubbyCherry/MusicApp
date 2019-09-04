<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@components/mheader/mheader'
import Tab from './views/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>

</style>
