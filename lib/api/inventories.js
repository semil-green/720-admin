let inventories = [
    {
        ItemId: 1,
        Title: "Rohu Fish",
        Image: "/images/fish-image.png",
        SKU: 'RH-FG-34',
        Locked: 1,
        InStock: 45,
        InHand: 44
    }, {
        ItemId: 2,
        Title: "New Delhi Fish",
        Image: "/images/fish-image.png",
        SKU: 'ND-FG-66',
        Locked: 0,
        InStock: 74,
        InHand: 74
    },
]

export async function getInventories() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return inventories
}
