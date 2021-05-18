import { Debtor } from './debtor'

export interface Account {
    id: string,
    debtor: Debtor
}