<script setup>
import {computed} from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const props = defineProps({
    message: {
        type: Object,
        required: true 
    }
});

const { user }= storeToRefs(useUserStore());

const emit = defineEmits(['delete']);

function formatDate(date){
    let formattedDay = "Aujourd'hui";

    let currentTime = new Date();
    
    if(
        date.getDate() != currentTime.getDate() 
        || currentTime.getMonth() != date.getMonth()
        || currentTime.getFullYear() != date.getFullYear()
    ) {
        formattedDay = date.toLocaleDateString();
    }
    
    let formattedTime = date.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'});
    return `${formattedDay} à ${formattedTime}`;
};

const formattedDate = computed(() => {
    const date = new Date(props.message.created_at);
    return formatDate(date);
});

const avatarUrl = computed(() => {
    if (!props.message.author.avatar_url)
        return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${props.message.author.username}`;
    return props.message.author.avatar_url;
});

</script>

<template>
    <div class="flex">
        <img class="bg-slate-600 h-10 w-10 mr-1 rounded-full" :src="avatarUrl" :alt="message.author.username">
        {{ message.author.username }}
        <span class="text-xs text-opacity-40 text-gray-50 ml-1">
            
            {{ formattedDate }}
            <!--TODO-->
            <!-- Aujourd'hui si c'est aujourd'hui -->
            <!-- Hier...-->
        </span>        

        <button v-if="user && user.id===message.author.id" @click="emit('delete', message.id)" class="bg-red-500 rounded-md p-2 ml-2 hover:bg-red-600">
            <TrashIcon class="w-4 h-4" />
        </button>
    </div>

    <div>
        {{ message.content }}
    </div>
</template>