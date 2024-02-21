<script setup>
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { user } = storeToRefs(useUserStore());

const router = useRouter();

const loading = ref(false);

async function logout() {
    loading.value = true;
    await supabase.auth.signOut();
    router.push({ name: 'login' }); 
}
</script>

<template>
    <header class="flex items-align p-2">
        <div v-if="user">Username : {{ user.username }}</div>
        <button :loading="loading" @click="logout" class="ml-auto rounded-md outline p-2">
            <span v-if="loading">...</span>
            <span v-else>Se déconnecter</span>
        </button>
    </header>
</template>