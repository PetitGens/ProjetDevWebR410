<script setup>
import {ref} from 'vue'
import ChatMessage from '@/components/ChatMessage.vue';

const messageText = ref('');
const messageList = ref([]);

const textarea = ref(null);

function addMessage(){
    if(messageText.value.charAt(messageText.value.length - 1) == "\n"){
        messageText.value = messageText.value.substring(0, messageText.value.length - 1);
    }

    if(! messageText.value){
        return;
    }

    messageList.value.push({
        id: Math.random().toString(32).slice(2),
        text: messageText.value,
        date: new Date(),
        user: {
            username: 'PetitGens',
            avatarUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/654c7554-888a-4fff-bc61-5785cc9b7fa9/de6e47n-dee882ce-0fe5-4ea2-9bc9-c06755e6bf70.png/v1/fill/w_894,h_894/shiny_eevee__dp_sprite__by_lazoofficial_de6e47n-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzYwMCIsInBhdGgiOiJcL2ZcLzY1NGM3NTU0LTg4OGEtNGZmZi1iYzYxLTU3ODVjYzliN2ZhOVwvZGU2ZTQ3bi1kZWU4ODJjZS0wZmU1LTRlYTItOWJjOS1jMDY3NTVlNmJmNzAucG5nIiwid2lkdGgiOiI8PTM2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GaDuq0RJtLLlLp-cWnHgGCn8-j203qfxjAvVrvZkMZY'
        }
    });
    messageText.value = '';
    textarea.value.focus()
}

function deleteMessage(id){
    messageList.value = messageList.value.filter(message => message.id !== id);
}

</script>

<template>
    <div v-for="(message, index) in messageList" class="p-4" :key="index">
        <chat-message @delete="deleteMessage" :message="message"></chat-message>
    </div>
    <div class="flex align-center p-2">
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
</template>