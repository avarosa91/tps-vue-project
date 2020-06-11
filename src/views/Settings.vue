<template>
    <div class="settings">
        <div class="container">
            <h1 class="mt-5">{{ $t('settings.title') }}</h1>
            <div class="d-flex flex-row mt-5">
                <MainSettings/>
                <PrivacySettings/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import MainSettings from "@/components/MainSettings.vue";
    import PrivacySettings from "@/components/PrivacySettings.vue";

    @Component({
        components: { MainSettings, PrivacySettings },
    })
    export default class Settings extends Vue {

    }
</script>

<style scoped lang="scss">
    .loginForm {
        max-width: 400px;
        background-color: #dadada;
        border-radius: 20px;
    }
</style>