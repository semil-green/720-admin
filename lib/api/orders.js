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
        name: "Dipshankar Sur",
        Date: "2022-01-01",
        Channel: "Damgood fish magic checkout",
        paymentStatus: "Pending",

        fulfillmentStatus: "unfulfilled",
        tags: [
            {
                name: "8:00 AM - 11:00 AM"
            },
            {
                name: "card"
            },
            {
                name: "delhi delivery"
            },
            {
                name: "delivery"
            },
        ],
        deliveryMethod: "standard shipping",
        destination: "South West Delhi, DL"
    },
    {
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
        name: "Prarthita Sengupta",
        Date: "2022-01-02",
        Channel: "Evlop- mobile app",
        paymentStatus: "paid",

        fulfillmentStatus: "unfulfilled",
        tags: [
            {
                name: "8:00 AM - 11:00 AM"
            },
            {
                name: "card"
            },
            {
                name: "delhi delivery"
            },
            {
                name: "delivery"
            },
            {
                name: "Magic"
            },
        ],
        deliveryMethod: "local shipping",
        destination: "Gurugram, HR"
    },
]


export async function getOrders() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return orders
}
