<template>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $t('nav.language') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <template v-for="(lang, i) in $i18n.availableLocales">
                    <a :key="`Lang${i}`" @click.prevent="setLocale(`${lang}`)" class="dropdown-item">{{ lang }}</a>
                </template>
            </div>
        </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    @Component
    export default class LangSwitcher extends Vue{
        public setLocale(locale: string): void {
            this.$i18n.locale = locale
            if(this.$route.params.lang !== locale) {
                this.$router.push({
                    params: {lang: locale}
                })
            }
        }
    }
</script>