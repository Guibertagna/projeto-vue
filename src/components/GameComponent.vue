<template>
  <div class="game">
    <div class="back">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <router-link to="/" class="back-button">
        <span class="material-icons">arrow_back</span>
      </router-link>
    </div>
    <h1>Select the flag that matches the country name</h1>
    <h1 style="text-align: center">Placar</h1>
    <div class="placar">
      <h3>seguence: {{ sequence }}</h3>
      <h3>Acentos: {{ counter }}</h3>
      <h3> Best Sequence: {{ bestSequence }}</h3>
    </div>
    <div class="name">
      <h3>Rodada: {{ rodada }}</h3>
      <div v-if="random_name.length">
        <h1>Coutry name: {{ random_name[0].name.common }}</h1>
      </div>
    </div>
    <div class="coutries">
      <div v-for="(flag, index) in randomFlags" :key="index">
        <!-- Input escondido -->
        <input
          v-model="selectedFlag"
          type="radio"
          :value="flag.name.common"
          :id="'flag-' + index"
          name="flagSelection"
          class="hidden-radio"
        />
        <!-- Label para tornar clicável -->
        <label
          :for="'flag-' + index"
          @click="selectedFlag = flag.name.common"
          :class="{ 'selected-flag': selectedFlag === flag.name.common }"
        >
          <img :src="flag.flags.png" alt="Flag" />
        </label>
      </div>
    </div>
    <div v-if="selectedFlag" class="btn-send">
      <button style="background-color: green" @click="send">Send</button>
    </div>
    <div class="byn-restart">
      <button @click="restart">Restart Game</button>
    </div>
  </div>
</template>

  
  <script setup>
import { useCountryStore } from "@/stores/country";
import { ref, onMounted } from "vue";

// Definindo as variáveis reativas
const allCountries = ref([]);
const randomFlags = ref([]);
const countryStore = useCountryStore();
const random_name = ref([]);
const counter = ref(0);
const bestSequence = ref(parseInt(localStorage.getItem("bestSequence"))|| 0);
const sequence = ref(0);
const rodada = ref(0);
const selectedFlag = ref("");

function startGame() {
  allCountries.value = countryStore.allFlagsArray;
  console.log(allCountries.value); // Verificar se as bandeiras foram carregadas corretamente
  randomFlags.value = [];
  random_name.value = [];
  console.log(randomFlags.value.length);
  selectedFlag.value = "";
  rodada.value++;
  while (randomFlags.value.length < 4) {
    const randomIndex = Math.floor(Math.random() * allCountries.value.length);
    if (!randomFlags.value.includes(allCountries.value[randomIndex])) {
      randomFlags.value.push(allCountries.value[randomIndex]);
    }
  }
  const randomIndexName = Math.floor(Math.random() * randomFlags.value.length);
  console.log(randomIndexName);
  random_name.value.push(randomFlags.value[randomIndexName]);

  console.log(random_name.value[0].name.common);
}
function send() {
  console.log(selectedFlag.value);
  if (selectedFlag.value === random_name.value[0].name.common) {
    counter.value++;
    sequence.value++;
    startGame();
    if (sequence.value > bestSequence.value) {
      bestSequence.value = sequence.value;
      localStorage.setItem("bestSequence", bestSequence.value);
    }
    console.log("Acertou! Pontuação:", counter.value);
  } else {

    sequence.value = 0;
    startGame();
    console.log("errouuuu");
  }
}
function restart() {
  randomFlags.value = [];
  random_name.value = [];
  rodada.value = 0;
  counter.value = 0;
  startGame();
}
onMounted(async () => {
  await countryStore.getFlags();
  startGame();
});
</script>
  
  <style scoped>
.game {
  flex-direction: column;
  display: flex;
  align-items: center;
}
.name {
  align-items: center;
  justify-content: center;

  text-align: center;
}
.placar {
  display: flex;
  gap: 20px;

  text-align: center;
  justify-content: center;
}
.selected-flag {
  background-color: #4caf50; /* Verde */
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
}

.back {
  align-self: flex-start; /* Garante que o botão fique no canto superior esquerdo */
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.back-button .material-icons {
  font-size: 24px;
  color: black;
}

.coutries {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 bandeiras por linha */
  gap: 20px;
  justify-items: center;
  width: 100%;
  max-width: 800px; /* Ajuste o tamanho máximo conforme necessário */
  padding: 1rem;
}
.hidden-radio {
  display: none;
}
.btn-send {
  justify-content: center;
  display: flex;
}
.btn-send button {
  color: white;
  border-radius: 10px;
  padding: 10px;
}

.coutries img {
  max-width: 100%; /* Garante que a imagem se ajuste corretamente */
  height: auto;
}
</style>
  