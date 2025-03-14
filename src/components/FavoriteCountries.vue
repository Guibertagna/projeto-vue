<template>
  <div class="favorites-container">
    <div class="back">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <router-link to="/" class="back-button">
        <span class="material-icons">arrow_back</span>
      </router-link>
    </div>
    <div v-if="countries.length > 0"> <strong>
    <h1  >Favorite Countries</h1></strong></div>
    <div v-else class="no-favorites">
      <img src="../assets/empty-folder.png" alt="Nenhum favorito" class="no-favorites-img">
      <p class="no-favorites-text">It looks like you haven't favorited any countries yet.</p>
      <p class="no-favorites-detail">Start exploring countries and add them to your favorites!</p>
    </div>

    <div v-if="countries.length > 0" class="countries-grid">
      <div v-for="country in countries" :key="country.name?.official || country.name" class="country-card">
        
        <img :src="country?.img" :alt="`Bandeira de ${country.name}`" class="country-flag"   @click="goToCoutryDetails(country.name)">
        <h3 class="country-name">{{ country.name }}</h3>
        <button @click="remove(country)" class="remove-btn">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useFavoriteCountryStore } from "@/stores/favorite";
import { useRouter } from "vue-router";
const router = useRouter();
const usefavorite = useFavoriteCountryStore();
const countries = computed(() => usefavorite.favoriteCountries);
const goToCoutryDetails = (countryName) => {
  router.push(`/country/${countryName}`);
};
onMounted(() => {
  usefavorite.loadFavorites();
});

function remove(country) {
  if (country?.name) {
    usefavorite.removeFavorite(country);
  }
}
</script>

<style scoped>
.favorites-container {

  height: 100vh;
  background-color: #E0F7FA;
  text-align: center;
  padding: 20px;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(3, 220px);
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}
.back {
  display: flex;
  justify-content: flex-start;
  width: 100%; 
  margin-bottom: 20px; 
}

.country-card {
  width: 220px;
  height: 300px;
  background:  #35828D;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.country-card:hover {
  transform: translateY(-5px);
}

.country-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.country-card h3 {
  margin: 10px 0;
  font-size: 16px;
  color: white;
}

.remove-btn {
  background-color: #d9534c;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c9302c;
}

.no-favorites {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  color: #888;
}

.no-favorites-img {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.no-favorites-text {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.no-favorites-detail {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}
</style>
