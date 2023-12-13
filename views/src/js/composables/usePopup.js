import { computed, ref } from 'vue';

export function usePopup(panels) {

    const display = ref(panels);    

    function openPopup(popup) {
        console.log('==> Open popup: ', popup)
        display.value[popup] = true;
    }

    function closePopup(popup) {
        display.value[popup] = false;
    }

    return { display, openPopup, closePopup }
}