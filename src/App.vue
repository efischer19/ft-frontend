<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/blog">Blog</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
    margin:40px auto;
    max-width:800px;
    line-height:1.6;
    font-size:18px;
    color:#444;
    padding:0 10px;
}

h1,h2,h3 {
    line-height:1.2;
}

img {
    width:100%;
    height:auto;
}

.hidden {
    position:absolute;
    left:-10000px;
    top:auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
