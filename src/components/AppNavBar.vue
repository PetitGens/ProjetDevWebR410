<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useUserStore());
</script>

<template>
    <header class="flex items-align p-2">
        <div v-if="user">Username : {{ user.username }}</div>
        <button class="ml-auto rounded-md outline p-2">Se déconnecter</button>
    </header>
</template>