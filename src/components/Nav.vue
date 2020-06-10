<template>
  <div class="nav">
    <div class="nav__left">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <img src="../assets/logo.png" alt="Logo" width="45" height="45" />
        </a>
      </h1>
      <ul class="flex-div">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/add-blog">Add Blog</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.nav {
  padding: 0 12px;
  background: #222;

  &__left {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    padding: 13px;
    font-weight: bold;
    color: #fff;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: none;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
