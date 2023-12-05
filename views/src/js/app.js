import { createApp, ref } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia'
import WtNote from './components/wt-note.vue';
import { useNoteStore } from './stores/noteStore';

// Work with Vue3
const pinia = createPinia()
const app = createApp({ 
    components: {
        WtNote
    },
    setup () {
        const display = ref({
            addForm: false
        });

        const noteStore = useNoteStore();

        return { display, noteStore }
    }   
});

app.use(pinia)

app.mount('#app');