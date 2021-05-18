import { Address } from './address'

export interface Debtor {
    title: string,
    firstName: string,
    lastName: string,
    address: Address,
    mobilePhone: string,
    email: string
}