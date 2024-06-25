<template>
  <div class="section">
    <div class="hero">
      Ensure Your Next<br />
      Business Partner<br />
      is Legit.
    </div>
    <div class="sub-hero">
      Whether you're about to sign a contract, establish a<br />
      partnership, or make an important hire, Verifyr provides you<br />
      with the assurance you need
    </div>
    <div class="btn">
      <button class="color-btn">Get Started</button>
      <button class="transparent-btn">Watch Our Features</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap");

* {
  font-family: "Space Grotesk", sans-serif;
  color: floralwhite;
}

.section {
  background-color: rgb(17, 74, 84);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 92vh;
  padding-left: 18rem;
}

.hero {
  font-size: 6em;
  font-weight: 700;
  line-height: 100%;
}

.sub-hero {
  font-size: 1.5em;
  font-weight: 400;
  line-height: 120%;
  margin: 1.8em 0;
}

button {
  padding: 20px 35px;
  border-radius: 40px;
  font-size: 1.3em;
  font-weight: 600;
}

.transparent-btn {
  background-color: rgb(17, 74, 84);
  color: floralwhite;
  border-color: floralwhite;
}

.color-btn {
  background-color: rgb(233, 245, 73);
  color: rgb(17, 74, 84);
  margin-right: 25px;
}
</style>
