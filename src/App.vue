<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <router-view/>
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
