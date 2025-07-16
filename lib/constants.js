
export const StoreTypes = {
    PackagingCenter: 1,
    DarkStore: 2
}

export const Dashboard_Order_Interval = {
    Today: 1,
    ThisWeek: 2,
    ThisMonth: 3
}

export const Item_Unit = {
    Gram: 1,
    KG: 2,
    Piece: 3
}

export const Item_Unit_List = [
    { id: 1, name: 'Gram' },
    { id: 2, name: 'KG' },
    { id: 3, name: 'Piece' }
]

export const Nutritional_Types = {
    Nutrient: 1,
    Vitamin: 2,
    Mineral: 3
}

export const stores = [
    { value: 1, label: "Ahmedabad - Gujarat (Packaging Center)", type: StoreTypes.PackagingCenter },
    { value: 2, label: "Surat - Gujarat (Packaging Center)", type: StoreTypes.PackagingCenter },
    { value: 3, label: "Ghatlodiya - Ahmedabad(657485) (Dark Store)", type: StoreTypes.DarkStore },
    { value: 4, label: "Udhna - Surat(698754) (Dark Store)", type: StoreTypes.DarkStore },
    { value: 9, label: "Mumbai - Maharastra (Packaging Center)", type: StoreTypes.PackagingCenter },
    { value: 10, label: "Pune - Maharastra (Packaging Center)", type: StoreTypes.PackagingCenter },
    { value: 11, label: "Mumbai Central - Mumbai(957485) (Dark Store)", type: StoreTypes.DarkStore },
    { value: 12, label: "Chinchwad - Pune(998754) (Dark Store)", type: StoreTypes.DarkStore },
]
