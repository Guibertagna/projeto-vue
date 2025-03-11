
<template>
  <div >
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <router-link to="/" class="back-button">
      <span class="material-icons">arrow_back</span>
    </router-link>
    <router-view ></router-view>
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
