<script setup >
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import {  onMounted } from "vue";
import { useCountryStore } from './stores/country';
const countryStore = useCountryStore()

</script>


<template>
  <div >
    <HeaderComponent/>
    <router-view ></router-view>
    <FooterComponent/>
  </div>
</template>


<style scoped>
  .back-button {
    position: fixed;
    top: 10px;
    left: 0%;
    padding: 8px;
  }
  

</style>
