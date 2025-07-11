let orders = [
    {
        Items: [{
            ItemId: 1,
            Title: "Rohu Fish",
            Image: "https://picsum.photos/200",
            SKU: 'RF-KG-45',
            Price: 499,
            Nut: 2
        },
        {
            ItemId: 2,
            Title: "Fresh Water Fish",
            Image: "https://picsum.photos/200",
            SKU: 'RF-KG-23',
            Price: 350,
            Nut: 1
        }],
        TotalPrice: 1348,
        PaymentStatus: 1,
        OrderStatus: 0
    }, {
        Items: [{
            ItemId: 3,
            Title: "Rohu Fish",
            Image: "https://picsum.photos/200",
            SKU: 'RF-KG-45',
            Price: 499,
            Nut: 1
        }],
        TotalPrice: 499,
        PaymentStatus: 1,
        OrderStatus: 2
    },
]


export async function getOrders() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return orders
}
