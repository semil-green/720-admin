let walletConfigurations = [
    {
        WalletConfigurationId: 1,
        MaxPointPerOrder: "20",
        PerPointPrice: "10",
        IsActive: true
    }
]

export async function getWalletConfigurations() {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return walletConfigurations
}

export async function getWalletConfiguration(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    return walletConfigurations.find((u) => u.WalletConfigurationId === Number(id))
}

export async function addWalletConfiguration(walletConfiguration) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    walletConfiguration.WalletConfigurationId = Date.now()
    walletConfigurations.push(walletConfiguration)
}

export async function updateWalletConfiguration(id, updatedWalletConfiguration) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    const index = walletConfigurations.findIndex((u) => u.WalletConfigurationId === Number(id))
    if (index !== -1) {
        walletConfigurations[index] = { ...updatedWalletConfiguration, WalletConfigurationId: Number(id) }
    }
}

export async function deleteWalletConfiguration(id) {
    await new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000) });

    walletConfigurations = walletConfigurations.filter((u) => u.WalletConfigurationId !== Number(id))
}
