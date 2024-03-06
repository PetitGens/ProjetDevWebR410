<script setup>
import ChatMessage from '@/components/ChatMessage.vue';
import AppNavBar from '@/components/AppNavBar.vue';

import { ref, onMounted } from "vue";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { insertMessage, fetchMessage, subsribeToMessage, messageList } from '@/api/messages';

const messageText = ref('');

onMounted(async () => await fetchMessage());

subsribeToMessage();

const { user } = storeToRefs(useUserStore());

const textarea = ref(null);

async function addMessage(){
    if(messageText.value.charAt(messageText.value.length - 1) == "\n"){
        messageText.value = messageText.value.substring(0, messageText.value.length - 1);
    }

    if(! messageText.value){
        return;
    }

    await insertMessage(messageText.value, user.value.id);

    messageText.value = '';
    textarea.value.focus()
}

function deleteMessage(id){
    messageList.value = messageList.value.filter(message => message.id !== id);
}

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden">
        <app-nav-bar/>
        <div class="overflow-auto grow">
            <div v-for="(message, index) in messageList" class="p-4" :key="index">
                <chat-message @delete="deleteMessage" :message="message"></chat-message>
            </div>
        </div>
        <div class="flex align-center p-4 border-t border-t-slate-700">
            <textarea
                ref="textarea"
                @keyup.enter.exact="addMessage"
                v-model="messageText" 
                name="message" 
                id="message" 
                rows="1" 
                class="text-black rounded-md"
            ></textarea>
            <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
        </div>
    </div>
</template>