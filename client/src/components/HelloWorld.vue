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
      <button class="transparent-btn">Explore Our Features</button>
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
.section {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
  padding-left: 13rem;
}

.hero {
  font-size: 4.5em;
  font-weight: 700;
  line-height: 100%;
}

.sub-hero {
  font-size: 1.2em;
  font-weight: 400;
  line-height: 120%;
  margin: 2em 0;
}
.color-btn {
  margin-right: 25px;
}
</style>
