<template>
    <div class="home">
        <div class="container">
            <h1 class="mt-5">{{ $t('home.title') }}</h1>
            <form class="loginForm p-4 mt-5 mx-auto">
                <h4 class="mb-3">{{ $t('home.loginForm.title') }}</h4>
                <div class="form-group text-left">
                    <label for="exampleInputEmail1">{{ $t('home.loginForm.emailInput') }}</label>
                    <input type="email" v-model="$v.email.$model" @input="setEmail($event.target.value)" class="form-control" :class="classEmailValid" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <small id="emailHelp" v-if="!$v.email.email" class="form-text text-danger">{{ $t('home.loginForm.emailHelp') }}</small>
                </div>
                <div class="form-group text-left">
                    <label for="exampleInputPassword1">{{ $t('home.loginForm.password') }}</label>
                    <input type="password" v-model.trim="password" @input="setPassword($event.target.value)" class="form-control" :class="classPassValid" id="exampleInputPassword1">
                    <small id="passwordHelp" v-if="!$v.password.minLength" class="form-text text-danger">{{ $t('home.loginForm.passwordHelp') }}</small>
                </div>
                <button type="button" @click="formSubmit" class="btn btn-primary">{{ $t('home.loginForm.submit') }}</button>
                <small class="form-text text-success" v-if="submitStatus === 'OK'">{{ $t('home.loginForm.submitSuccessMessage') }}</small>
                <small class="form-text text-danger" v-if="submitStatus === 'ERROR'">{{ $t('home.loginForm.submitErrorMessage') }}</small>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { validationMixin } from 'vuelidate';
    import { Validations, Validate } from 'vuelidate-property-decorators';
    import { required, minLength, email } from 'vuelidate/lib/validators';
    import axios from "@/plugins/axios";

    @Component({
        mixins: [validationMixin]
    })
    export default class HomePage extends Vue {
        private submitStatus = ''

        // @Validations()
        // validations = {
        //     email: {required, email},
        //     password: {required, minLength: minLength(6)},
        // }
        @Validate({required, email})
        email = '';

        @Validate({required, minLength: minLength(6)})
        password = '';

        get classEmailValid(): string {
            return (!this.$v.email.email || !this.$v.email.required) ? 'is-invalid': 'is-valid'
        }

        get classPassValid(): string {
            return this.$v.password.$error ? 'is-invalid': 'is-valid'
        }

        setEmail(value: string): void {
            this.email = value;
            this.$v.email.$touch();
        }

        setPassword(value: string): void {
            this.password = value;
            this.$v.password.$touch();
        }

        public async formSubmit(): Promise<void> {
            let apiResponse;
            const formData = {
                email: this.email,
                password: this.password
            }
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                console.log('error');
            } else {
                this.submitStatus = 'OK';
                try {
                    apiResponse = await axios.post("/login", formData);
                    console.log(apiResponse);
                    return apiResponse.data;
                } catch (err) {
                    console.log(err);
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .loginForm {
        max-width: 400px;
        background-color: #dadada;
        border-radius: 20px;
    }
</style>