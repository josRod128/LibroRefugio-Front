<script setup>
  const props = defineProps({
    text: {
      type: String,
      default: "NUESTRA CASA, TUS HISTORIAS"
    }
  })

</script>

<template>
  <div class="greetings">
    <h1 class="coffe">LibroRefugio</h1>
    <hr>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'BeauRivage';
  src: url('../assets/fonts/BeauRivage-Regular.ttf');
}
@media screen and (min-width: 922px) {
  .coffe {
    font-size: 5vw;
  }
  p{
    font-size: 2vw;
  }
  
}
@media screen and (max-width: 922px) {
  .coffe {
    margin-top: 10px;
    font-size: 11vw;
  }
  p{
    font-size: 7vw;
  }
}
.coffe {
  font-family: 'BeauRivage';
}
p{
  color: #C0B2A4;
}
.greetings {
  text-align: center;
}
hr{
  margin-top: -21px;
  width: 100%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(230, 52, 98, 0.75), rgba(255, 255, 255, 0));
}

</style>
