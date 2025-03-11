import { getCountryLanguage } from '@/services/HttService';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllFlags, getCountryCurrency, getCountryName  } from '@/services/HttService';
export const useCountryStore = defineStore ('country', ()=>{
    const name = ref('');
const language = ref('');
const allFlagsArray = ref([])
const currency = ref('');
const filtred = ref(false);
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
    allFlagsArray,
    filtred,
    language,
    selectedTab,
    getFlags,
    getLanguage,
    getCurrency,
    getName,

};

})