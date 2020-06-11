<template>
  <div class="contacts">
    <div class="container">
      <h1 class="mt-5">{{ $t('contacts.title') }}</h1>
      <p class="lead mt-5" v-html="$t('contacts.content')"></p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class Contacts extends Vue{
  }
</script>