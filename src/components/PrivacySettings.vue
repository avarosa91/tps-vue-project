<template>
    <form class="loginForm bg-light p-4 mx-auto">
        <h4 class="mb-3">{{ $t('settings.loginForm.privacy.title') }}</h4>
        <div class="form-group text-left">
            <label for="pageType">{{ $t('settings.loginForm.privacy.pageType') }}</label>
            <select v-model="$v.pageType.$model"
                    @input="setPageType($event.target.value)"
                    class="form-control"
                    :class="[!$v.pageType.required ? 'is-invalid' : 'is-valid']"
                    id="pageType">
                <option v-for="(type, i) in $t('settings.loginForm.privacy.pageTypes')"
                        :key="`${type}${i}`">{{ type }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="messages">{{ $t('settings.loginForm.privacy.messages') }}</label>
            <select v-model="$v.messages.$model"
                    @input="setMessages($event.target.value)"
                    class="form-control"
                    :class="[!$v.messages.required ? 'is-invalid' : 'is-valid']"
                    id="messages">
                <option v-for="(message, i) in $t('settings.loginForm.privacy.messagesPermits')"
                        :key="`${message}${i}`">{{ message }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="postsWrite">{{ $t('settings.loginForm.privacy.postsWrite') }}</label>
            <select v-model="$v.postsWrite.$model"
                    @input="setPostsWrite($event.target.value)"
                    class="form-control"
                    :class="[!$v.postsWrite.required ? 'is-invalid' : 'is-valid']"
                    id="postsWrite">
                <option v-for="(post, i) in $t('settings.loginForm.privacy.postsWritePermits')"
                        :key="`${post}${i}`">{{ post }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="postsLook">{{ $t('settings.loginForm.privacy.postsLook') }}</label>
            <select v-model="$v.postsLook.$model"
                    @input="setPostsLook($event.target.value)"
                    class="form-control"
                    :class="[!$v.postsLook.required ? 'is-invalid' : 'is-valid']"
                    id="postsLook">
                <option v-for="(post, i) in $t('settings.loginForm.privacy.postsLookPermits')"
                        :key="`${post}${i}`">{{ post }}</option>
            </select>
        </div>

        <div class="form-group text-left">
            <label for="friendsLook">{{ $t('settings.loginForm.privacy.friendsLook') }}</label>
            <select v-model="$v.friendsLook.$model"
                    @input="setFriendsLook($event.target.value)"
                    class="form-control"
                    :class="[!$v.friendsLook.required ? 'is-invalid' : 'is-valid']"
                    id="friendsLook">
                <option v-for="(friend, i) in $t('settings.loginForm.privacy.friendsLookPermits')"
                        :key="`${friend}${i}`">{{ friend }}</option>
            </select>
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
    import { required } from 'vuelidate/lib/validators';
    import axios from "@/plugins/axios";

    @Component({
        mixins: [validationMixin]
    })
    export default class PrivacySettings extends Vue{
        private submitStatus = ''

        @Validate({required})
        pageType = '';

        @Validate({required})
        messages = '';

        @Validate({required})
        postsWrite = '';

        @Validate({required})
        postsLook = '';

        @Validate({required})
        friendsLook = '';

        setPageType(value: string): void {
            this.pageType = value;
            this.$v.pageType.$touch();
        }

        setMessages(value: string): void {
            this.messages = value;
            this.$v.messages.$touch();
        }

        setPostsWrite(value: string): void {
            this.postsWrite = value;
            this.$v.postsWrite.$touch();
        }

        setPostsLook(value: string): void {
            this.postsLook = value;
            this.$v.postsLook.$touch();
        }

        setFriendsLook(value: string): void {
            this.friendsLook = value;
            this.$v.friendsLook.$touch();
        }

        public async formSubmit(): Promise<void> {
            let apiResponse;
            const formData = {
                pageType: this.pageType,
                messages: this.messages,
                postsWrite: this.postsWrite,
                postsLook: this.postsLook,
                friendsLook: this.friendsLook,
            }
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                console.log('error');
            } else {
                this.submitStatus = 'OK';
                try {
                    apiResponse = await axios.post("/privacySettings", formData);
                    console.log(apiResponse);
                    return apiResponse.data;
                } catch (err) {
                    console.log(err);
                }
            }

        }
    }
</script>
