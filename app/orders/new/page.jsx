"use client";
import MainLayout from "@/components/layout/mainLayout";
import React, { useState, useEffect } from "react";
import { Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { fetchCustomersDfService, getStoresAvailableForUser, getUserAddesssByIdService, searchProductForDraftOrderService } from "@/service/draft-orders/draft-orders.service";
import { toast } from "sonner";

const page = () => {
    const [searchUser, setSearchUser] = useState("");
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [userAddress, setUserAddress] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});

    const [storesByPincode, setStoresByPincode] = useState(null);
    const [loadingStore, setLoadingStore] = useState(false);
    const [selectedStore, setSelectedStore] = useState({});

    const [searchProduct, setSearchProduct] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchUser.trim() !== "") {
                setLoading(true);
                fetchCustomersDfService(searchUser)
                    .then((res) => {
                        setUsersData(res?.data || []);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setUsersData([]);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchUser]);

    useEffect(() => {
        if (!selectedUser) return;

        const fetchAddress = async () => {
            try {
                setLoadingAddress(true);
                const response = await getUserAddesssByIdService(selectedUser.customer_id);
                setUserAddress(response?.data || null);
            } catch (error) {
                toast.error("Error in fetching user address");
            } finally {
                setLoadingAddress(false);
            }
        };

        fetchAddress();
    }, [selectedUser]);

    useEffect(() => {
        if (!selectedUser) return;
        if (!selectedAddress) return;

        const fetchAvailableStore = async () => {
            try {
                setLoadingStore(true);
                const fetchData = await getStoresAvailableForUser(selectedAddress?.pincode)
                setStoresByPincode(fetchData?.data)
            }
            catch (err) {
                toast.error("Error in fetching available stores")
            }
            finally {
                setLoadingStore(false);
            }
        }

        fetchAvailableStore();
    }, [selectedAddress])


    useEffect(() => {
        if (!searchProduct) return;

        const timeout = setTimeout(async () => {
            try {
                const res = await searchProductForDraftOrderService(selectedStore?.id, searchProduct);
                setSearchResult(res?.data || []);
            } catch (err) {
                toast.error("Error in searching proucts ");
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchProduct, selectedStore?.id]);

    const handleAdditem = (item) => {
        if (!selectedItems.find((i) => i.product_id === item.product_id)) {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        }
    };

    return (
        <MainLayout>
            <div className="bg-sidebar">
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                        <Link href={"/orders"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        <h2 className="font-semibold text-xl">Create order</h2>
                    </div>
                </div>

                <div className="grid grid-cols-3 mt-6 gap-4">
                    <div className="col-span-2  bg-white ">
                        <div className="border shadow rounded-md px-4 py-4">
                            <div>
                                <h4 className="font-medium">User</h4>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    <div className="col-span-4 relative">
                                        <Input
                                            defaultValue=""
                                            placeholder="Search User"
                                            value={searchUser}
                                            onChange={(e) => setSearchUser(e.target.value)}
                                        />

                                        {searchUser && (
                                            <div className="absolute top-full left-0 mt-1 w-full max-h-64 overflow-y-auto bg-white rounded-md shadow-lg z-20">
                                                {loading ? (
                                                    <div className="p-3 text-sm text-gray-500 text-center">
                                                        Searching...
                                                    </div>
                                                ) : usersData.length > 0 ? (
                                                    usersData.map((user, index) => (
                                                        <div
                                                            key={user.customer_id}
                                                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                                        >
                                                            <span className="text-sm text-gray-700 font-medium w-4 text-right">
                                                                {index + 1}.
                                                            </span>

                                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                                                {user.customer_name?.[0] || "?"}
                                                            </div>

                                                            <div className="flex flex-col">
                                                                <span className="text-sm text-gray-900 font-medium">
                                                                    {user.customer_name}
                                                                </span>
                                                                <span className="text-xs text-gray-600">
                                                                    {user.mobile_no}
                                                                </span>
                                                            </div>

                                                            <Button
                                                                type="button"
                                                                className="ml-auto cursor-pointer"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedUser(user);
                                                                    setSearchUser("");
                                                                    setUsersData([]);
                                                                    toast.success("User added successfully");
                                                                }}
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-3 text-sm text-gray-500 text-center">
                                                        No records found
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {selectedUser && (
                                            <div className="mt-2 p-3 border rounded-md bg-gray-50 flex items-center gap-3 relative">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                                    {selectedUser.customer_name?.[0] || "?"}
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-900 font-medium">
                                                        {selectedUser.customer_name}
                                                    </span>
                                                    <span className="text-xs text-gray-600">
                                                        {selectedUser.mobile_no}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => { setSelectedUser(null); toast.success("User removed successfully"); setUserAddress(null); setSelectedAddress(null); setStoresByPincode(null) }}
                                                    className="ml-auto text-gray-900 hover:text-red-500 transition"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 bg-white">
                        <div className="border shadow rounded-md px-4 py-4">
                            <h4 className="font-medium">User Address</h4>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                <div className="col-span-4">
                                    {loadingAddress ? (
                                        <div className="p-3 text-sm text-gray-500">Loading addresses...</div>
                                    ) : userAddress && userAddress.length > 0 ? (
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={selectedAddress?.address_id || ""}
                                            onChange={(e) => {
                                                const selected = userAddress.find(addr => addr.address_id === Number(e.target.value));
                                                setSelectedAddress(selected);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Address
                                            </option>
                                            {userAddress.map((addr) => (
                                                <option key={addr.address_id} value={addr.address_id}>
                                                    {addr.address}
                                                </option>
                                            ))}
                                        </select>

                                    ) : (
                                        <div className="p-3 text-sm text-gray-500">
                                            {selectedUser ? "No addresses found for this user" : "Select a user first"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 bg-white">
                        <div className="border shadow rounded-md px-4 py-4">
                            <h4 className="font-medium">Stores</h4>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                <div className="col-span-4">
                                    {loadingStore ? (
                                        <div className="p-3 text-sm text-gray-500">Loading stores...</div>
                                    ) : storesByPincode && storesByPincode.length > 0 ? (
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={selectedStore?.id || ""}
                                            onChange={(e) => {
                                                const selected = storesByPincode.find(
                                                    (store) => store.id === Number(e.target.value)
                                                );
                                                setSelectedStore(selected);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Store
                                            </option>
                                            {storesByPincode.map((store) => (
                                                <option key={store.id} value={store.id}>
                                                    {store.store_name} (₹{store.delivery_charge})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="p-3 text-sm text-gray-500">
                                            {selectedAddress ? "Select an address first" : "No stores available for this pincode"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-2  bg-white ">
                        <div className="border shadow rounded-md px-4 py-4">
                            <div>
                                <h4 className="font-medium">Products</h4>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    <div className="col-span-4">
                                        <div className="flex gap-4">

                                            <Input
                                                defaultValue=""
                                                placeholder="Search Products"
                                                className=""
                                                value={searchProduct}
                                                onChange={(e) => setSearchProduct(e.target.value)}
                                            />

                                            <Button onClick={() => { setSearchProduct(""); setSearchResult([]) }}>clean</Button>
                                        </div>

                                        {searchResult.length > 0 && (
                                            <div className="border rounded-md mt-2 bg-white shadow-md max-h-64 overflow-y-auto">
                                                {searchResult.map((item) => (
                                                    <div
                                                        key={item.product_id}
                                                        className="flex items-center justify-between p-2 hover:bg-gray-50"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Image
                                                                src={item.thumbnail_image}
                                                                alt={item.title}
                                                                width={50}
                                                                height={40}
                                                                className="rounded-md"
                                                            />
                                                            <span className="text-sm">{item.title}</span>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => { handleAdditem(item); setSearchResult([]); }}
                                                        >
                                                            Add
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 mt-4">
                                <div className="col-span-2 font-semibold">Product</div>
                                <div className="col-span-1 font-semibold px-2">Quantity</div>
                                <div className="col-span-1 font-semibold px-2"> Total</div>
                            </div>

                            <div className="mt-4 space-y-2">
                                {selectedItems.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="grid grid-cols-4 items-center gap-2 border p-2 rounded-md"
                                    >
                                        <div className="col-span-2 font-semibold flex gap-2 items-center">
                                            <Image
                                                src={item.thumbnail_image}
                                                height={40}
                                                width={50}
                                                alt={item.title}
                                                className="rounded-md"
                                            />
                                            <p className="text-sm">{item.title}</p>
                                        </div>
                                        <div className="col-span-1 font-semibold px-2">
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    setSelectedItems((prev) =>
                                                        prev.map((i) =>
                                                            i.product_id === item.product_id
                                                                ? { ...i, quantity: Number(e.target.value) }
                                                                : i
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-span-1 font-semibold px-2">
                                            ₹ {Number(item.price) * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="mt-4 border shadow rounded-md px-4 py-4">
                            <h4 className="font-medium">Products</h4>

                            <div className="grid grid-cols-3 px-4 py-2 border rounded-md gap-2 mt-2">
                                <div className="col-span-1">Subtotal</div>
                                <div className="col-span-1">1 item</div>
                                <div className="col-span-1">₹ 750.00</div>

                                <div className="col-span-1">Add Discount</div>
                                <div className="col-span-1">-</div>
                                <div className="col-span-1">-</div>

                                <div className="col-span-1">Add Shipping or Delivery</div>
                                <div className="col-span-1">-</div>
                                <div className="col-span-1">₹ 0.00</div>

                                <div className="col-span-1">Estimated Tax</div>
                                <div className="col-span-1">SGST + CGST 12% (included)</div>
                                <div className="col-span-1">₹ 80.36</div>

                                <div className="col-span-1">Total</div>
                                <div className="col-span-1"></div>
                                <div className="col-span-1">₹ 750.00</div>
                            </div>
                        </div>

                        <div className="border shadow rounded-md px-4 py-4 mt-4">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    name="example"
                                    value="2"
                                    className="form-radio text-blue-600"
                                />
                                <span className="font-semibold">Payment due later</span>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    className="cursor-pointer  border shadow  "
                                    variant={"secondary"}
                                >
                                    Send Invoice
                                </Button>
                                <Button
                                    className="cursor-pointer  border shadow  "
                                    variant={"default"}
                                >
                                    Mark as Paid
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* right side content */}
                    <div className="col-span-1 bg-white">
                        <div className="border shadow rounded-md px-4 py-4 ">
                            <span className="font-semibold"> Notes </span>
                            <p className="mt-4">No Notes</p>
                        </div>

                        <div className="border shadow rounded-md px-4 py-4 mt-4 ">
                            <span className="font-semibold"> Customer </span>
                            <Input
                                defaultValue=""
                                placeholder="Search or create a customer"
                                className="mt-2"
                            />
                        </div>

                        <div className="border shadow rounded-md px-4 py-4 mt-4 ">
                            <span className="font-semibold"> Market </span>
                            <p className="mt-4">Pricing</p>
                            <p className="mt-4">India (INR ₹) </p>
                        </div>

                        <div className="border shadow rounded-md px-4 py-4 mt-4 ">
                            <span className="font-semibold"> Tags </span>
                            <Input defaultValue="" placeholder="" className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default page;
