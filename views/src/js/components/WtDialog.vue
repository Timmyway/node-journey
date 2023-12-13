<script setup>
import Dialog from 'primevue/dialog';
import { useAppStore } from '../stores/appStore';

const appStore = useAppStore();

</script>

<template>
<Dialog v-model:visible="appStore.display.addForm" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <slot name="content"></slot>
</Dialog>
</template>