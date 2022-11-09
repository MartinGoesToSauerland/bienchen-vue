<script setup>
import ContactForm from "../components/ContactForm.vue";
import { inject, onMounted} from "vue";

const helper = inject('$store');
onMounted(async () => {
  helper.isLoading = true;
  await new Promise(r => setTimeout(r, 200)); // sleep  
  helper.isLoading = false;  
  
});
</script>
<template>
    <main>

      <section id="home">

        <div class="parallax parallax-meadow">
          <div class="center-box text-center">
            <div>
              <h1>Werde ein Bienenheld!</h1>
              <button class="btn btn-action" @click="$router.push({path: '/areas'})">Flächen auswählen</button>
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

      <!--section id="about">
        <div class="s-orange">

          <h2>Flächen verfügbar: 10.000qm/2</h2>
          <h2>Flächen in Blühwiesen umgewandelt: 200qm/2</h2>
          <h2>...</h2>
        </div>
      </section-->

      <section id="work">
        <div class="parallax x-parallax-hex">
          <div class="container text-center" style="column-count: 1; font-size: 1.1rem; color: black; padding:20px 10px 20px 10px;">
            <h2>Kurzvorstellung</h2>
            In den letzten Jahren ist ein zunehmendes Bienensterben zu beobachten. Die Ursachen hierfür sind vielfältig und reichen von Krankheiten über den Klimawandel bis hin zu bestimmten Formen der landwirtschaftlichen Nutzung. Die Folgen des zunehmenden Bienensterbens können zu einer ernsten Bedrohung werden. Wenn Bienen fehlen, stehen diese nicht mehr als Bestäuber der Pflanzen zur Verfügung. Etwa ein Drittel der menschlichen Lebensmittel aber wächst ausschließlich nach der Bestäubung durch Bienen. Folglich droht eine große Lücke in der menschlichen Versorgung, wenn die entsprechenden Nahrungsmittel wegfallen. Daher müssen alle Anstrengungen unternommen werden, um das zunehmende Bienensterben wieder zu stoppen.

            Hier setzt die Idee von Bienchenoase an. Wir wollen bislang landwirtschaftlich genutzte Flächen komplett aus der landwirtschaftlichen Produktion herausnehmen, um dort bienenfreundliche Biotope zu schaffen. Dies erfordert insbesondere die Ansiedelung von Pflanzenarten, deren Blüten viel Pollen und Nektar produzieren. Die geschaffenen Biotope sollen den Bienen dann eine ausreichende Nahrungsgrundlage vom Frühjahr bis in den Herbst hinein bieten. Bienchenoase möchte daher Menschen vernetzen, welche einen Beitrag zum Schutz der Bienen leisten wollen. In diesem Rahmen werden wir landwirtschaftliche Flächen anpachten. Im Fokus stehen hierbei konventionell genutzte Flächen – also landwirtschaftliche Flächen mit einem intensiven Einsatz mineralischer Dünger sowie chemischer Pflanzenschutzmittel (Insektizide, Herbizide, Fungizide). Die angepachteten Flächen werden wir parzellieren und im Rahmen mit Ihnen geschlossener Patenschaften in bienenfreundliche Biotope umwandeln.
          </div>
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
    background-image: url('@/assets/images/logo-1.webp');
  }

  .banner-b {
    background-image: url('@/assets/images/logo-2.png');
  }

</style>