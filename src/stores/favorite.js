import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteCountryStore = defineStore('favorites', () => {
    const favoriteCountries = ref([]);

    function saveFavorite() {
        localStorage.setItem('favoriteCountries', favoriteCountries.value);
    }

    function addFavorite(country) {
        if (!favoriteCountries.value.includes(country)) {
            favoriteCountries.value.push(country);
            saveFavorite();
        }
    }

    function loadFavorites() {
        const storedFavorites = localStorage.getItem('favoriteCountries');
        if (storedFavorites) {
            favoriteCountries.value = storedFavorites;
        }
    }

    function removeFavorite(country) {
        favoriteCountries.value = favoriteCountries.value.filter(c => c !== country);
        saveFavorite();
    }

    return {
        favoriteCountries,
        addFavorite,
        removeFavorite,
        loadFavorites,
    };
});
