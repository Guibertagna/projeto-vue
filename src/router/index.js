import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetalhesView from '@/views/DetalhesView.vue';
import GameView from '@/views/GameView.vue';

const routes= [
    {path : '/', name: 'Home', component : HomeView, meta:{title:'Home'}},
    { path: '/country/:name', component: DetalhesView, props: true },
    { path: '/game', component: GameView },
    
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  
  })
  export default router