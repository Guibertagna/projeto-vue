import { getCountryLanguage, getCoutryByName } from '@/services/HttService';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllFlags, getCountryCurrency, getCountryName  } from '@/services/HttService';

export const useCountryStore = defineStore ('country', ()=>{
const name = ref('');
const pais = ref('')
const language = ref('');
const allFlagsArray = ref([])
const currency = ref('');
const filtred = ref(false);
const coutrySearched = ref([])
const flagsArray = ref([]);

const selectedTab = ref(''); 
async function getFlags() {
    try {
      const country = await getAllFlags();
      allFlagsArray.value = country;
      filtred.value = false
    } catch (error) {
      console.error("Erro ao buscar bandeiras:", error);
    }
  }

  async function getCurrency() {
    try {
      const country = await getCountryCurrency(currency.value);
      flagsArray.value = country;
      currency.value = ''
      filtred.value = true
    } catch (error) {
      alert( currency.value + " Invalidii currency");
    }
  }
  async function getName() {
    try {
      const country = await getCountryName(name.value);
      flagsArray.value = country;
      name.value = ''
      filtred.value = true
    } catch (error) {
   

      alert(name.value + " Invalid Country");
        name.value = ''
    }
  }
  async function getByName(pais) { 
    try {
      const country = await getCoutryByName(pais); 
      coutrySearched.value = country; 
      console.log('Country searched:', coutrySearched.value); // Verifique o retorno da API
    } catch (error) {

      alert("Country not found: " + error);
    }
  }
  
  async function getLanguage() {
    try {
      const country = await getCountryLanguage(language.value);
      flagsArray.value = country;
      language.value = ''
      filtred.value = true
    } catch (error) {
      
      alert(language.value + " Invalid Language");
      language.value = ''
    }
  }
  
  return {
    flagsArray,
    currency,
    name,
    pais,
    allFlagsArray,
    filtred,
    language,
    coutrySearched,
    selectedTab,
    getByName,
    getFlags,
    getLanguage,
    getCurrency,
    getName,

};

})