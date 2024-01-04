import { defineStore } from 'pinia'
import { computed, ref, reactive } from 'vue';
import noteApi from '../apis/noteApi';
import { useAppStore } from './appStore';

export const useNoteStore = defineStore('notes', () => {

    const notes = ref({});
    const colors = ref([]);
    const appStore = useAppStore();

    const form = reactive({
        id: '',
        title: '',
        content: '',
        color: '',
        isLoading: false,
        mode: 'add'
    });

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

    async function fetchColors() {
        console.log('Fetch colors...')
        colors.value = [];
        try {
            const response = await noteApi.getColors();
            colors.value = [...response.data.colors];
                console.log('===> Colors available: ', colors.value)            
        } catch (error) {
            console.log(error)
        }        
    }

    const getNotes = computed(() => {
        return notes.value;
    });

    const getColors = computed(() => {
        return colors.value;
    })

    function validate() {
        if (!form.title || !form.content || !form.color) {
            return false;
        }
        return true;
    }

    async function addNote(token) {
        setTimeout(() => {
            form.isLoading = true;
            reset();
            fetchNotes();
        }, 400);        
        console.log('Add new note...');
        const payload = {
            title: form.title,
            content: form.content,
            color: form.color,
            _csrf: token
        }
        try {
            const response = await noteApi.addNote(payload);
            if (response.data.response === 'created') {
                appStore.closePopup('addForm');
            }
            form.isLoading = false;
        } catch (err) {
            form.isLoading = false;
        }        
    }

    function addForm() {
        reset();
        appStore.openPopup('addForm');
    }

    function editForm(noteId, title, content) {
        form.mode = 'edit';        
        form.title = title;
        form.content = content;
        form.id = noteId;
        
        appStore.openPopup('addForm');
    }

    async function editNote(token) {        
        setTimeout(() => {
            form.isLoading = true;
            reset();
            fetchNotes();
        }, 400);
        console.log(`Edit note with id ${form.id}`);
        const { id, title, content } = form;
        const payload = {
            noteId: id,
            title, content,
            color: form.color,
            _csrf: token
        };
        console.log('Payload: ', payload)
        try {
            const response = await noteApi.editNote(payload);
            if (response.data.response === 'updated') {
                appStore.closePopup('addForm');
            }
            form.isLoading = false;
        } catch (err) {
            form.isLoading = false;
        }        
    }

    async function deleteNote(noteId, token) {
        console.log(`Delete note with id ${noteId}`);        
        try {
            const response = await noteApi.deleteNote( { noteId, _csrf: token });
            if (response.data.response === 'deleted') {                
                fetchNotes();
            }            
        } catch (err) {
            console.log(err);
        }
    }

    function reset() {
        form.mode = 'add';
        form.id = '';
        form.title = '';
        form.content = '';
    }

    function refresh() {
        notes.value = [];
        setTimeout(() => {
            fetchNotes();
        }, 250)
    }

    fetchNotes();
    fetchColors()

    return { 
        form, getNotes, getColors, validate,
        addForm, editForm,
        addNote, editNote, deleteNote, 
        refresh
    }
})
