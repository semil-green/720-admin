let items = [
    {
        ItemId: 1,
        Title: "Rohu Fish",
        Image: "/images/fish-image.png",
        CategoryId: "1",
        Price: 499,
        ServePerson: "2-3 Person",
        Stock: '',
        SKU: 'RF-KG-45',
        date: "2022-01-01",
        time: "12:00:00",
        batch: 'B1',
        vendor: "Aakash Patel"
    },
]


export async function getItems() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return items
}
