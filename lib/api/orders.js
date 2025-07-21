let orders = [
    {
        Items: [{
            ItemId: 1,
            Title: "Rohu Fish",
            Image: "/images/fish-image.png",
            SKU: 'RF-KG-45',
            Price: 499,
            Nut: 2
        },
        {
            ItemId: 2,
            Title: "Fresh Water Fish",
            Image: "/images/fish-image.png",
            SKU: 'RF-KG-23',
            Price: 350,
            Nut: 1
        }],
        TotalPrice: 1348,
        PaymentStatus: 1,
        OrderStatus: 0,
        orderId: 1,
        name: "Dipshankar Sur"
    }, {
        Items: [{
            ItemId: 3,
            Title: "Rohu Fish",
            Image: "/images/fish-image.png",
            SKU: 'RF-KG-45',
            Price: 499,
            Nut: 1
        }],
        TotalPrice: 499,
        PaymentStatus: 1,
        OrderStatus: 2,
        orderId: 2,
        name: "Prarthita Sengupta"
    },
]


export async function getOrders() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return orders
}
