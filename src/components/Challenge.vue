<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For details about the acceptance criteria go to the README file.
    </p>

    <h3>Links of interest</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Vue Docs</a>
      </li>
      <li>
        <a
          href="https://github.com/kaorun343/vue-property-decorator"
          target="_blank"
          rel="noopener"
          >Vue Property Decorator</a
        >
      </li>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/json-server"
          target="_blank"
          rel="noopener"
          >json-server</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Challenge extends Vue {
  @Prop()
  msg!: string;
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
