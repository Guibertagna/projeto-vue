<template>
  <div>
    <div>
      <div class="tabs">
        <span @click="countryStore.selectedTab = 'currency'" :class="{'active': countryStore.selectedTab === 'currency'}">Search by currency</span>
        <span @click="countryStore.selectedTab = 'name'" :class="{'active': countryStore.selectedTab === 'name'}">Search by name</span>
        <span @click="countryStore.selectedTab = 'language'" :class="{'active': countryStore.selectedTab === 'language'}">Search by language</span>
      </div>
    </div>
    <div v-if="countryStore.selectedTab === 'currency'" class="search-box">
      <label for="currency">Write the currency abbreviation</label>
      <input id="currency" v-model="countryStore.currency" placeholder="Dollar ex: USD" />
      <button @click="countryStore.getCurrency" class="btn-search">Search</button>
    </div>
    <div v-if="countryStore.selectedTab === 'name'" class="search-box">
      <label>Write the name of the country</label>
      <input v-model="countryStore.name" placeholder="ex: Brazil" />
      <button @click="countryStore.getName" class="btn-search">Search</button>
    </div>
    <div v-if="countryStore.selectedTab === 'language'" class="search-box">
      <label>Write the language of the country</label>
      <input v-model="countryStore.language" placeholder="ex: Portuguese" />
      <button class="btn-search" @click="countryStore.getLanguage">Search</button>
    </div>
    <button class="btn-clear" @click="countryStore.filtred = false, countryStore.selectedTab = 'clear'">Clear search filters</button>

    <div class="flags" v-if="countryStore.filtred === true">
      <div class="flag-container" v-for="(flag, index) in paginatedFlags" :key="index">
        <img class="img-flag" :src="flag.flags.png" :alt="flag.flags.alt || flag.name.common" />
        <p>{{ flag.name.common }}</p>
      </div>
    </div>
    <div class="flags" v-if="countryStore.filtred === false">
      <div class="flag-container" v-for="(flag, index) in paginatedAllFlags" :key="index">
        <img class="img-flag" :src="flag.flags.png" :alt="flag.flags.alt || flag.name.common" />
        <p>{{ flag.name.common }}</p>
      </div>
    </div>

    <div class="pagination">
      <button class="previus" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="next" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>


    <footer style="margin: 100px;">
      allFlagsArrayA
      allFlagsArray
      laalala
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCountryStore } from "@/stores/country";

const countryStore = useCountryStore();
const currentPage = ref(1);
const itemsPerPage = 48;

onMounted(() => {
  countryStore.getFlags();
});

const paginatedFlags = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return countryStore.flagsArray.slice(start, end);
});

const paginatedAllFlags = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return countryStore.allFlagsArray.slice(start, end);
});

const totalPages = computed(() => {
  const totalItems = countryStore.filtred ? countryStore.flagsArray.length : countryStore.allFlagsArray.length;
  return Math.ceil(totalItems / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
<style scoped>
/* Container das abas */
.tabs {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.tabs span {
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.tabs span:hover, .tabs span.active {
  background-color: #3c3d37;
  color: #ecdfcc;
}

.search-box {
  text-align: center;
  margin-bottom: 2rem;
}

.search-box label {
  font-size: 1.1rem;
  color: #333;
}

.search-box input {
  margin: 10px;
  padding: 0.8rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-box input:focus {
  border-color: #3c3d37;
}
.btn-clear {
  display: inline-block;
  padding: 10px;
  margin: 1rem auto;
  color: white;
  background-color: #3c3d37;
  border: 1px solid #3c3d37;
  border-radius: 15px;
}
.btn-search {
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #3c3d37;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-search:hover {
  background-color: #697565;
}


.flags {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 1rem;
}

.next{
  color: blue;
  text-decoration:underline;
  border: none;
  margin: 10px;
  background-color: transparent;
}
.previus{
  border: none;
  background-color: transparent;
  color: blue;
  text-decoration:underline;
  margin: 10px;
}

button:disabled {
  
  color: #a0a0a0; /* Texto mais apagado */
  cursor: not-allowed;
  opacity: 0.6; /* Reduz a opacidade */
}

.flag-container {
  text-align: center;
}

.img-flag {
  width: 100px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.img-flag:hover {
  transform: scale(1.1);
}


</style>