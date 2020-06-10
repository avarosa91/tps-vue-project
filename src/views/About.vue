<template>
  <div class="about">
    <div class="container">
      <h1 class="mt-5">{{ $t('about.title') }}</h1>
      <p class="lead mt-5" v-html="$t('about.content')"></p>
    </div>
  </div>
</template>