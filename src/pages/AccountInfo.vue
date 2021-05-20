<template>
    <div>
        <div class="claims-detail-grid">
            <div class="account-card card">
                <div class="card-header">
                    <h5 class="card-title">Account info</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div>
                            <table>
                                <tbody v-if="account.debtor">
                                    <tr>
                                        <th>NAME</th>
                                        <td class="text-main">{{account.debtor.title}} {{account.debtor.firstName}} {{account.debtor.lastName}}</td>
                                    </tr>
                                    <tr>
                                        <th>STATE</th>
                                        <td>{{account.debtor.address.state}}</td>
                                    </tr>
                                    <tr>
                                        <th>CITY</th>
                                        <td>{{account.debtor.address.city}}</td>
                                    </tr>
                                    <tr>
                                        <th>ZIP</th>
                                        <td>{{account.debtor.address.zip}}</td>
                                    </tr>
                                    <tr>
                                        <th>COUNTRY</th>
                                        <td>{{account.debtor.address.country}}</td>
                                    </tr>
                                    <tr>
                                        <th>PHONE</th>
                                        <td>{{account.debtor.mobilePhone}}</td>
                                    </tr>
                                    <tr>
                                        <th>EMAIL</th>
                                        <td>{{account.debtor.email}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div class="account-card card">
                <div class="card-header claim-info-header">
                    <h5 class="card-title">Claims</h5>
                    <a class="btn-share-claim" :href="`mailto:abc@example.com?subject=Claim details for account with ID ${account.id}&body=${pageLink}`">Share via mail <span class="las la-share"></span></a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th style="width:80px;"><strong>#</strong></th>
                                    <th><strong>CURRENCY</strong></th>
                                    <th><strong>BASE AMT.</strong></th>
                                    <th><strong>FEES</strong></th>
                                    <th><strong>DUE DATE</strong></th>
                                    <th><strong>STATUS</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(claim, index) in claims" :key="index">
                                    <td><strong>{{index + 1}}</strong></td>
                                    <td>{{claim.currency}}</td>
                                    <td>{{claim.baseAmount}}</td>
                                    <td>{{claim.fees}}</td>
                                    <td>{{claim.dueDate}}</td>
                                    <td>
                                        <span class="badge" :class="attachStatusColor(claim.status)">
                                            {{claim.status}}
                                        </span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Account } from '../interfaces/account'
import { Claim } from '../interfaces/claim'

@Component
export default class AccountInfo extends Vue {
    account: object = {} as Account
    claims: Array<Claim> = []
    pageLink: string = ''

    async mounted() {
        await this.fetchAccount()
        this.pageLink = window.location.href
    }

    //methods
    async fetchAccount() {
        //verify that the route params is present on route else redirect user
        if(!this.$route.params.id) return this.$router.push('/')

        try {
            const res = await this.axios.get(`accounts?id=${this.$route.params.id}`)
            
            //check if data is available, then get claims
            if(res.data.length > 0) {
                this.account = res.data[0]
            }

            const resClaim = await this.axios.get(`claims?accountId=${this.$route.params.id}`)
            this.claims = resClaim.data as Array<Claim>

        }catch(error) {
            console.log(error)
        }
    }


    attachStatusColor(status: string): string {
        status = status.toLowerCase()
        if(status === 'open') {
            return 'bg-primary'
        }else if(status === 'paid') {
            return 'bg-success'
        }else{
            return 'bg-danger'
        }
    }


}

</script>
