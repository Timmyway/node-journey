import { createApp, ref } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia'
import WtNoteForm from './components/WtNoteForm.vue';
import WtNote from './components/WtNote.vue';
import { useAppStore } from './stores/appStore';
import { useNoteStore } from './stores/noteStore';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'

// Work with Vue3
const pinia = createPinia();
const app = createApp({ 
    components: {
        WtNote,
        WtNoteForm
    },
    setup () {
        const appStore = useAppStore();

        const noteStore = useNoteStore();

        return { appStore, noteStore }
    }   
});

app.use(pinia);
app.use(PrimeVue);

app.mount('#app');