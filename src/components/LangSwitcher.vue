<template>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $t('nav.language') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" @click.prevent="setLocale(`${lang}`)" class="dropdown-item" href="#">{{ lang }}</a>
            </div>
        </div>
</template>

<script lang="ts">
    import { Vue } from "vue-property-decorator";
    export default class LangSwitcher extends Vue{
        public setLocale(locale: any): void {
            this.$i18n.locale = locale
            if(this.$route.params.lang !== locale) {
                this.$router.push({
                    params: {lang: locale}
                })
            }
        }
    }
</script>