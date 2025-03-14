<template>
  <div class="container-home">
    <div class="tabs">
      <span
        @click="countryStore.selectedTab = 'currency'"
        :class="{ active: countryStore.selectedTab === 'currency' }"
        >Search by currency</span
      >
      <span
        @click="countryStore.selectedTab = 'name'"
        :class="{ active: countryStore.selectedTab === 'name' }"
        >Search by name</span
      >
      <span
        @click="countryStore.selectedTab = 'language'"
        :class="{ active: countryStore.selectedTab === 'language' }"
        >Search by language</span
      >
    </div>

    <div v-if="countryStore.selectedTab" class="search-box">
      <div class="label-box">
        <label v-if="countryStore.selectedTab === 'currency'"
          >Write the currency abbreviation</label
        >
        <label v-if="countryStore.selectedTab === 'name'"
          >Write the name of the country
        </label>
        <label v-if="countryStore.selectedTab === 'language'"
          >Write the language of the country</label
        >
      </div>

      <input
        v-if="countryStore.selectedTab === 'currency'"
        id="currency"
        v-model="countryStore.currency"
        placeholder="Dollar ex: USD"
      />
      <input
        v-if="countryStore.selectedTab === 'name'"
        v-model="countryStore.name"
        placeholder="ex: Brazil"
      />
      <input
        v-if="countryStore.selectedTab === 'language'"
        v-model="countryStore.language"
        placeholder="ex: Portuguese"
      />

      <button
        @click="search"
        v-if="countryStore.selectedTab === 'language' || 'name' || 'currency'"
        class="btn-search"
      >
        Search
      </button>
    </div>

    <button class="btn-clear" @click="clearFilters">
      Clear search filters
    </button>
    <div class="flags"  v-if="isLoading">
      <div v-for="index in itemsPerPage" :key="index" class="flag-container skeleton" >
          <div class="skeleton-img"></div>
          <div class="skeleton-text"></div>
        </div>
    </div>
    <div class="flags" v-else > 
     
  <div
        class="flag-container"
        v-for="(flag, index) in paginatedFlags"
        :key="index"
       >

        <img
          class="img-flag"
          :src="flag.flags.png"
          :alt="flag.flags.alt || flag.name.official"
          @click="goToCoutryDetails(flag.name.official)"
        />
        <p>
  {{ flag.name.official }}
</p>


      
      </div>
    </div>

    <div class="pagination">
      <button class="previus" @click="prevPage" :disabled="currentPage === 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="next"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCountryStore } from "@/stores/country";
import { useRouter } from "vue-router";
import { useFavoriteCountryStore } from "@/stores/favorite";
const router = useRouter();
const favoriteStore = useFavoriteCountryStore();
const countryStore = useCountryStore();
const currentPage = ref(1);
const itemsPerPage = 48;
const isLoading = ref(true);

const goToCoutryDetails = (countryName) => {
  router.push(`/country/${countryName}`);
};

onMounted(async () => {
  favoriteStore.loadFavorites();
  await countryStore.getFlags();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
const paginatedFlags = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return countryStore.filtred
    ? countryStore.flagsArray.slice(start, end)
    : countryStore.allFlagsArray.slice(start, end);
});

const totalPages = computed(() => {
  const totalItems = countryStore.filtred
    ? countryStore.flagsArray.length
    : countryStore.allFlagsArray.length;
  return Math.ceil(totalItems / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    isLoading.value = true;
    window.scrollTo({
        top: 0,          // Posição no eixo Y (topo)
        behavior: 'smooth' // Rolagem suave
      });
    setTimeout(() => {
    isLoading.value = false;
  }, 1000);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    isLoading.value = true;
    window.scrollTo({
        top: 0,          
        behavior: 'smooth' 
      });
    setTimeout(() => {
    isLoading.value = false;
  }, 1000);
  }
};

const search = () => {
  if (countryStore.selectedTab === "currency") {
    countryStore.getCurrency();
  } else if (countryStore.selectedTab === "name") {
    countryStore.getName();
  } else if (countryStore.selectedTab === "language") {
    countryStore.getLanguage();
  }
};

const clearFilters = () => {
  countryStore.filtred = false;
  countryStore.selectedTab = "";
};
</script>

<style scoped>

.container-home { 
  min-height: 80vh;
  background-color: #E0F7FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}


.tabs {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.tabs span {
  font-size: 1.1rem;
  font-weight: 500;
  color: #56A0AA;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0 0 5px 5px;
  transition: background-color 0.3s, color 0.3s;
}

.tabs span:hover,
.tabs span.active {
  background-color: #35828D;
  color: white;
}

.search-box {
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 2rem;
}

.search-box label {
  font-size: 1rem;
  color: #36848F;
  display: block;
  margin-bottom: 0.5rem;
}

.search-box input {
  padding: 0.8rem;
  width: 100%;
  border: 1px solid #36848F;
  border-radius: 7px;
  font-size: 1rem;

}

.search-box input:focus {
  border-color: #ffffff;
}



.btn-search,
.btn-clear {
  padding: 0.8rem 1.5rem;
  background-color: #36848F;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-search:hover,
.btn-clear:hover {
  background-color: #1F737F;
}


.flags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  justify-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
}


.flag-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  color:  #36848F;

  align-items: center;
  justify-content: center;
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


.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.previus,
.next {
  border: none;
  background-color: transparent;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

button:disabled {
  color: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.6;
}


.skeleton {
  background-color: #ddd;
  border-radius: 5px;
  padding: 10px;
}

.skeleton-img {
  width: 100px;
  height: 60px;
  background: linear-gradient(90deg, #ddd, #ccc, #ddd);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 5px;
}

.skeleton-text {
  width: 80px;
  height: 12px;
  margin-top: 10px;
  background: linear-gradient(90deg, #ddd, #ccc, #ddd);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 3px;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
