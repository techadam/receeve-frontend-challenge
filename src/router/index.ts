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
            { path: 'home', component: Home, name: 'Stats', meta: {auth: true} },
            { path: 'accounts', component: Accounts, name: 'Accounts', meta: {auth: true} },
            { path: 'accounts/:id/', component: AccountInfo, name: 'Account Info', meta: {auth: true} }
        ] as Array<RouteConfig>
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {auth: false}
    },
    { path: "*", redirect: '/' } //handle 404
]


/**
 * Router config
 */
const router = new VueRouter({
    mode: 'history',
    routes,
})

/**
 * route guard, Prevent unauthorized accounts from accessing pages that need auth
 */
router.beforeEach((to, from, next) => {
    const token = localStorage.token
    
    if(to.meta.auth === true && !token) {
        return next('/login')
    }

    if(!to.meta.auth && token) {
        return next('/home')
    }

    next()
})


export default router;
