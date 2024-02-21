<script setup>
import {computed} from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    message: {
        type: Object,
        required: true 
    }
});

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
    const date = props.message.date;
    return formatDate(date);
});

</script>

<template>
    <div class="flex">
        <img class="bg-slate-600 h-10 w-10 mr-1 rounded-full" :src="message.user.avatarUrl">
        {{ message.user.username }}
        <span class="text-xs text-opacity-40 text-gray-50 ml-1">
            
            {{ formattedDate }}
            <!--TODO-->
            <!-- Aujourd'hui si c'est aujourd'hui -->
            <!-- Hier...-->
        </span>

        

        <button @click="emit('delete', message.id)" class="bg-red-500 rounded-md p-2 ml-2 hover:bg-red-600">
            <TrashIcon class="w-4 h-4" />
        </button>
    </div>

    <div>
        {{ message.text }}
    </div>
</template>