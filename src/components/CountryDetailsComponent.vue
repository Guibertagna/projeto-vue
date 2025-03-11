<template>
    <div class="all">
      <div class="card">
      
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading...</p>
        </div>
  

        <div v-else>
          <div class="header">
            <img :src="countryStore.coutrySearched[0].flags.png" alt="Flag" class="flag"/>
            <h1>{{ countryStore.coutrySearched[0].name.common }}</h1>
          </div>
          <div class="details">
            <p><strong>Capital:</strong> {{ countryStore.coutrySearched[0].capital[0] }}</p>
            <p><strong>Population:</strong> {{ countryStore.coutrySearched[0].population.toLocaleString() }}</p>
            <p><strong>Region:</strong> {{ countryStore.coutrySearched[0].region }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute} from 'vue-router';
  import { useCountryStore } from '@/stores/country';
  
  const route = useRoute(); // Use useRoute para acessar os parâmetros da rota

  const countryStore = useCountryStore();
  const loading = ref(true);  // Controla o estado de carregamento
  
  onMounted(() => {
  const pais = route.params.name; // Acesse o parâmetro da rota usando useRoute()

  if (pais) {
    countryStore.getByName(pais).finally(() => {
      loading.value = false;  
    });
  } else {
    console.error('Country name is missing in the route.');

  }
});

  </script>
  
  <style scoped>
  .all {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f9;
  }
  
  .card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .flag {
    width: 40px;
    height: 25px;
    object-fit: cover;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
  
  .details {
    margin-top: 20px;
    font-size: 16px;
    color: #333;
  }
  
  .details p {
    margin: 5px 0;
  }
  
  .map-link {
    margin-top: 20px;
  }
  
  .map-link a {
    color: #007BFF;
    text-decoration: none;
  }
  
  .map-link a:hover {
    text-decoration: underline;
  }
  
  /* Loading Spinner */
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .loading-spinner {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Texto de Loading */
  .loading-container p {
    margin-top: 10px;
    font-size: 16px;
    color: #3498db;
    font-weight: bold;
  }
  </style>
  