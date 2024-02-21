import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    //const isLoggedIn = computed(() => !!user.value);
    
    async function fetchUserProfile(userId) {
        if(!userId){
            user.value = null;
            return;
        }

        // fetch user profile from the server
        const {data, error} =  await supabase.from('profiles').select('*').
            eq('id', userId).single();

        if(error){
            console.error('Error fetching user profile:', error);
            return;
        }

        user.value = data;
        //return user.value;
    }
    
    return { user, fetchUserProfile };
});
