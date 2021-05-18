<template>
    <div class="account-page-wrapper">
        <div class="account-container">
            <div class="account-header">
                <div>
                    <img src="@/assets/logo.png" alt="LOGO" width="45px">
                    <h3>Receeve</h3>
                </div>
                <small>Sign into your account</small>
            </div>
            <div class="account-content">
                <form @submit.prevent="login()">
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="text" v-model="email" class="form-control" id="email" placeholder="johndoe@example.com" />
                    </div>
                    <div class="mb-1">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" id="password" placeholder="*******" />
                    </div>
                    <div class="mb-4 text-end">
                        <a href="">Forgot password?</a>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-block btn-main">Sign Me in!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Accounts extends Vue {
    //Data definitions
    email: string = ''
    password: string = ''

    //methods
    login() {
        //validate empty data
        if(!this.email || !this.password) {
            return this.$toast.open({
                message: "Email and password are required",
                type: "error"
            })
        }
        
        const token = JSON.stringify(Math.floor(Math.random() * 100900) + 1) //Random token for user session
        localStorage.setItem('token', token) //store token in localStorage
        this.$router.push('/')
    }
}

</script>