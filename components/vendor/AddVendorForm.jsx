"use client";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";
import { toast } from "sonner"
import { addNewVendorService, updateVendorService } from "@/service/vendor-master/vendor-master.service";
import { useSelector } from "react-redux";
import { setAllVendorsData, setVendors, addNewVendorsData } from "@/store/slices/vendor-master/vendor-master.slice";
import { useDispatch } from "react-redux";

export default function VendorForm({ editId }) {
    const router = useRouter()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [attachment, setAttachment] = useState(null);

    const [formData, setFormData] = useState({
        vendor_name: "",
        gst: "",
        address: "",
        contact_number: "",
        account_name: "",
        account_number: "",
        ifsc_code: "",
        branch_name: "",
        gpay_number: "",
        upi_id: "",
        payment_mode: "",
    })
    const [images, setImages] = useState([])

    const allVendorsData = useSelector((state) => state.vendorMasterSlice.allVendors)

    useEffect(() => {
        if (editId && allVendorsData?.data?.length) {
            const vendor = allVendorsData.data.find((item) => item.id === editId);

            if (vendor) {
                setFormData({
                    vendor_name: vendor.vendor_name || "",
                    gst: vendor.gst || "",
                    address: vendor.address || "",
                    contact_number: vendor.contact_number || "",
                    account_name: vendor.account_name || "",
                    account_number: vendor.account_number || "",
                    ifsc_code: vendor.ifsc_code || "",
                    branch_name: vendor.branch_name || "",
                    gpay_number: vendor.gpay_number || "",
                    upi_id: vendor.upi_id || "",
                    payment_mode: vendor.payment_mode || "",
                });

                if (vendor.attachment) {
                    setImages([vendor.attachment]);
                    const fileName = vendor.attachment.split("/").pop();
                    setAttachment(fileName);
                }
            }
        }
    }, [editId, allVendorsData]);


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleItemImageChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages([imageUrl]);
            setAttachment(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (!formData.vendor_name) {
            toast.error("Vendor Name is required");
            hasError = true;
        }

        if (!formData.contact_number) {
            toast.error("Contact Number is required");
            hasError = true;
        }

        if (!formData.gst) {
            toast.error("GST is required");
            hasError = true;
        }

        if (hasError) return;
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            if (attachment) {
                formDataToSend.append("attachment", attachment);
            }

            const res = await addNewVendorService(formDataToSend);

            if (res?.status == 200 || res?.status == 201) {
                dispatch(addNewVendorsData(res?.data))
                toast.success("Vendor added successfully");
                setFormData({
                    vendor_name: "",
                    gst: "",
                    address: "",
                    contact_number: "",
                    account_name: "",
                    account_number: "",
                    ifsc_code: "",
                    branch_name: "",
                    gpay_number: "",
                    upi_id: "",
                    payment_mode: "",
                });
                router.push("/vendors");
                setAttachment(null);
                setImages([]);
            } else
                toast.error(res?.response?.data?.message || "Failed to add vendor");
        } catch (error) {
            toast.error("Failed to add vendor");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (!formData.vendor_name) {
            toast.error("Vendor Name is required");
            hasError = true;
        }

        if (!formData.contact_number) {
            toast.error("Contact Number is required");
            hasError = true;
        }

        if (!formData.gst) {
            toast.error("GST is required");
            hasError = true;
        }

        if (hasError) return;
        setLoading(true);

        try {
            let res;
            if (attachment instanceof File) {
                const formDataToSend = new FormData();
                for (const key in formData) {
                    formDataToSend.append(key, formData[key]);
                }
                formDataToSend.append("attachment", attachment);

                res = await updateVendorService(editId, formDataToSend);
            } else {

                const payload = {
                    ...formData,
                    attachment: attachment,
                };
                res = await updateVendorService(editId, payload);
            }

            if (res?.status === 200) {
                toast.success("Vendor updated successfully");
                router.push("/vendors");
            } else {
                toast.error(res?.response?.data?.message || "Failed to update vendor");
            }
        } catch (error) {
            toast.error("Error updating vendor");
        } finally {
            setLoading(false);
        }
    };

    const unitOptions = [
        { label: "Cash", value: "cash" },
        { label: "UPI", value: "upi" },
        { label: "Bank Transfer", value: "banktransfer" },
    ];

    return (
        <form className="grid gap-4">
            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Name <span className="text-red-500">*</span>
                    </Label>
                    <Input name="vendor_name" value={formData.vendor_name} onChange={handleChange} placeholder='Vendor Name' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>GST <span className="text-red-500">*</span>
                    </Label>
                    <Input name="gst" value={formData.gst} onChange={handleChange} placeholder='GST Number' type='text' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Address</Label>
                    <Textarea name="address" placeholder="Vendor Address" className='min-h-[110px]' value={formData.address} onChange={handleChange} required />
                </div>
            </div>

            <div className="flex gap-3 max-w-[50%]">
                <div className="flex-1">
                    <Label className='pb-1'>Contact Details <span className="text-red-500">*</span>
                    </Label>
                    <Input name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder='Enter Contact number' type="number" required />
                </div>
            </div>

            <h4 className=" font-semibold mt-4">Bank Details</h4>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Account Name</Label>
                    <Input name="account_name" value={formData.account_name} onChange={handleChange} placeholder='Vendor account name' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Account number</Label>
                    <Input name="account_number" value={formData.account_number} onChange={handleChange} placeholder='Vendor account number' type='text' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>IFSC Code</Label>
                    <Input name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} placeholder='Vendor IFSC Code' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Branch name</Label>
                    <Input name="branch_name" value={formData.branch_name} onChange={handleChange} placeholder='enter branch name' type='text' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Gpay Number</Label>
                    <Input name="gpay_number" value={formData.gpay_number} onChange={handleChange} placeholder='Vendor Gpay number' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Upi id</Label>
                    <Input name="upi_id" value={formData.upi_id} onChange={handleChange} placeholder='enter upi id' type='text' required />
                </div>
            </div>

            <div className="flex-1 max-w-[50%] rounded-lg">
                <Label className="pb-1">Mode of Payment</Label>
                <select
                    name="payment_mode"
                    value={formData.payment_mode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    required
                >
                    <option value="">Select a payment mode</option>
                    {unitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Attachment</Label>
                    <Input name="attachment" onChange={handleItemImageChange} placeholder='Vendor attachment' type='file' />
                </div>
                {images.length > 0 && (
                    <div className="mt-2">
                        <img src={images[0]} alt="Preview" className="w-32 h-32 object-cover rounded-md border" />
                    </div>
                )}

                <div className="flex-1"></div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
                <Link href="/vendors">
                    <Button type="button" variant="outline">Back to list</Button>
                </Link>

                {
                    editId ? <Button type="submit" onClick={handleUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button> : <Button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                }
            </div>
        </form>
    )
}