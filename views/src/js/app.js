import { createApp, ref } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia'

// Work with Vue3
const pinia = createPinia()
const app = createApp({    
    setup () {
        const msg = ref('Hellow world');

        return { msg }
    }   
});

app.use(pinia)

app.mount('#app');