<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-brand">
                <img src="@/assets/logo.png" alt="LOGO" width="45px" />
                <h4>Receeve</h4>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li>
                        <router-link to="/">
                            <span class="las la-icons"></span>
                            Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/accounts">
                            <span class="las la-users"></span>
                            Accounts
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            <span class="las la-power-off"></span>
                            Signout
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-content">
            <header>
                <div>
                    <label for="menu-toggle">
                        <span class="las la-bars"></span>
                    </label>
                    <div class="search-wrapper">
                        <input type="search" placeholder="Find something here...">
                        <span class="las la-search"></span>
                    </div>
                </div>
                <div>
                    <div class="account-img"></div>
                    <div class="account-info">
                        <h5>Johndoe</h5>
                        <small>Super Admin</small>
                    </div>
                </div>
            </header>
            <main>
                
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
    
}
</script>