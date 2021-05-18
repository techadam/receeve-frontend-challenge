export const formatMoney = (amount: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    })

    return formatter.format(amount / 100)
}