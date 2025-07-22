"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getInventories } from "@/lib/api/inventories"
import InventoryTable from "@/components/inventories/InventoryTable"
import { Loader2 } from "lucide-react"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { stores, StoreTypes } from "@/lib/constants"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"

import { MultiSelect } from "@/components/shadcn/MultiSelect"
import { Label } from "@/components/ui/label"


export default function Inventory() {
    const [inventories, setInventories] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState("Item")
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [typeOfFinishedProduct, setTypeOfFinishedProduct] = useState([])

    const [selectedPackagingStores, setSelectedPackagingStores] = useState([]);
    const [selectedDarkStores, setSelectedDarkStores] = useState([]);


    const router = useRouter()

    useEffect(() => {
        getInventoryList();
    }, [])

    useEffect(() => {
        setSelectedCategories([]);
    }, [typeOfFinishedProduct, selectedItem]);

    const getInventoryList = async () => {
        setLoading(true)

        const items = await getInventories();
        setInventories(items)

        setLoading(false)
    }

    const storesData = stores?.filter((item) => item?.label.includes("Packaging Center"))

    return (
        <MainLayout>
            {loading &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }

            <Tabs defaultValue="Item">
                <TabsList>
                    <TabsTrigger value="Item" onClick={() => { setSelectedItem("Item") }}>Raw Material</TabsTrigger>
                    <TabsTrigger value="RawItem" onClick={() => { setSelectedItem("RawItem") }}>Finished Product</TabsTrigger>
                </TabsList>
            </Tabs>



            <div className="space-y-4 mt-4">

                {
                    selectedItem == "Item" && <div className="flex justify-between items-center gap-2">
                        <MultiSelect
                            options={storesData.map((item) => ({
                                label: item.label,
                                value: item.value.toString(),
                            }))}
                            onValueChange={setSelectedCategories}
                            defaultValue={selectedCategories}
                            placeholder="Select a packaging center"
                            variant="secondary"
                            animation={0}
                            modalPopover={true}
                            maxCount={3}
                        />


                        {/* <Input defaultValue="" placeholder='Search Items' className='' /> */}
                    </div>
                }

                {selectedItem === "RawItem" && (
                    <div className="flex mt-4 gap-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="storeType"
                                value="packagingCenter"
                                className="form-radio text-blue-600"
                                checked={typeOfFinishedProduct === "packagingCenter"}
                                onChange={(e) => setTypeOfFinishedProduct(e.target.value)}
                            />
                            <span>Packaging center</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="storeType"
                                value="darkStore"
                                className="form-radio text-blue-600"
                                checked={typeOfFinishedProduct === "darkStore"}
                                onChange={(e) => setTypeOfFinishedProduct(e.target.value)}
                            />
                            <span>Dark Store</span>
                        </label>
                    </div>
                )}


                {selectedItem === "RawItem" && typeOfFinishedProduct === "packagingCenter" && (
                    <MultiSelect
                        options={stores.map((item) => ({
                            label: item.label,
                            value: item.value.toString(),
                        }))}
                        onValueChange={setSelectedPackagingStores}
                        defaultValue={selectedPackagingStores}
                        placeholder={"Select Packaging store"}
                        variant="secondary"
                        animation={0}
                        modalPopover={true}
                        maxCount={3}
                    />
                )}
                {selectedItem === "RawItem" && typeOfFinishedProduct === "darkStore" && (
                    <MultiSelect
                        options={stores.map((item) => ({
                            label: item.label,
                            value: item.value.toString(),
                        }))}
                        onValueChange={setSelectedDarkStores}
                        defaultValue={selectedDarkStores}
                        placeholder={"Select Dark Store"}
                        variant="secondary"
                        animation={0}
                        modalPopover={true}
                        maxCount={3}
                    />
                )}

                <InventoryTable data={inventories} />
            </div>
        </MainLayout>
    )
}
