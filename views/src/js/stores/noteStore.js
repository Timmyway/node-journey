import { defineStore } from 'pinia'
import { computed, ref, reactive } from 'vue';
import noteApi from '../apis/noteApi';

export const useNoteStore = defineStore('notes', () => {

    const notes = ref({});

    const form = reactive({
        title: '',
        content: '',
        isLoading: false
    })

    async function fetchNotes() {
        console.log('Fetch notes...')
        notes.value = [];
        try {
            const response = await noteApi.getNotes();        
            setTimeout(() => {
                notes.value = [...response.data.notes];
                console.log('===> Values: ', notes.value)   
            }, 200);            
        } catch (error) {
            console.log(error)
        }        
    }

    const getNotes = computed(() => {
        return notes.value;
    });

    async function addNote() {
        setTimeout(() => {
            form.isLoading = true;
            reset();
            fetchNotes();
        }, 400);        
        console.log('Add new note...');
        const payload = {
            title: form.title,
            content: form.content
        }
        try {
            const response = await noteApi.addNote(payload);
            form.isLoading = false;
        } catch (err) {
            form.isLoading = false;
        }        

        console.log('====> Response from store: ', response)
    }

    function reset() {
        form.title = '';
        form.content = '';
    }

    fetchNotes();

    return { form, getNotes, addNote }
})
