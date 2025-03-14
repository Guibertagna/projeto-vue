<template>
  <header class="header">
    <img src="../assets/falgs-removebg-preview.png" class="logo-img" alt="Logo"/>

    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/game" class="nav-link">Game</router-link>
      <router-link to="/fav" class="nav-link">Favoritos</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #35828D;
  color: #333;
  padding: 10px 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin: 0; 
  height: 100px; 
}


.parse {
  font-size: 22px;
  font-weight: 600;
  text-decoration: none;
  color: #ffff;
  transition: color 0.3s ease;
  flex-grow: 1;  
  text-align: center; 
  margin: 0; 
}

.logo-img {
  height: 100px; 
  width: auto;
}


.nav {
  display: flex;
  align-items: end;
  gap: 25px;
}

.nav-link {
  text-decoration: none;

  color: #ffff;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}
</style>
