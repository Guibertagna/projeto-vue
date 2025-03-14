<template>
  <div class="all">
    <!-- Botão de Voltar -->
    <div class="back">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <router-link to="/" class="back-button">
        <span class="material-icons">arrow_back</span>
      </router-link>
    </div>
    <div class="card">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>

      <div v-else>
        <div class="header">
          <img :src="countryStore.coutrySearched[0].flags.png" alt="Flag" class="flag"/>
          <h1>{{ countryStore.coutrySearched[0].name.official }}</h1>
          
      
          <button @click="toggleFavorite" class="favorite-btn">
            {{ isFavorite ? '★' : '☆' }}
          </button>
        </div>
        
        <div class="details">
          <p><strong>Capital:</strong> {{ countryStore.coutrySearched[0].capital[0] }}</p>
          <p><strong>Population:</strong> {{ countryStore.coutrySearched[0].population.toLocaleString() }}</p>
          <p><strong>Region:</strong> {{ countryStore.coutrySearched[0].region }}</p>
          <p><strong>Languages:</strong> {{ Object.values(countryStore.coutrySearched[0].languages).join(', ') }}</p>
          <p><strong>Currency:</strong> {{ Object.values(countryStore.coutrySearched[0].currencies)[0].name }}</p>
          <a :href="countryStore.coutrySearched[0].maps.googleMaps" target="_blank" rel="noopener noreferrer">
            <strong style="color: blue">Ver no Google Maps</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCountryStore } from '@/stores/country';
import { useFavoriteCountryStore } from '@/stores/favorite';

const route = useRoute();
const countryStore = useCountryStore();
const favoriteStore = useFavoriteCountryStore();
const loading = ref(true);

// Carregar os favoritos ao montar o componente
onMounted(() => {
  favoriteStore.loadFavorites();

  const pais = route.params.name;
  if (pais) {
    countryStore.getByName(pais).finally(() => {
      loading.value = false;
    });
  } else {
    console.error('Country name is missing in the route.');
  }
});

const countryName = computed(() => countryStore.coutrySearched[0]);


const isFavorite = computed(() => {
  return favoriteStore.favoriteCountries.some(c => c.name === countryName.value.name.official);
});

function toggleFavorite() {
  if (isFavorite.value) {
    console.log(countryName.value)
    favoriteStore.removeFavorite(countryName.value);
  } else {
    console.log("Toggle"+ countryName)
    favoriteStore.addFavorite(countryName.value);
  }
}
</script>


<style scoped>
/* Layout principal */
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espaço entre os elementos */
  height: 100vh;
  background-color: #E0F7FA;
  padding: 20px;
}

/* Estilo do botão de voltar */
.back {
  align-self: flex-start; /* Garante que o botão fique no canto superior esquerdo */
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
}

.back-button .material-icons {
  font-size: 24px;
  color: black;
}

/* Card */
.card {
  background-color:  #35828D;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
}

.header {
  color: white;
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
  color: white;
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
  color: white;
  margin: 5px 0;
}

/* Loading Spinner */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
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

.loading-container p {
  margin-top: 10px;
  font-size: 16px;
  color: #3498db;
  font-weight: bold;
}
</style>
