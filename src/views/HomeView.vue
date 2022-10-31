<script setup>
import ContactForm from "../components/ContactForm.vue"
</script>
<template>
    <main>

      <section id="home">

        <div class="parallax parallax-meadow">
          <div class="center-box text-center">
            <div>
              <h1>hallo</h1>
              <button class="btn btn-action" @click="$router.push({path: '/areas'})">Flächen buchen</button>
            </div>
          </div>
          
          <div class="w-1 ">
            
            <div class="w-2">
              <div class="banner-a"></div>
              <div class="banner-b"></div>  
            </div>
          </div>
          
        </div>
        
      </section>

      <section id="about">
        <div class="s-orange">

          <h2>1. Suche Dir eine geeignete Parzelle die du mieten möchtest</h2>
          <h2>2. Wähle die Parzelle und miete sie für ein Jahr</h2>
          <h2>3. ...und sicherer Bienen und anderen Insekten den Lebensraum.</h2>
        </div>
      </section>

      <section id="work">
        <div class="parallax parallax-hex">
          WORK
        </div>
      </section>

      <section id="contact">
          <ContactForm />
      </section>
      
    </main>
</template>

<style scoped>

  .w-1 {
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 0 auto;
    max-width: 620px;
  }

  .w-2 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    width:100%;
  }

  .banner-a, .banner-b {
    width: 300px;
    height:70px;
    background-repeat: no-repeat;
    background-size: cover;    
    background-position: center center;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .banner-a {
    background-image: url('./images/logo-1.webp');
  }

  .banner-b {
    background-image: url('./images/logo-2.webp');
  }

  .btn {
    cursor: pointer;
    padding: 10px 40px;
    border-radius: var(--border-radius);
    max-width:300px;
  }
  .btn:hover {
    background: black;
    color: white;
    border-color: #999;
    box-shadow: var(--shadow);
  }
  .btn-action {
    border: 1px solid var(--white);
    background-color: orange;
    font-weight: bold;
    box-shadow: var(--shadow);
    color: white;
    font-size: 1.5rem;
  }
</style>