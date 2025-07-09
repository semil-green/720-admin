let users = [
    {
        UserId: 1,
        FullName: "Alice Johnson",
        RoleId: 1,
        StoreId: 1,
        MobileNo: "9876543210",
        EmailId: "alice@example.com",
        Profile: "https://picsum.photos/200",
        IsActive: true,
    },
]

export const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Staff" },
]

export const stores = [
    { id: 1, name: "Mumbai Store" },
    { id: 2, name: "Delhi Store" },
]

export async function getUsers() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return users
}

export async function getUser(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return users.find((u) => u.UserId === Number(id))
}

export async function addUser(user) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    user.UserId = Date.now()
    if (!user.Profile) {
        user.Profile = `https://i.pravatar.cc/100?u=${user.EmailId}`
    }
    users.push(user)
}

export async function updateUser(id, updatedUser) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const index = users.findIndex((u) => u.UserId === Number(id))
    if (index !== -1) {
        users[index] = { ...updatedUser, UserId: Number(id) }
    }
}

export async function deleteUser(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    users = users.filter((u) => u.UserId !== Number(id))
}
