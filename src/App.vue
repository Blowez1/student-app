<template>
 <div>
   <div class="container">
     <Header/>
   </div>
   <div class="container px-2">
     <router-view/>
   </div>
 </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components : {
    Header
  },
  mounted () {
    this.$store.dispatch("initApp")
  }
}
</script>

<style lang="scss">

</style>