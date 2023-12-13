
import Api from './api.js';

export default {
    async getNotes() {
        try {
            return await Api.get('/api/notes');
        } catch(error) {
            throw error;
        }
    },
    async addNote(payload) {
        try {
            return await Api.post('/api/notes', payload);
        } catch(error) {
            throw error;
        }
    },
    async editNote(payload) {
        try {
            return await Api.post('/api/notes/edit', payload);
        } catch(error) {
            throw error;
        }
    }
}
