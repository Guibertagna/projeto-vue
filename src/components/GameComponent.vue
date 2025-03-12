<template>
    <div>
      <h1>Game</h1>
      <div>
        <h3>Random Flags:</h3>
        <div class="flags">
          <div v-for="(flag, index) in randomFlags" :key="index">
            <img :src="flag.flags.png" alt="Flag" />
          </div>
        </div>
      </div>
      <button @click="startGame">Start Game</button>
    </div>
  </template>
  
  <script setup>
  import { useCountryStore } from "@/stores/country";
  import { ref, onMounted } from "vue";
  
  // Definindo as variáveis reativas
  const allCountries = ref([]);
  const randomFlags = ref([]);
  const countryStore = useCountryStore();
  
  function startGame() {
    randomFlags.value = []; // Limpar a lista de bandeiras aleatórias
    console.log(randomFlags.value.length);
  
    while (randomFlags.value.length < 4) {
      const randomIndex = Math.floor(Math.random() * allCountries.value.length);
      if (!randomFlags.value.includes(allCountries.value[randomIndex])) {
        randomFlags.value.push(allCountries.value[randomIndex]);
      }
    }
  
    console.log(randomFlags.value);
  }
  
  onMounted(() => {
    allCountries.value = countryStore.allFlagsArray;
    console.log(allCountries.value); // Verificar se as bandeiras foram carregadas corretamente
  });
  </script>
  
  <style scoped>
  .flags {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 bandeiras por linha */
    gap: 20px;
    justify-items: center;
    width: 100%;
    max-width: 800px; /* Ajuste o tamanho máximo conforme necessário */
    padding: 1rem;
  }
  
  .flags img {
    max-width: 100%; /* Garante que a imagem se ajuste corretamente */
    height: auto;
  }
  </style>
  