<template>
    <div>
        <div class="account-card card">
            <div class="card-header">
                <h4 class="card-title">Accounts</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th style="width:80px;"><strong>#</strong></th>
                                <th><strong>TITLE</strong></th>
                                <th><strong>NAME</strong></th>
                                <th><strong>STATE</strong></th>
                                <th><strong>MOBILE</strong></th>
                                <th><strong>EMAIL</strong></th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(account, index) in accounts" :key="index">
                                <td><strong>{{index + 1}}</strong></td>
                                <td>{{account.debtor.title}}</td>
                                <td>{{account.debtor.firstName}} {{account.debtor.lastName}}</td>
                                <td>{{account.debtor.address.state}}</td>
                                <td>{{account.debtor.mobilePhone}}</td>
                                <td>{{account.debtor.email}}</td>
                                <td>
                                    <button type="button" @click="$router.push(`account-details/${account.id}`)" class="btn btn-main btn-action">Details <span class="las la-arrow-right"></span></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="">
            <nav class="account-pagination">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="page-link" @click="fetchAccounts(pageNums[0])"><span class="las la-arrow-left"></span> First</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="fetchAccounts(pageNums[1])">Next</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="fetchAccounts(pageNums[2])">Last <span class="las la-arrow-right"></span></button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Account } from '../interfaces/account'

@Component
export default class Accounts extends Vue {
    accounts: Array<Account> = []
    links: string = ''

    async mounted() {
        this.fetchAccounts()
    }

    //methods
    async fetchAccounts(page: number = 1) {
        try {
            const res = await this.axios.get(`accounts?_page=${page}`)
            this.links = res.headers.link
            this.accounts = res.data as Array<Account>
        }catch(error) {
            console.log(error)
        }
    }

    //Getters
    get pageNums(): Array<string> {
        let splitLinks = this.links.split(',');
        splitLinks.map((link, index) => {
            let strLink = link.split(';')[0]
            strLink = strLink.replace(/[<>]/g, '')
            splitLinks[index] = strLink.split('=')[1]
        })

        return splitLinks;
    }


}

</script>
