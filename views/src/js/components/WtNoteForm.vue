<script setup>
import { useNoteStore } from '../stores/noteStore';
import WtDialog from '../components/WtDialog.vue';
import Dropdown from 'primevue/dropdown';

const props = defineProps({    
    mode: { type: String, default: 'add' },
    visible: { type: Boolean, default: false },
    token: { type: String, default: '' }
});

const noteStore = useNoteStore();

function action() {
    if (!noteStore.validate()) {
        alert('Some fields are missing');
        return;
    }
    if (props.mode === 'add') {
        noteStore.addNote(props.token);
    } else {
        noteStore.editNote(props.token);
    }
}
</script>

<template>
<wt-dialog :visible="visible">
    <template #content>        
        <div class="border border-solid border-gray-400 px-4 py-2 bg-gray-100 shadow-sm">
            <form class="space-y-4 lg:space-y-6">
                <input type="hidden" name="_csrf" :value="token">
                <!-- Assuming you want to send data via POST request -->
                <!-- You can adjust the action attribute based on your route configuration -->                
                <div v-if="mode === 'edit'" class="flex flex-col gap-2">                    
                    <input
                        class="py-2 px-2 outline-none border border-gray-700 rounded"
                        id="note-title"
                        type="hidden"
                        placeholder="Enter your note title..."
                        v-model="noteStore.form.id"
                    >
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded shadow-sm" :style="{ backgroundColor: noteStore.form.color?.hex}"></div>
                        <Dropdown
                            v-model="noteStore.form.color"
                            :options="noteStore.getColors"
                            optionLabel="name"
                            placeholder="Select a color" class="w-full md:w-14rem"
                        />
                    </div>
                    <label class="font-bold text-lg">Title:</label>
                    <input
                        class="py-2 px-2 outline-none border border-gray-700 rounded"
                        id="note-title"
                        type="text"                            
                        placeholder="Enter your note title..."
                        v-model="noteStore.form.title"
                    >
                </div>                    

                <div class="flex flex-col gap-2">
                    <label class="font-bold text-lg">Content:</label>
                    <textarea
                        class="py-2 px-2 outline-none border border-gray-700 rounded"
                        id="note-content"
                        name="content"
                        rows="4"
                        cols="50"
                        placeholder="Capture your brightest ideas and thoughts here..."
                        v-model="noteStore.form.content"
                        required
                    ></textarea>
                </div>                            

                <button
                    v-show="!noteStore.form.isLoading"
                    class="bg-amber-700 text-white px-4 py-2 font-bold rounded text-lg hover:bg-amber-600"
                    @click.prevent="action"
                >{{ mode === 'edit' ? 'Edit note' : 'Save note' }}</button>
            </form>
        </div>
    </template>
</wt-dialog>
</template>