<template>
  <div>
    <!-- Abas -->
    <div class="tabs">
      <button @click="selectedTab = 'currency'">Search by currency</button>
      <button @click="selectedTab = 'name'">Search by name</button>
      <button @click="selectedTab = 'clear', getFlags()">Clear search filters</button>
    </div>
    <div v-if="selectedTab === 'currency'">
        <label>Write the currency abbreviation</label>
        <br>
        <input v-model="currency" placeholder="Dollar ex: USD">
        <button @click="getCurrency">search</button>
      </div>
      <div v-if="selectedTab === 'name'">
        <label> Write the name of the country</label>
        <br>
        <input v-model="name" placeholder="ex: Brazil">
        <button @click="getName">search</button>
      </div>
      <div>
      <div class="item">
        <div v-for="(flag, index) in flagsArray" :key="index" class="flag-container">
          <img class="img-flag" :src="flag.flags.png" :alt="flag.flags.alt || flag.name.common" />
          <p>{{ flag.name.common }}</p>
        </div>
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
.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.tabs button:hover {
  background-color: #ddd;
}

.item {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 8 colunas */
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 80%; /* Ajuste conforme necessário */
  margin: auto;
}

.flag-container {
  text-align: center;
}

.img-flag {
  width: 100px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media (max-width: 1024px) {
  .item {
    grid-template-columns: repeat(4, 1fr); /* 4 bandeiras por linha em telas médias */
  }
}

@media (max-width: 768px) {
  .item {
    grid-template-columns: repeat(2, 1fr); /* 2 bandeiras por linha em telas pequenas */
  }
}
</style>
