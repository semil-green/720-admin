"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItems } from "@/lib/api/items";
import ItemTable from "@/components/items/ItemTable";
import RawItemTable from "@/components/items/RawItemTable";
import RawItemForm from "@/components/items/RawItemForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FilterDropdown from "@/components/items/FilterDropDown";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, getAllItems } from "@/store/slices/items/items.slice";
import { deleteItemService, getAllItemsService } from "@/service/items/items.service";

export default function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rawItem, setRawItem] = useState({});
    const [isRawItemModalOpen, setIsRawItemModalOpen] = useState(false);
    const [sortState, setSortState] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const router = useRouter();
    const dispatch = useDispatch();
    const allItemsData = useSelector((state) => state.allItemsSlice?.allItems ?? []);

    const fetchItems = async () => {
        try {
            const res = await getAllItemsService(page, limit);
            if (res && res.data) {
                dispatch(getAllItems(res.data.data || []));
                setTotalItems(res.data.total ?? 0);
            } else {
                dispatch(getAllItems([]));
                setTotalItems(0);
            }
        } catch (err) {
            toast.error("Failed to fetch product list");
            dispatch(getAllItems([]));
            setTotalItems(0);
        }
    };

    const getItemsList = async () => {
        try {
            const res = await getItems();
            const arr = res?.data?.data ?? res?.data ?? res ?? [];
            setItems(Array.isArray(arr) ? arr : []);
        } catch (err) {
            toast.error("Failed to fetch raw items");
            setItems([]);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([fetchItems(), getItemsList()]);
            setLoading(false);
        };
        load();
    }, [page, limit, sortState]);

    const openAddRawItem = () => {
        setRawItem({});
        setIsRawItemModalOpen(true);
    };

    const handleSubmit = async (data) => {
        setIsRawItemModalOpen(false);
        setLoading(true);
        await Promise.all([getItemsList(), fetchItems()]);
        setLoading(false);
        toast.success("Created", { description: "Raw Item created successfully" });
    };

    const handleDelete = async (itemId) => {


        const res = await deleteItemService(itemId)

        if (res?.status == 200 || res?.status == 200) {

            dispatch(deleteItem(itemId))
            toast.success("Deleted", { description: "Raw Item deleted successfully" });
        }
    };

    const handleSortChange = (sort) => {
        setSortState([sort]);
    };

    return (
        <MainLayout>
            {loading && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/60">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            )}

            <Tabs defaultValue="Item">
                <TabsList>
                    <TabsTrigger value="Item">Product</TabsTrigger>
                    <TabsTrigger value="RawItem" onClick={() => getItemsList()}>
                        Raw Item
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="Item">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <div />
                            <div className="flex gap-4">
                                <Button variant="secondary">Export</Button>
                                <Button onClick={() => router.push("/items/new")}>Add Product</Button>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Input placeholder="Search Items" className="w-2xl" />
                            <div className="flex justify-end">
                                <FilterDropdown onSortChange={handleSortChange} />
                            </div>
                        </div>

                        <ItemTable
                            data={allItemsData}
                            onDelete={handleDelete}
                            sortState={sortState}
                            page={page}
                            limit={limit}
                            setPage={setPage}
                            totalItems={totalItems}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="RawItem">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <Input defaultValue="" placeholder="Search Raw Items" className="max-w-2/4" />
                            <Button onClick={() => openAddRawItem()}>Add Raw Item</Button>
                        </div>
                        <RawItemTable data={items} onDelete={handleDelete} />
                    </div>
                </TabsContent>
            </Tabs>

            <Dialog open={isRawItemModalOpen} onOpenChange={(open) => setIsRawItemModalOpen(open)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Raw Item</DialogTitle>
                        <DialogDescription>Add/Update Raw Item from here.</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <RawItemForm initialData={rawItem} onSubmit={handleSubmit} handleClose={() => setIsRawItemModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
