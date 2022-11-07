<script setup>
import { ref } from "vue";
import { comhelper } from "../helpers/comhelper";
import { onMounted } from "vue";

const data = ref({
    name: '',
    email: '',
    phone: '',
    message: ''
})

const showForm = ref(true);
const isDisabled = ref(true);
const error = ref({});
onMounted(() => {
    
});

const isSubmitable = (fieldName) => {
    error.value = {};
    const checkName = () => {
        if (data.value.name.length <= 2) {
            error.value.name = "Name zu kurz";
        }        
    }     
    const checkEmail = () => {
        if (! /\S+@\S+\.\S+/.test(data.value.email)) {
            error.value.email = "Email bitte eingeben";
        }            
    }
    const checkMessage = () => {
        if (data.value.message.length <= 5) {
            error.value.message = "Nachricht bitte eingeben";
        }            
    }    

    checkName();
    checkEmail();
    checkMessage(); 

    if (Object.keys(error.value).length == 0) {
        isDisabled.value = false;
    } else {
        isDisabled.value = true;
    }
}

const send = async (event) => {
    // const data = new FormData(event.target); 
    const response = await comhelper.sendMail(data.value);
    console.log("x",  response);
    if (response) {
        // remove loader
        showForm.value = false;
    }
};
</script>
<template>
  <div class="form-container">
      
    <form id="form" v-if="showForm">
      
        <legend>Contact Form</legend>
        <div class="mb-10 input-group">
          <label for="name">Full Name</label><br />
          <input
            @input="isSubmitable('name')"
            v-model="data.name"
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            required
          />
          <div class="form-error text-small" v-if="error">{{ error.name }}</div>
        </div>
        <div class="mb-10 input-group">
          <label for="email">Email Address</label><br />
          <input
            @input="isSubmitable('email')"
            v-model="data.email"
            type="email"
            name="email"
            id="email"
            placeholder="you@company.com"
            required
          />
          <div class="form-error text-small" v-if="error">{{ error.email }}</div>
        </div>
        <div class="mb-10">
          <label for="phone">Phone Number</label>
          <br />
          <input
            v-model="data.phone"
            type="text"
            name="phone"
            id="phone"
            placeholder="+1 (555) 1234-567"
            required
          />
        </div>
        <div>
          <label for="message">Your Message</label>
          <br />
          <textarea
            @input="isSubmitable('message')"
            v-model="data.message"
            rows="5"
            name="message"
            id="message"
            placeholder="Your Message"
            required
          ></textarea>
          <div class="form-error text-small" v-if="error">{{ error.message }}</div>
        </div>

        <button
            @click.prevent="send" 
            class="btn btn-success mb-10"
            :disabled="isDisabled"
            :class="{active: !isDisabled}"
        >Send Message</button>
      
    </form>
    <div v-else>
        <div class="container flex">
            <div>
                <svg width="150" height="150" class="text-color-success text-shadow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z" stroke="currentColor" stroke-width="3"></path></svg>
                <h1 class="text-color-success text-shadow">Vielen Dank für Ihre Mail!</h1>
            </div>
        </div>
    </div>
    
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 500px;
}

.text-right {
  text-align: right;
}
.text-small {
  font-size: 0.8rem;
}
.form-error {
  color: red;
  margin-top: -30px;
  margin-left: 20px;
  position: absolute;
}
.input-group {
    position: relative;
}
</style>