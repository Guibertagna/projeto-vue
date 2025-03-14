import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetalhesView from '@/views/DetalhesView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import GameView from '@/views/GameView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { title: 'Home' } },
  { path: '/country/:name', name: 'Detalhes', component: DetalhesView, props: true, meta: { title: 'Detalhes' } },
  { path: '/game', name: 'Game', component: GameView, meta: { title: 'Game' } },
  { path: '/fav', name: 'Favorites', component: FavoritesView, meta: { title: 'Favorites' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next(); 
})

export default router;
