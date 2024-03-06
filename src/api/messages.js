import { supabase } from '@/supabase';
import { ref } from 'vue';

export const messageList = ref([]);

export const insertMessage = async (content, author_id) => {
  await supabase.from('messages').insert({
    content,
    author_id
  }).then(() => {
    console.log('Message added');
  }).catch((error) => {
    console.error('Error adding message', error);
  });
}

export const fetchMessage = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*, author:profiles(username, id, avatar_url)')
    .order('created_at', { ascending: false})
    .limit(100);

  if(error) {
    console.error('Error fetching messages:', error);
    return;
  }
  messageList.value = data.reverse();
}

export const subsribeToMessage = () => {
    supabase.channel('messages_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages'
      },
      async () => { 
        return await fetchMessage();  
      }
      ).subscribe();
}