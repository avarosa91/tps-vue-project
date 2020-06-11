<template>
  <div class="hello">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <router-link class="navbar-brand" tag="a" :to="`/${$i18n.locale}/`">{{ $t('nav.logo') }}</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="`/${$i18n.locale}/`">{{ $t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="`/${$i18n.locale}/about`">{{ $t('nav.about') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="`/${$i18n.locale}/contacts`">{{ $t('nav.contacts') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="`/${$i18n.locale}/settings`">{{ $t('nav.settings') }}</router-link>
          </li>
        </ul>
        <LangSwitcher></LangSwitcher>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LangSwitcher from "@/components/LangSwitcher.vue";

@Component({
  components: {LangSwitcher}
})
export default class NavBar extends Vue {
}
</script>

<style scoped lang="scss">
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
