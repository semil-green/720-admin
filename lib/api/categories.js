let categories = [
    {
        CategoryId: 1,
        Category: "Fresh Water",
        Image: "https://picsum.photos/200",
        ParentCategoryId: 0,
        IsActive: true
    }
]

export async function getCategories() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return categories
}

export async function getCategory(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return categories.find((u) => u.CategoryId === Number(id))
}

export async function addCategory(category) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    category.CategoryId = Date.now()
    if (!category.Image) {
        category.Image = `https://i.pravatar.cc/100?u=${category.CategoryId}`
    }
    categories.push(category)
}

export async function updateCategory(id, updatedCategory) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const index = categories.findIndex((u) => u.CategoryId === Number(id))
    if (index !== -1) {
        categories[index] = { ...updatedCategory, CategoryId: Number(id) }
    }
}

export async function deleteCategory(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    categories = categories.filter((u) => u.CategoryId !== Number(id))
}
