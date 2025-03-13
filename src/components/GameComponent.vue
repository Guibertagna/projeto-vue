<template>
    <div>
      <h1>Game</h1>
      <div>   
        <div class="name">
          <div v-if="random_name.length">
  <h3>{{ random_name[0].name.common }}</h3>
</div>
        </div>
        <div class="coutries">
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
  const random_name = ref([]);
  
  function startGame() {
    allCountries.value = countryStore.allFlagsArray;
    console.log(allCountries.value); // Verificar se as bandeiras foram carregadas corretamente
    randomFlags.value = [];
    random_name.value = []; // Limpar a lista de bandeiras aleatórias
    console.log(randomFlags.value.length);
  
    while (randomFlags.value.length < 4) {
      const randomIndex = Math.floor(Math.random() * allCountries.value.length);
      if (!randomFlags.value.includes(allCountries.value[randomIndex])) {
        randomFlags.value.push(allCountries.value[randomIndex]);
      }
    }
    const randomIndexName = Math.floor(Math.random() * randomFlags.value.length);
    console.log(randomIndexName)
    random_name.value.push(randomFlags.value[randomIndexName])
    console.log(random_name.value)
  }
  
  onMounted(() => {
    countryStore.getFlags();
  });
  </script>
  
  <style scoped>
  .coutries {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 bandeiras por linha */
    gap: 20px;
    justify-items: center;
    width: 100%;
    max-width: 800px; /* Ajuste o tamanho máximo conforme necessário */
    padding: 1rem;
  }
  
  .coutries img {
    max-width: 100%; /* Garante que a imagem se ajuste corretamente */
    height: auto;
  }
  </style>
  