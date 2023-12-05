<script setup>
const props = defineProps({
    item: Object
});
</script>

<template>
<div class="p-2 py-3 bg-yellow-200 border-l-yellow-700 border-l-4 w-full max-w-xs">
    <div class="space-y-4">
        <h6 class="font-bold text-lg">{{ item?.title }}</h6>
        <p class="text-gray-700 leading-relaxed max-h-20 truncate">{{ item?.content }}</p>
    </div>
</div>
</template>