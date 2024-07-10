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
  <div class="partners">
    <div>Meet Out Partners</div>
    <img :src="require('@/assets/logo1.svg')" alt="logo1" />
    <img :src="require('@/assets/logo2.svg')" alt="logo2" />
    <img :src="require('@/assets/logo3.svg')" alt="logo3" />
    <img :src="require('@/assets/logo4.svg')" alt="logo4" />
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
  background-color: rgb(17, 74, 84);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 83vh;
  padding: 0 13rem;
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

.partners {
  background-color: floralwhite;
  color: slategray;
  font-size: 2em;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  padding: 3rem 18rem;
}
</style>
