<template>
    <div class="home">
        <div class="container">
            <h1 class="mt-5">{{ $t('home.title') }}</h1>
<!--            <p class="lead mt-5" v-html="$t('home.content')"></p>-->
            <form class="loginForm p-4 mt-5 mx-auto">
                <h4 class="mb-3">{{ $t('home.loginForm.title') }}</h4>
                <div class="form-group text-left">
                    <label for="exampleInputEmail1">{{ $t('home.loginForm.emailInput') }}</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <small id="emailHelp" class="form-text text-muted">{{ $t('home.loginForm.emailHelp') }}</small>
                </div>
                <div class="form-group text-left">
                    <label for="exampleInputPassword1">{{ $t('home.loginForm.password') }}</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">{{ $t('home.loginForm.submit') }}</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue } from "vue-property-decorator";
    export default class HomePage extends Vue {

    }
</script>

<style scoped lang="scss">
    .loginForm {
        max-width: 400px;
        background-color: #dadada;
        border-radius: 20px;
    }
</style>