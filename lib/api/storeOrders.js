let storeOrders = [
    {
        StoreOrderId: 1,
        StoreId: 2,
        ItemId: 1,
        Quantity: 10,
        Image: "/images/fish-image.png",
        IsActive: true
    }
]

export async function getStoreOrders() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return storeOrders
}

export async function getStoreOrder(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return storeOrders.find((u) => u.StoreOrderId === Number(id))
}

export async function addStoreOrder(storeOrder) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    storeOrder.StoreOrderId = Date.now()
    if (!storeOrder.Image) {
        storeOrder.Image = `https://picsum.photos/200?v=${storeOrder.StoreOrderId}`
    }
    storeOrders.push(storeOrder)
}

export async function updateStoreOrder(id, updatedCategory) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const index = storeOrders.findIndex((u) => u.StoreOrderId === Number(id))
    if (index !== -1) {
        storeOrders[index] = { ...updatedCategory, StoreOrderId: Number(id) }
    }
}

export async function deleteStoreOrder(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    storeOrders = storeOrders.filter((u) => u.StoreOrderId !== Number(id))
}
