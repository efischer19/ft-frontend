<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

*:before, *:after {
  box-sizing: border-box;
}

html, body {
  height: 95%;
  position: relative;
  background-color: #EEEEEE;
  margin: 0px;
}

#app {
  margin: 0px auto;
  max-width: 800px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 0 10px;
}

h1,h2,h3 {
  line-height: 1.2;
}
</style>
