<script setup lang="ts">
import { ref, onMounted } from 'vue';

const angle = ref(0);
const max_hour = ref(24); // 24 heures dans une journée
const degree_per_hour = ref(360 / max_hour.value);
const current_hour = ref(new Date().getHours());
const current_degree = ref(current_hour.value * degree_per_hour.value);

onMounted(() => {
    angle.value = current_degree.value;
    setInterval(() => {
        current_hour.value = new Date().getHours();
        current_degree.value = current_hour.value * degree_per_hour.value;
        angle.value = current_degree.value;
    }, 1000);
});
</script>s

<template>
    <div>
        {{ current_hour }}
        {{ current_degree }}
    </div>
    <main class="bg-gray-300 h-screen flex items-center justify-center relative">
        <div id="sun" class="h-[150px] w-[150px] bg-yellow-400 rounded-full absolute"
            :style="{
                transform: `rotate(${angle}deg) translateX(300px)`,
                transformOrigin: 'center center'
            }">
        </div>
        <div id="sun" class="h-32 w-32 bg-yellow-200 border border-12 border-yellow-300 rounded-full absolute"
            :style="{
                transform: `rotate(${angle}deg) translateX(300px)`,
                transformOrigin: 'center center'
            }">
        </div>
        
        <div 
        class="h-24 w-24 bg-yellow-100 border-12 border-yellow-300  rounded-full absolute"
        :style="{
                transform: `rotate(${angle}deg) translateX(300px)`,
                transformOrigin: 'center center'
            }">

        </div>
        <div 
            class="h-12 w-12 bg-white rounded-full absolute border-12 border-yellow-300 "
            :style="{
                transform: `rotate(${angle}deg) translateX(300px)`,
                transformOrigin: 'center center'
            }">
        </div> 
        <div class="w-[600px] h-[600px] border rounded-full">

        </div>
    </main>
</template>