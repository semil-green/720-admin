let items = [
    {
        ItemId: 1,
        Title: "Rohu Fish",
        Image: "/images/fish-image.png",
        CategoryId: "1",
        Price: 499,
        ServePerson: "2-3 Person",
        Stock: '',
        SKU: "RF-KG-45",
        Pieces: "3 Pieces",
        Quantity: "6 in stock"
    },
    {
        ItemId: 2,
        Title: "Salmon Fillet",
        Image: "/images/fish-image.png",
        CategoryId: "2",
        Price: 799,
        ServePerson: "1-2 Person",
        Stock: '',
        SKU: "SF-KG-12",
        Pieces: "2 Pieces",
        Quantity: "3 in stock"
    },
    {
        ItemId: 3,
        Title: "Pomfret Whole",
        Image: "/images/fish-image.png",
        CategoryId: "3",
        Price: 999,
        ServePerson: "3-4 Person",
        Stock: '',
        SKU: "PF-KG-88",
        Pieces: "1 Piece",
        Quantity: "1 in stock"
    },
    {
        ItemId: 4,
        Title: "Tilapia Cleaned",
        Image: "/images/fish-image.png",
        CategoryId: "1",
        Price: 399,
        ServePerson: "2 Person",
        Stock: '',
        SKU: "TC-KG-67",
        Pieces: "4 Pieces",
        Quantity: "8 in stock"
    },
    {
        ItemId: 5,
        Title: "Catla Large",
        Image: "/images/fish-image.png",
        CategoryId: "2",
        Price: 599,
        ServePerson: "4 Person",
        Stock: '',
        SKU: "CL-KG-31",
        Pieces: "3 Pieces",
        Quantity: "3 in stock"
    },
    {
        ItemId: 6,
        Title: "Bangda Mackerel",
        Image: "/images/fish-image.png",
        CategoryId: "3",
        Price: 299,
        ServePerson: "1 Person",
        Stock: '',
        SKU: "BM-KG-22",
        Pieces: "6 Pieces",
        Quantity: "0 in stock"
    },
    {
        ItemId: 7,
        Title: "Hilsa Sliced",
        Image: "/images/fish-image.png",
        CategoryId: "2",
        Price: 1199,
        ServePerson: "3-4 Person",
        Stock: '',
        SKU: "HS-KG-78",
        Pieces: "2 Pieces",
        Quantity: "1 in stock"
    },
    {
        ItemId: 8,
        Title: "King Fish Steak",
        Image: "/images/fish-image.png",
        CategoryId: "1",
        Price: 899,
        ServePerson: "2 Person",
        Stock: '',
        SKU: "KF-KG-41",
        Pieces: "3 Pieces",
        Quantity: "4 in stock"
    },

];



export async function getItems() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) });

    return items
}
