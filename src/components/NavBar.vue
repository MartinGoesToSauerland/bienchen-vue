<script setup>
import { ref } from 'vue';
import { inject } from "vue";
const helper = inject('$store');
console.log(helper);

const menu = [
    /*
    {ref: "../#home", name: "Home"},
    {ref: "../areas", name: "Areas"},
    {ref: "../#contact", name: "Contact"},
*/
    {ref: { path: '../', hash: '#home' }, name: "Home"},
    {ref: "../areas", name: "Flächen"},
    {ref: { path: '../', hash: '#contact' }, name: "Kontakt"},
    
];
const isActiveBm = ref(false);
const isOpenOverlay = ref(false);

const toggle = () => {
    isActiveBm.value = !isActiveBm.value;
    isOpenOverlay.value = !isOpenOverlay.value;
}

const clicked = async () => {
    await sleep(500);
    toggle();
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<template>
    <div v-if="helper.isLoading">
        <LoadingSpinner />
    </div>
    <header>
        <h1><router-link class="none-decoration" to="/">bienchenoase.de</router-link></h1>
        <div class="button_container"
            id="toggle" :class="{
            'active': isActiveBm
          }"
          @click="toggle">
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
        </div>
        <div class="overlay"
            id="overlay"
            :class="{
             'open': isOpenOverlay
          }">
            <nav class="overlay-menu">
                <ul>
                    <li v-for="(link, index) in menu" :key="index">
                        <router-link :to="link.ref" @click="clicked">{{ link.name }}</router-link>
                    </li>
                    
                </ul>
            </nav>
        </div>
    </header>
</template>