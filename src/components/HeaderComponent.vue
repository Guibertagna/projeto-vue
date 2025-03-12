<template>
  <header class="header">
  
    <router-link to="/" class="logo">WorldFlags</router-link>

 
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/game" class="nav-link">Game</router-link>
      <router-link to="/contact" class="nav-link">Contato</router-link>
    </nav>

  
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";




onMounted(() => {
  
});
</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: #333;
  padding: 15px 20px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

/* Navegação */
.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #000;
}

/* Botão de Dark Mode */
.dark-mode-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #555;
  transition: color 0.3s ease;
}

.dark-mode-btn:hover {
  color: #000;
}

/* Dark Mode */
.dark-mode {
  background-color: #222;
  color: #fff;
}

.dark-mode .header {
  background-color: #333;
  color: #fff;
}

.dark-mode .nav-link {
  color: #ccc;
}

.dark-mode .nav-link:hover {
  color: #fff;
}

.dark-mode .dark-mode-btn {
  color: #fff;
}

.dark-mode .dark-mode-btn:hover {
  color: #ccc;
}
</style>
