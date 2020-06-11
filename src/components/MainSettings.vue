<template>
        <form class="loginForm bg-light p-4 mx-auto">
        <h4 class="mb-3">{{ $t('settings.loginForm.main.title') }}</h4>

        <div class="form-group text-left">
            <label for="firstName">{{ $t('settings.loginForm.main.firstName') }}</label>
            <input type="text"
                   v-model="$v.firstName.$model"
                   @input="setFirstName($event.target.value)"
                   class="form-control"
                   :class="classFirstNameValid"
                   id="firstName">
        </div>

        <div class="form-group text-left">
            <label for="lastName">{{ $t('settings.loginForm.main.lastName') }}</label>
            <input type="text"
                   v-model="$v.lastName.$model"
                   @input="setLastName($event.target.value)"
                   class="form-control"
                   :class="classLastNameValid"
                   id="lastName">
        </div>

        <div class="form-group text-left">
            <label for="sex">{{ $t('settings.loginForm.main.sex') }}</label>
            <select v-model="$v.sex.$model"
                    @input="setSex($event.target.value)"
                    class="form-control"
                    :class="[!$v.sex.required ? 'is-invalid' : 'is-valid']"
                    id="sex">
                <option v-for="(sex, i) in $t('settings.loginForm.main.sexTypes')"
                        :key="`${sex}${i}`">{{ sex }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="relationship">{{ $t('settings.loginForm.main.relationship') }}</label>
            <select v-model="$v.relationship.$model"
                   @input="setRelationship($event.target.value)"
                   class="form-control"
                    :class="[!$v.relationship.required ? 'is-invalid' : 'is-valid']"
                   id="relationship">
                <option v-for="(relationship, i) in $t('settings.loginForm.main.relationshipStatus')"
                        :key="`${relationship}${i}`">{{ relationship }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="dateOfBirth">{{ $t('settings.loginForm.main.dateOfBirth') }}</label>
            <date-picker
                    id="dateOfBirth"
                    v-model="$v.dateOfBirth.$model"
                    :class="[!$v.dateOfBirth.required ? 'is-invalid' : 'is-valid']"
                    valueType="format"
                    @input="setDateOfBirth($event)"></date-picker>
        </div>

        <div class="form-group text-left">
            <label for="location">{{ $t('settings.loginForm.main.location') }}</label>
            <input type="text"
                   v-model="$v.location.$model"
                   @input="setLocation($event.target.value)"
                   class="form-control"
                   :class="[!$v.location.required ? 'is-invalid' : 'is-valid']"
                   id="location">
        </div>
            <button type="button" @click="formSubmit" class="btn btn-primary">{{ $t('settings.loginForm.save') }}</button>
            <small class="form-text text-success" v-if="submitStatus === 'OK'">{{ $t('settings.loginForm.saveSuccessMessage') }}</small>
            <small class="form-text text-danger" v-if="submitStatus === 'ERROR'">{{ $t('settings.loginForm.saveErrorMessage') }}</small>
        </form>

</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { validationMixin } from 'vuelidate';
    import { Validate } from 'vuelidate-property-decorators';
    import { required, minLength } from 'vuelidate/lib/validators';

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    import axios from "@/plugins/axios";

    @Component({
        components: { DatePicker },
        mixins: [validationMixin]
    })
    export default class MainSettings extends Vue {
        private submitStatus = ''

        @Validate({required, minLength: minLength(2)})
        firstName = '';

        @Validate({required, minLength: minLength(2)})
        lastName = '';

        @Validate({required})
        sex = '';

        @Validate({required})
        relationship = '';

        @Validate({required})
        dateOfBirth = '';

        @Validate({required})
        location = '';

        get classFirstNameValid(): string {
            return (!this.$v.firstName.required || this.$v.firstName.$error) ? 'is-invalid' : 'is-valid';
        }

        get classLastNameValid(): string {
            return (!this.$v.lastName.required || this.$v.lastName.$error) ? 'is-invalid' : 'is-valid';
        }

        setFirstName(value: string): void {
            this.firstName = value;
            this.$v.firstName.$touch();
        }

        setLastName(value: string): void {
            this.lastName = value;
            this.$v.lastName.$touch();
        }

        setSex(value: string): void {
            this.sex = value;
            this.$v.sex.$touch();
        }

        setRelationship(value: string): void {
            this.relationship = value;
            this.$v.relationship.$touch();
        }

        setDateOfBirth(value: string): void {
            this.dateOfBirth = value;
            this.$v.dateOfBirth.$touch();
        }

        setLocation(value: string): void {
            this.location = value;
            this.$v.location.$touch();
        }

        public async formSubmit(): Promise<void> {
            let apiResponse;
            const formData = {
                firstName: this.firstName,
                lastName: this.lastName,
                sex: this.sex,
                relationship: this.relationship,
                dateOfBirth: this.dateOfBirth,
                location: this.location,
            }
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                console.log('error');
            } else {
                this.submitStatus = 'OK';
                try {
                    apiResponse = await axios.post("/mainSettings", formData);
                    console.log(apiResponse);
                    return apiResponse.data;
                } catch (err) {
                    console.log(err);
                }
            }

        }
    }
</script>
