<template>
    <div>
        <div class="page-header">
            <h3>Dashboard</h3>
            <small>Claims analytics</small>
        </div>

        <div>
            <small>Total Claims</small>
            <h4>{{formatMoney(totalClaims)}}</h4>
        </div>
        <div class="analytics">
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-clipboard-check"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.deleted)}}</h4>
                    <small>Deleted claims</small>
                </div>
            </div>
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-handshake"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.paid)}}</h4>
                    <small>Paid claims</small>
                </div>
            </div>
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-bullhorn"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.open)}}</h4>
                    <small>Open claims</small>
                </div>
            </div>
        </div>

        <div class="charts">
            <div class="bar-chart">
                <chartist
                    type="Bar"
                    :data="{
                        labels: Object.keys(claimsBarChart),
                        series: [Object.values(claimsBarChart)],
                    }"
                    :options="chartOptions" >
                </chartist>
            </div>

            <div class="pie-chart">
                <chartist
                    type="Pie"
                    :data="{
                        labels: Object.keys(stats),
                        series: Object.values(stats),
                        color: ['#333', '#222', '#111']
                    }"
                    :options="chartOptions" >
                </chartist>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Claim } from '@/interfaces/claim'
import { formatMoney } from '../../utils'

@Component
export default class Home extends Vue {
    //data definitions
    claims: Array<Claim> = []
    total: number = 0
    paid: number = 0
    open: number = 0

    chartOptions: object = {
        lineSmooth: false,
        fullWidth: true,
    }


    async mounted() {
        await this.fetchClaims()
    }
    
    //computed
    get stats(): object {
        let paid: number = 0
        let open: number = 0
        let deleted: number = 0

        this.claims.map(claim => {
            paid += claim.status === 'PAID'? claim.fees : 0
            open += claim.status === 'OPEN'? claim.fees : 0
            deleted += claim.status === 'DELETED'? claim.fees : 0
        })

        return { paid, open, deleted }
    }

    get totalClaims() {
        let total = 0;
        this.claims.map((claim) => {
            total += claim.fees as number
        })
        return total
    }

    get claimsBarChart() {
        return this.claims.reduce((accumulator, current) => {
            const month = current.dueDate.substr(0, 7)
            if (!accumulator[month]) {
                accumulator[month] = 0
            }
            accumulator[month] += current.fees / 100 //Divide currency by 100 to show actual value
            return accumulator
        }, {} as any)
    }


    //methods
    async fetchClaims() {
        try {
            const res = await this.axios.get('claims')
            this.claims = res.data as Array<Claim>
        }catch(error) {
            console.log(error)
        }
    }

    formatMoney(amount: number): string {
        return formatMoney(amount)
    }
    
}

</script>6