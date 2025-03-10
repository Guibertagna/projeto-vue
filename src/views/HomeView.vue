<script setup>
import HomeComponent from "../components/HomeComponent.vue";
</script>
<template>
    <div class="container">
        <HomeComponent />
    </div>
</template>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
}
</style>
