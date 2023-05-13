export type Order = {
    id : number,
    clientId : number,
    orderCost : number,
    status : number,
    items : [
        {
            productId : number,
            amount : number,
            discountPercent : number,
            totalCost : number
        }
    ]
}