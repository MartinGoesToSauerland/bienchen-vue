<script setup>
    
    const props = defineProps(["percent","strokeColor","chartTitle"]);
    const percent = `${props.percent}, 100`
    const color = props.strokeColor ?? "orange";
</script>
<template>
    <div class="flex-wrapper">
        <div class="single-chart">
            <h2>{{ chartTitle }}</h2>
            <svg viewBox="0 0 36 36" class="circular-chart" :class="color">
            <path class="circle-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
                :stroke-dasharray="percent"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">{{ props.percent }}%</text>
            </svg>
        </div> 
    </div>
</template>
<style scoped>
.flex-wrapper {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.flex-wrapper h2 {
    text-align: center;
}
.single-chart {
  width: 33%;
  justify-content: space-around ;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
}

.circle-bg {
  fill: white;
  stroke: #eee;
  stroke-width: 3.8;
  opacity: 0.7;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.circular-chart.orange .circle {
  stroke: #ff9f00;
}

.circular-chart.green .circle {
  stroke: #4CC790;
}

.circular-chart.blue .circle {
  stroke: #3c9ee5;
}

.percentage {
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>