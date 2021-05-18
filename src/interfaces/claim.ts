export interface Claim {
    id: string
    accountId: string,
    currency: string,
    baseAmount: number,
    fees: number,
    dueDate: string,
    status: string
}