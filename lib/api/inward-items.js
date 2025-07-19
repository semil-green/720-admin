let items = [
    {
        ItemId: 1,
        Title: "Rohu Fish",
        Image: "/images/fish-image.png",
        CategoryId: "1",
        Price: 499,
        ServePerson: "2-3 Person",
        Stock: '',
        SKU: 'RF-KG-45'
    },
]


export async function getItems() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return items
}
