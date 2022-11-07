<script>
import { ref } from 'vue';
import { comhelper } from "../helpers/comhelper.js";

export default {
  name: "ModalBottom",
  props: ['contentData'],
  data() {
    return {
      showModal: false,
      isDisabled: true,
      showForm: 1,
      data: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: ''
      }
    };
  },
  methods: {
      close() {
        this.showModal = !this.showModal;
        this.$emit("closeEvent", true); // @todo implement emit with compositin api
      },
      async reserve(id) {
        console.log(id)
        console.log(this.contentData);
        const userData = this.data;
        const areaId = this.contentData.value.area_id;
        const parcelId = this.contentData.value.id;

        const result = await comhelper.reserve(areaId, parcelId, userData)
        this.successfullyReserve();
        // this.close();
      },
      isFormValid() {
          console.log(123)
          if (this.data.email == '') {
              this.isDisabled = true;
              return;
          }
          console.log(this.data);
          this.isDisabled = false;
      },
      successfullyReserve() {
          this.showForm = false;
          this.isDisabled = true;
      }
  }
}
 /*   props: {
        contentData: Object
    },
    setup(props, context) {
        console.log(context.attrs)
        console.log("modal 1")
        console.log(props.contentData)
    },
    mounted() {
        console.log("modal")
        const showModal = ref(false);

        const toggle = () => {
            console.log(123)
            // showModal.value = !showModal.value;
        }
    }
    bis 15:30
}*/
</script>

<template>
  <!-- The Modal -->
  <div id="myModal" class="modal" :class="{'hide': showModal}">

    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
          <div class="container">
        <!--span class="close">&times;</span-->
            <h2>Fläche {{ contentData.value.id }}</h2>
          </div>
      </div>
      <div class="modal-body container" style="min-height: 50vh">
        <div class="text-center" v-if="contentData.value.status == 2">
            <p>Owner: {{ contentData.value.details.firstname}} {{ contentData.value.details.lastname}}</p>
            <p>Rented since: {{ contentData.value.details.start_at.split("T")[0]}}</p>
            <p>Rented until: {{ contentData.value.details.end_at.split("T")[0]}}</p>
        </div>

        <div class="container text-center" v-if="contentData.value.status == 1">
            <p>Reserved for: {{ contentData.value.details.firstname}} {{ contentData.value.details.lastname}}</p>
            <p>Reserved on: {{ contentData.value.details.created_at}}</p>
            <br/>
            <p>Status: Wating for expanse...</p>

        </div>

        <div v-if="contentData.value.status == 0">
            <p>Some other text...</p>
            <form v-if="showForm">
                <div class="form-container">
                    <div class="input-group">
                        <label for="first-name">First Name</label>
                        <input
                        id="first-name"
                        v-model="data.firstName"
                        type="text"
                        placeholder="First Name"
                        name="first-name"
                        required
                        />
                    </div>

                    <div class="input-group">
                        <label for="last-name">Last Name</label>
                        <input
                        id="last-name"
                        v-model="data.lastName"
                        type="text"
                        placeholder="last Name"
                        name="last-name"
                        required
                        />
                    </div>

                    <div class="input-group">
                        <label for="email">Email Address*</label>
                        <input
                        id="email"
                        v-model="data.email"
                        type="text"
                        placeholder="Email"
                        name="email"
                        required
                        @change="isFormValid"
                        />

                    </div>

                    <div class="input-group">
                        <label for="phone-number">Phone Number</label>
                        <input
                        id="phone-number"
                        v-model="data.phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        name="phone-number"
                        required
                        />
                    </div>
                </div>

            </form>
            <div v-else>
                <div class="container flex">
                    <div>
                        <svg width="150" height="150" class="text-color-success text-shadow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z" stroke="currentColor" stroke-width="3"></path></svg>
                        <h1 class="text-color-success">Fläche wurde für Sie reserviert!</h1>
                        <h3>Wir kontaktieren Sie umgehend!</h3>
                    </div>
                </div>                
            </div>

        </div>
        <!--hr/>
        {{ contentData }}
        <button @click="close">close</button>-->
      </div>
      <div class="modal-footer">
          <div class="modal-footer-wrapper">
            <div>
                <button @click="close" class="btn btn-negate">Close</button>
            </div>
            <div v-if="contentData.value.status == 0">
                <button
                    @click="reserve(contentData.value)"
                    class="btn btn-success"
                    :disabled="isDisabled"
                    :class="{active: !isDisabled}"
                    >
                    Reserve</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.hide {
  display: none; /* Hidden by default */
}
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s
}

/* Modal Content */
.modal-content {
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #341C09;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    display: flex;
    justify-content: center;
    padding: 10px 26px;
    background-color: #341C09;
    color: white;
    text-align: center;
}
.modal-footer-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap:20px;
    width: var(--app-max-width);
}
/* Add Animation */
@-webkit-keyframes slideIn {
  from {bottom: -300px; opacity: 0}
  to {bottom: 0; opacity: 1}
}

@keyframes slideIn {
  from {bottom: -300px; opacity: 0}
  to {bottom: 0; opacity: 1}
}

@-webkit-keyframes fadeIn {
  from {opacity: 0}
  to {opacity: 1}
}

@keyframes fadeIn {
  from {opacity: 0}
  to {opacity: 1}
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 500px;
}
</style>