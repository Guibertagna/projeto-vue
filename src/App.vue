
<template>
  <div class="container">
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
  .tudo{
    height: 100vh;
    width: 100vh;
  }
  .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

</style>
