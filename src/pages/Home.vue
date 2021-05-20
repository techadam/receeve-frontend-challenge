<template>
    <div>
        <div class="page-header">
            <h3 class="">Dashboard</h3>
            <small>Claims analytics</small>
        </div>
        
        <div>
            <div class="claims-total-container">
                <div class="claims-total">
                    <small>Total Claims</small>
                    <h4>{{formatMoney(totalClaims)}} <span class="las la-arrow-right"></span></h4>
                </div>
            </div>
        </div>
        <div class="analytics">
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-clipboard-check text-danger"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.deleted)}}</h4>
                    <small>Deleted claims</small>
                </div>
            </div>
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-handshake text-success"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.paid)}}</h4>
                    <small>Paid claims</small>
                </div>
            </div>
            <div class="analytic text-center">
                <div class="analytic-icon">
                    <span class="las la-bullhorn text-primary"></span>
                </div>
                <div class="stats">
                    <h4>{{formatMoney(stats.open)}}</h4>
                    <small>Open claims</small>
                </div>
            </div>
        </div>
        <div class="account-card card mt-5">
            <div class="card-header">
                <h5 class="card-title">Claims by Status Per Month</h5>
            </div>
            <div class="card-body">
                <bar-chart v-if="Object.values(claimsChartSeries).length > 0" :height="400" :chart-data="BarChartMonths('Claims by Month', claimsChartSeries, ['#818CF8','#34D399', '#FCA5A5'], 'series')" :options="{ maintainAspectRatio: false}"></bar-chart>
            </div>
        </div>
        
        <div class="charts mt-5">
            <div class="bar-chart">
                <div class="account-card card">
                    <div class="card-header">
                        <h5 class="card-title">Claims by Months</h5>
                    </div>
                    <div class="card-body">
                        <bar-chart v-if="Object.values(claimsChartSingle).length > 0" :height="400" :chart-data="BarChartMonths('Claims by Month', claimsChartSingle, '#93C5FD', 'single')" :options="{ maintainAspectRatio: false}"></bar-chart>
                    </div>
                </div>
            </div>

            <div class="pie-chart">
                <div class="account-card card">
                    <div class="card-header">
                        <h5 class="card-title">Claims by Status</h5>
                    </div>
                    <div class="card-body">
                        <pie-chart v-if="stats.open" :height="400" :chart-data="PieChartStatus('Claims by Month', stats, ['#34D399', '#818CF8', '#FCA5A5'])" :options="{ maintainAspectRatio: false}"></pie-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Claim } from '@/interfaces/claim'
import { formatMoney } from '../../utils'

//charts
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'

@Component({
    components: {
        BarChart,
        PieChart
    }
})
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

    get claimsChartSingle() {
        return this.claims.reduce((accumulator, claim) => {
            const month = claim.dueDate.substr(0, 7)
            if (!accumulator[month]) accumulator[month] = 0
            accumulator[month] += (claim.fees / 100) //Divide currency by 100 to show actual value
            return accumulator
        }, {} as any)
    }

    get claimsChartSeries() {
        return this.claims.reduce((accumulator, claim) => {
            const month = claim.dueDate.substr(0, 7)
            if (!accumulator[month]) accumulator[month] = [0,0,0]
            
            switch(claim.status) {
                case "OPEN":
                    accumulator[month][0] += (claim.fees / 100) //Divide currency by 100 to show actual value
                    break;
                case "PAID":
                    accumulator[month][1] += (claim.fees / 100) //Divide currency by 100 to show actual value
                    break;
                case "DELETED":
                    accumulator[month][2] += (claim.fees / 100) //Divide currency by 100 to show actual value
                    break;
            }

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

    //Format currency
    formatMoney(amount: number): string {
        return formatMoney(amount)
    }
    
    //format data into chart canvas requirements
    BarChartMonths(label = '', dataset: any, color: any, type = '') {
        let formattedData = {}
        if(type === 'single') {
            formattedData = {
                labels: Object.keys(dataset),
                datasets: [{
                    label,
                    backgroundColor: color,
                    data: Object.values(dataset)
                },]
            }
        }else{
            const dataObj = {
                open: [] as Array<number>,
                paid: [] as Array<number>,
                deleted: [] as Array<number>
            }
            
            Object.keys(dataset).map((month: any) => {
                dataObj.open.push(dataset[month][0])
                dataObj.paid.push(dataset[month][1])
                dataObj.deleted.push(dataset[month][2])
            })
            
            formattedData = {
                labels: Object.keys(dataset),
                datasets: [{
                    label: 'OPEN',
                    backgroundColor: color[0],
                    data: dataObj.open
                },{
                    label: 'PAID',
                    backgroundColor: color[1],
                    data: dataObj.paid
                },{
                    label: 'DELETED',
                    backgroundColor: color[2],
                    data: dataObj.deleted
                },]
            }
        }

        return formattedData
    }

    //format data into chart canvas requirements
    PieChartStatus(label = '', dataset: object, color: any) {
        const formattedData = {
            labels: ['PAID', 'OPEN', 'DELETED'],
            datasets: [{
                label,
                backgroundColor: color,
                data: Object.values(this.stats)
            },]
        }

        return formattedData
    }
    
}

</script>