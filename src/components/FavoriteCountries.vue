<template>
  <div v-if="usefavorite.favoriteCountries.length > 0" class="allcoutries">
    <h2>Países Favoritos:</h2>
    <div v-for="country in usefavorite.favoriteCountries" :key="country" >
      <div class="country">
        <h3>{{ country }}</h3> 

      </div>
    </div>
  </div>
  <div v-else>
    <p>Nenhum país favoritado.</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFavoriteCountryStore } from "@/stores/favorite";

const usefavorite = useFavoriteCountryStore();

onMounted(() => {
  usefavorite.loadFavorites(); // Agora chamamos corretamente
});
</script>
<style scoped>
.allcoutries{
  align-items: center;
  justify-content: center;
  display: grid;
  flex-direction: column;
}

.country{
  gap: 10px;
  display: flex;
  flex-direction: row;
}
</style>