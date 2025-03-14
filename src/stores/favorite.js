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
        console.log("Entrou no add favorite no store" + country)
        if (country?.name && country?.flags) {
            const countryName = typeof country.name === 'object' ? country.name.official : country.name;
            // Acessa o link da bandeira corretamente
            const countryFlag = country.flags.png; // Verifique se "png" é a propriedade correta
            const exists = favoriteCountries.value.some(c => c.name === countryName);
            if (!exists) {
                favoriteCountries.value.push({
                    name: countryName,
                    img: countryFlag // Aqui estamos armazenando o link correto da bandeira
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
        if (country?.name) {
            const countryName = typeof country.name === 'object' ? country.name.official : country.name;
            favoriteCountries.value = favoriteCountries.value.filter(c => c.name !== countryName);
            saveFavorite();
            console.log("Removendo país:", country);
            console.log("Estados antes da remoção:", favoriteCountries.value);

        } else {
            console.error('Country data is incomplete for removal:', country);
        }
    }
    
    

    return {
        favoriteCountries,
        addFavorite,
        removeFavorite,
        loadFavorites,
    };
});
