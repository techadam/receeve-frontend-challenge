import VueRouter, { RouteConfig } from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

//Router components
import Login from '@/pages/Login.vue'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/pages/Home.vue'
import Accounts from '@/pages/Accounts.vue'
import AccountInfo from '@/pages/AccountInfo.vue'

/**
 * Routes
 */
const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Dashboard,
        name: 'Home',
        redirect: 'home',
        children: [
            { path: 'homem', component: Home, name: 'Stats', meta: {auth: true} },
            { path: 'accounts', component: Accounts, name: 'Accounts', meta: {auth: true} },
            { path: 'accounts/:id/', component: AccountInfo, name: 'Account Info', meta: {auth: true} }
        ] as Array<RouteConfig>
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]


/**
 * Router config
 */
const router = new VueRouter({
    mode: 'history',
    routes,
})



export default router;
