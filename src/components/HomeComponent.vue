<template>
  <div>
    <!-- Abas -->
    <div class="tabs">
      <span @click="selectedTab = 'currency'" :class="{'active': selectedTab === 'currency'}">Search by currency</span>
      <span @click="selectedTab = 'name'" :class="{'active': selectedTab === 'name'}">Search by name</span>
    </div>
    <div v-if="selectedTab === 'currency'" class="search-box">
      <label for="currency">Write the currency abbreviation</label>
      <input id="currency" v-model="currency" placeholder="Dollar ex: USD" />
      <button @click="getCurrency" class="btn-search">Search</button>
    </div>
    <div v-if="selectedTab === 'name'" class="search-box">
      <label>Write the name of the country</label>
      <input  v-model="name" placeholder="ex: Brazil" />
      <button @click="getName" class="btn-search">Search</button>
    </div>
    <button  class="btn-clear" @click="selectedTab = 'clear', getFlags()" >Clear search filters</button>
    <div class="flags">
      <div class="flag-container" v-for="(flag, index) in flagsArray" :key="index">
        <img  class="img-flag" :src="flag.flags.png" :alt="flag.flags.alt || flag.name.common" />
        <p>{{ flag.name.common }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAllFlags, getCountryCurrency, getCountryName} from "@/services/HttService";
const name = ref('');
const currency = ref('');
const flagsArray = ref([]);
const isFiltred = ref(true);
const selectedTab = ref('todas'); // Define a aba selecionada

async function getFlags() {
  try {
    const flags = await getAllFlags();
    isFiltred.value = true;
    flagsArray.value = flags;
  } catch (error) {
    console.error("Erro ao buscar bandeiras:", error);
  }
}

async function getCurrency() {
  try {
    const flags = await getCountryCurrency(currency.value);
    flagsArray.value = flags;
    console.log(flagsArray.value);
  } catch (error) {
    getFlags();
    alert( currency.value + " Invalid currency");
  }
}
async function getName() {
  try {
    const flags = await getCountryName(name.value);
    flagsArray.value = flags;
    name.value = ''
  } catch (error) {
    getFlags();
  
    alert(name.value + " Invalid Country");
      name.value = ''
  }
}



onMounted(() => {
  getFlags();
});
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