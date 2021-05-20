<template>
    <div>
        <input type="checkbox" id="menu-toggle">
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
                        <a @click.stop="logout()" href="#">
                            <span class="las la-power-off"></span>
                            Signout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-content">
            <header>
                <div>
                    <label class=".menu-toggler" for="menu-toggle">
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
    //methods 
    logout(): void {
        localStorage.clear()
        this.$router.push('/login')
    }
}
</script>