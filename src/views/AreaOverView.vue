<script setup>
    import { comhelper } from "../helpers/comhelper.js";
    import { onMounted } from "vue";
    import { ref } from "vue";
    import leaflet from "leaflet"

    const areas = ref(null);
    let map = {};
    let geojsonFeature = {};

    onMounted(async () => {
        areas.value = await comhelper.getAreas();

        areas.value = areas.value.map( _ => {
            _.geo_json = JSON.parse(_.geo_json);
            return _;
        });

        geojsonFeature = areas.value.map(_ => _.geo_json)

        map = L.map('map', {
            center: [51.4281604, 11.9024726],
            zoom: 15,
            scrollWheelZoom: false
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            scrollWheelZoom: false,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const  myStyle = {
            "color": "#ff7800",
            "weight": 3,
            "opacity": 1
        };


        L.geoJSON(geojsonFeature, {
            style: myStyle
        }).addTo(map);

    });
</script>

<template>
  <main>
      <section style="background: white">
        <div class="container" >
            <h1>Area Overview</h1>
            <div>
                <div v-for="area in areas" :key="area.id">
                    {{ area.name }} {{ area.country }} {{ area.state }} {{ area.zip }} {{ area.street }}
                    <table>
                        <thead>
                            <th>id</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>ZIP</th>
                            <th>Street</th>
                            <th>Description</th>
                            <th>Vist</th>
                        </thead>
                        <tr>
                            <td>{{ area.id }}</td>
                            <td>{{ area.country }}</td>
                            <td>{{ area.state }}</td>
                            <td>{{ area.zip }}</td>
                            <td>{{ area.street }}</td>
                            <td>
                                {{ area.description }}<br/>
                                {{area.size_qm}}qm²
                            </td>
                            <td><router-link :to="'/areas/'+area.id">go</router-link></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
      </section>

    <div id="map" style="z-index: 0;"></div>
  </main>
</template>

<style scoped>
#map {
    height: 50vh;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
</style>
