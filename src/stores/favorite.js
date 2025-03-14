import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteCountryStore = defineStore('favorites', () => {
   
    const favoriteCountries = ref([]);
   
    function saveFavorite() {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries.value));
        } else {
            console.error("localStorage não está disponível no navegador.");
        }
    }
    
    function addFavorite(country) {
        if (country?.name && country?.flags) {
            const countryName = country.name.official;
            const countryFlag = country.flags.png; 
            const exists = favoriteCountries.value.some(c => c.name === countryName);
            if (!exists) {
                favoriteCountries.value.push({
                    name: countryName,
                    img: countryFlag 
                });
                saveFavorite();
            }
        } else {
            console.error('Country data is incomplete:', country);
        }
    }
    
    
    


    function loadFavorites() {
        const storedFavorites = localStorage.getItem('favoriteCountries');
        if (storedFavorites) {
            try {
                favoriteCountries.value = JSON.parse(storedFavorites);
            } catch (error) {
                console.error("Erro ao carregar favoritos do localStorage:", error);
                favoriteCountries.value = [];
            }
        }
    }

    function removeFavorite(country) {
        if (!country?.name) {
            return console.error('Country data is incomplete for removal:', country);
        }
        favoriteCountries.value = favoriteCountries.value.filter(c => c.name !== (country.name));
        saveFavorite();
    }
    
    

    return {
        favoriteCountries,
        addFavorite,
        removeFavorite,
        loadFavorites,
    };
});
