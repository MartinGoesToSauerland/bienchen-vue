<script setup>
import { ref } from 'vue';

const menu = [
    {ref: "../#home", name: "Home"},
    {ref: "../areas", name: "Areas"},
    {ref: "../#contact", name: "Contact"},
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
                        <a :href="link.ref" @click="clicked">{{ link.name }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>