<template>
  <nav>
    <span id="logo">Verifyr.</span>
    <div id="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About Us</router-link>
      <router-link to="/faq">FAQ</router-link>
    </div>
    <div id="auth">
      <router-link to="/login">Log in</router-link> /
      <router-link to="/signup">
        <button class="transparent-btn">Sign Up</button>
      </router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap");
#app {
  font-family: "Space Grotesk", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: floralwhite;
  background-color: rgb(17, 74, 84);
}

body {
  margin: 0;
  padding: 0;
}

nav {
  padding: 2.5rem 13rem;
  display: flex;
}

nav a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3em;
  color: floralwhite;
  margin: 0 1.5rem;
}

nav a.router-link-exact-active {
  color: rgb(233, 245, 73);
}

#logo {
  font-size: 2.5em;
  font-weight: 700;
  color: rgb(233, 245, 73);
}

#links {
  display: flex;
  align-items: center;
  margin: auto;
}

#auth {
  display: flex;
  align-items: center;
}

button {
  font-family: "Space Grotesk", sans-serif;
  padding: 15px 30px;
  border-radius: 40px;
  font-size: 1em;
  font-weight: 500;
}

.transparent-btn {
  background-color: rgb(17, 74, 84);
  color: floralwhite;
  border-color: floralwhite;
}

.color-btn {
  background-color: rgb(233, 245, 73);
  color: rgb(17, 74, 84);
  border: none;
}
</style>

<style scoped>
button {
  padding: 10px 25px;
}
</style>
