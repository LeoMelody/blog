<template>
  <div id="app">
    <PersonCard />
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'

export default {
  name: 'app',
  components: {
    PersonCard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
body {
  background: #f2f2f2;
}
* {
  margin: 0;
}
</style>
