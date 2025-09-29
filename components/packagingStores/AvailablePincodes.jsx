import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector, useDispatch } from "react-redux"
import { addNewPincodeService, deletePincodeService, updatePincodeService } from "@/service/pincode/pincode.service"
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { addPincodeToPackagingCenter, deletePincodeFromPackagingCenter, updatePincodeInPackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice"
import { toast } from "sonner";
export default function AvailablePincodes({ initialData = {}, onSubmit, editId }) {
    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [deliveryCharge, setDeliveryCharge] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [pincodeId, setPincodeId] = useState('')
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedPincodeId, setSelectedPincodeId] = useState(null);


    const router = useRouter()
    const dispatch = useDispatch()

    const allPackagingCenters = useSelector((state) => state.packagingStoreSlice.packagingCenters);

    const filterPackagingCentersById = allPackagingCenters?.filter((item) => item.id == editId)

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!pincode.trim() || !deliveryCharge.trim()) {
            toast.error("Missing Fields", { description: "Please enter both Pincode and Delivery Charge" });
            return;
        }

        const data = {
            packaging_store_dark_store_id: editId,
            pincode,
            delivery_charge: deliveryCharge
        }

        const res = await addNewPincodeService(data)

        if (res?.status === 200) {
            dispatch(addPincodeToPackagingCenter({
                storeId: editId,
                pincodeData: res.data
            }));

            setPincode('');
            setDeliveryCharge('');
            toast.success("Added", { description: "Pincode added successfully" });
        }
        else if (res?.status == 409) {
            toast.error("Pincode already exists");
        }
        else {
            toast.error("Failed to add pincode");
        }
    }

    const handleEdit = (item) => {
        setPincode(item.pincode?.toString() || '');
        setDeliveryCharge(item.delivery_charge?.toString() || '');
        setIsEdit(true)
        setPincodeId(item.id);
    };

    const handleUpdatePinCode = async (e) => {
        e.preventDefault();

        if (!pincode.trim() || !deliveryCharge.trim()) {
            toast.error("Missing Fields", { description: "Please enter both Pincode and Delivery Charge" });
            return;
        }
        const data = {
            packaging_store_dark_store_id: editId,
            pincode,
            delivery_charge: deliveryCharge
        }

        const res = await updatePincodeService(pincodeId, data)

        if (res?.status === 200) {
            dispatch(updatePincodeInPackagingCenter({
                storeId: editId,
                updatedPincode: res.data
            }));
            setIsEdit(false);
            setPincode('');
            setDeliveryCharge('');
            setPincodeId('');

            toast.success("Updated", { description: "Pincode updated successfully" });
        }
        else {
            toast.error("Failed to update pincode");
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();

        try {
            const res = await deletePincodeService(id);

            if (res?.status === 200) {
                dispatch(deletePincodeFromPackagingCenter({ storeId: editId, pincodeId: id }));
                toast.success("Deleted", { description: "Pincode deleted successfully" });
            }
            else {
                toast.error("Failed to delete pincode");
            }
        } catch (err) {
            console.error("Delete failed");
        }
    };


    return (
        <div className="flex flex-col gap-2 min-w-[280px]">
            <form className="">
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="pincode" className="sr-only">Pincode</Label>
                    <Input name="pincode" className='' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' />
                    <Input name="delivery_charge" className='mt-2' value={deliveryCharge} onChange={(e) => setDeliveryCharge(e.target.value)} placeholder='Delivery Charge' />



                    {
                        !isNaN(Number(editId)) && (
                            <>
                                {isEdit ? (
                                    <div className="flex gap-2">

                                        <Button type="submit" className="cursor-pointer mt-2" onClick={handleUpdatePinCode}>
                                            Update
                                        </Button>
                                        <Button type="submit" className="cursor-pointer mt-2" variant={"outline"} onClick={() => { setIsEdit(false), setDeliveryCharge(""), setPincode("") }}>
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button type="submit" className="cursor-pointer mt-2" onClick={handleSubmit}>
                                        Add
                                    </Button>
                                )}
                            </>
                        )
                    }

                </div>
            </form>
            <table className="min-w-full table-auto border border-gray-300 rounded-md mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border-b text-center">Pincode</th>
                        <th className="p-2 border-b text-center">Delivery Charge</th>
                        <th className="p-2 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {filterPackagingCentersById?.length > 0 &&
                        filterPackagingCentersById.map((store) =>
                            store?.pincodes?.map((pincodeItem) => (
                                <tr key={pincodeItem.id} className="hover:bg-gray-50">
                                    <td className="p-2 border-b text-center">
                                        <div className="inline-flex items-center gap-1 px-3 py-1 h-6 bg-white text-accent">
                                            {pincodeItem?.pincode}
                                        </div>
                                    </td>

                                    <td className="p-2 border-b border-l border-gray-300 text-center">
                                        ₹{pincodeItem?.delivery_charge}
                                    </td>

                                    <td className="p-2 border-b border-l border-gray-300 text-center flex justify-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="link"
                                            onClick={() => handleEdit(pincodeItem)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="link"
                                            onClick={() => {
                                                setSelectedPincodeId(pincodeItem.id);
                                                setOpenAlert(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}

                    {(!Array.isArray(filterPackagingCentersById) || !filterPackagingCentersById[0]?.pincodes?.length) && (
                        <tr>
                            <td className="p-2 border-b text-center" colSpan={3}>No Pincodes Found</td>
                        </tr>
                    )}

                </tbody>

            </table>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Pincode?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this pincode? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                handleDelete(e, selectedPincodeId);
                                setOpenAlert(false);
                            }}
                        >
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}
