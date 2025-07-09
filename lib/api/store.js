let stores = [
    {
        StoreId: 1,
        StoreName: "South Surat Branch",
        StoreCode: "SSB02",
        CityId: 1,
        StateId: 1,
        Address: "123 Street Name",
        Pincode: "560001",
        Latitude: "12.9716",
        Longitude: "77.5946",
        IsActive: true,
    },
]

export async function getStores() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return stores
}

export async function getStoreById(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return stores.find((store) => store.StoreId === parseInt(id))
}

export async function addStore(data) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const newStore = {
        ...data,
        StoreId: stores.length ? Math.max(...stores.map(s => s.StoreId)) + 1 : 1,
    }
    stores.push(newStore)
    return newStore
}

export async function updateStore(id, data) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const index = stores.findIndex((s) => s.StoreId === parseInt(id))
    if (index !== -1) stores[index] = { ...stores[index], ...data }
    return stores[index]
}

export async function deleteStore(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    stores = stores.filter((s) => s.StoreId !== parseInt(id))
}