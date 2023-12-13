import { defineStore } from 'pinia'
import { usePopup } from '../composables/usePopup';

export const useAppStore = defineStore('application', () => {

    const { display, openPopup, closePopup } = usePopup({
        addForm: false
    });

    return { display, openPopup, closePopup }
})
