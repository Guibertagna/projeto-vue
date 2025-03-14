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
    <h2 class="game-title">Select the flag that matches the country name</h2>

    <div class="placar">
      <div class="score-box">
        <h4>Current sequence: {{ sequence }}</h4>
        <h4>Hit: {{ counter }}</h4>
        <h4>Best Sequence: {{ bestSequence }}</h4>
      </div>
    </div>

    <div class="name">
      <h3 class="round-text">Round: {{ rodada }}</h3>
      <div v-if="random_name.length">
        <h1><strong>Country Name: {{ random_name[0].name.common }}</strong></h1>

      </div>
    </div>

    <div class="coutries" :class="{ 'shake-animation': isError }">
      <div v-for="(flag, index) in randomFlags" :key="index" class="flag-card">
 
        <input
          v-model="selectedFlag"
          type="radio"
          :value="flag.name.common"
          :id="'flag-' + index"
          name="flagSelection"
          class="hidden-radio"
        />
      
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
      <button class="send-btn" @click="send">Send</button>
    </div>

    <div class="byn-restart">
      <button class="restart-btn" @click="restart">Restart Game</button>
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
const bestSequence = ref(parseInt(localStorage.getItem("bestSequence")) || 0);
const sequence = ref(0);
const rodada = ref(0);
const selectedFlag = ref("");
const isError = ref(false);

function startGame() {
  allCountries.value = countryStore.allFlagsArray;
  randomFlags.value = [];
  random_name.value = [];
  selectedFlag.value = "";
  rodada.value++;
  while (randomFlags.value.length < 4) {
    const randomIndex = Math.floor(Math.random() * allCountries.value.length);
    if (!randomFlags.value.includes(allCountries.value[randomIndex])) {
      randomFlags.value.push(allCountries.value[randomIndex]);
    }
  }
  const randomIndexName = Math.floor(Math.random() * randomFlags.value.length);
  random_name.value.push(randomFlags.value[randomIndexName]);
}

function send() {
  if (selectedFlag.value === random_name.value[0].name.common) {
    counter.value++;
    sequence.value++;
    startGame();
    if (sequence.value > bestSequence.value) {
      bestSequence.value = sequence.value;
      localStorage.setItem("bestSequence", bestSequence.value);
    }
  } else {
    sequence.value = 0;
    isError.value = true; 
    setTimeout(() => {
      isError.value = false; // Desativa a animação após 0.5s
    }, 500);
    startGame();
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  #E0F7FA;
  padding: 20px;
}

.game-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.placar {
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}
.back {
  display: flex;
  justify-content: flex-start;
  width: 100%; 
  margin-bottom: 20px; 
}
.score-box {
  color: #ffff;
  background:   #35828D;
  display: flex;
  gap: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.score-box h3 {
  margin: 5px 0;
  font-size: 18px;
  color: #333;
}

.selected-flag {
  background-color: #4caf50; 
  padding: 10px;
 
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  margin-left: 20px;
}

.back-button .material-icons {
  font-size: 24px;
  color: black;
}

.coutries {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  justify-items: center;
  max-width: 400px;
  margin-top: 20px;
}

.flag-card {
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden-radio {
  display: none;
}

.btn-send {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.send-btn {
  background-color: #4caf50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.send-btn:hover {
  background-color: #45a049;
}

.byn-restart {
  margin-top: 20px;
}

.restart-btn {
  background-color: #d9534c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.restart-btn:hover {
  background-color: #c9302c;
}

.coutries img {
  max-width: 90%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
.name{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.round-text {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}

.shake-animation {
  animation: shake 0.5s ease-in-out;
}

</style>
