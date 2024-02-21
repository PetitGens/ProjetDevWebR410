import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '@/views/ChatView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import { supabase } from '@/supabase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});

router.beforeEach(async (to, from, next) => {
    const {data} = await supabase.auth.getSession();
    const isLoggedIn = !!data.session;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && !isLoggedIn) {
        next({name: 'login'});
        return;
    }

    if(!requiresAuth && isLoggedIn) {
      next({name: 'chat'});
    }

    next();
});

export default router;
