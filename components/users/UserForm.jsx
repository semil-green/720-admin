"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { MultiSelect } from "@/components/shadcn/MultiSelect";
import { stores } from "@/lib/constants";
import { getAllRoles } from "@/service/role-master/role-master.service";
import { useDispatch } from "react-redux";
import { setRoles } from "@/store/slices/role-slice/role.slice";
import { useSelector } from "react-redux";
import { addNewUserService, updateUserService } from "@/service/user/user.service";
import { addUser, updatedUserData } from "@/store/slices/user-slice/user.slice";
import { toast } from "sonner";
import { allDarkStorePackagingCenter } from "@/store/slices/picode-wise-slot/picode-wise-slot.service";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";

export default function UserForm({ initialData = {}, onSubmit, userEditId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10000);

    const roles = useSelector((state) => state.roleMasterSlice.value);
    const editData = useSelector((state) => state.userSlice.editUserData);

    const alPackagingCenterDarkStore = useSelector(
        (state) => state.pincodeWiseSlotSlice.allDarkStorePackagingCenter
    );

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        role: "",
        StoreId: [],
        full_name: "",
        contact_number: "",
        email: "",
        profile_image: "",
        profile_image_preview: ""
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await getAllRoles();
                dispatch(setRoles(res.data));
            } catch (err) {
                toast.error("Failed to fetch roles");
            }
        };

        fetchRoles();
    }, [dispatch]);

    useEffect(() => {
        const fetchDarkStores = async () => {
            try {
                setLoading(true);
                const result = await getAllDarkStorePackagingCenter({
                    page,
                    limit,
                });

                const list = result?.data?.data || [];

                if (result?.status === 200) {
                    dispatch(allDarkStorePackagingCenter(list));
                } else {
                    toast.error("Error fetching dark stores", {
                        description: result?.data?.message || "Something went wrong",
                    });
                }
            } catch (error) {
                toast.error("Error fetching dark stores & packaging center");
            } finally {
                setLoading(false);
            }
        };

        fetchDarkStores();
    }, [page, dispatch]);

    useEffect(() => {
        if (userEditId && editData && roles.length > 0 && alPackagingCenterDarkStore.length > 0) {
            const storeIdsAsStrings = editData.store_ids ?
                editData.store_ids.map(id => id.toString()) : [];

            setFormData({
                full_name: editData.full_name || "",
                contact_number: editData.contact_number || "",
                email: editData.email || "",
                role: editData.role?.toString() || "",
                StoreId: storeIdsAsStrings,
                profile_image: editData.profile_image || "",
                profile_image_preview: editData.profile_image || "",
            });
        } else if (!userEditId) {
            setFormData({
                full_name: "",
                contact_number: "",
                email: "",
                role: "",
                StoreId: [],
                profile_image: "",
                profile_image_preview: ""
            });
        }
    }, [editData, userEditId, roles, alPackagingCenterDarkStore]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                profile_image: file,
                profile_image_preview: imageUrl
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            if (!formData.full_name) {
                toast.error("Full name is required");
                return;
            }

            if (!formData.contact_number) {
                toast.error("Contact number is required");
                return;
            }

            if (!formData.email) {
                toast.error("Email is required");
                return;
            }

            const formDataToSend = new FormData();

            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("contact_number", formData.contact_number);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("role", formData.role);


            formData.StoreId.forEach((storeId) => {
                formDataToSend.append("StoreId", storeId);
            });

            if (formData.profile_image) {
                formDataToSend.append("profile_image", formData.profile_image);
            }


            const newUser = await addNewUserService(formDataToSend);

            if (newUser?.status === 200) {
                toast.success("Created", {
                    description: "User created successfully",
                })
                router.push("/users");
            } else
                toast.error("Failed to add user", {
                    description: newUser?.response?.data?.message || "Failed to add user",
                }, { autoClose: 6000 });
        } catch (error) {
            toast.error("User creation failed", {
                description: error?.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (!formData.full_name) {
                toast.error("Full name is required");
                return;
            }

            if (!formData.contact_number) {
                toast.error("Contact number is required");
                return;
            }

            if (!formData.email) {
                toast.error("Email is required");
                return;
            }

            setLoading(true);
            const formDataToSend = new FormData();

            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("contact_number", formData.contact_number);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("role", formData.role);

            formData.StoreId.forEach((storeId) => {
                formDataToSend.append("StoreId", storeId);
            });

            if (formData.profile_image instanceof File) {
                formDataToSend.append("profile_image", formData.profile_image);
            } else if (typeof formData.profile_image === "string" && formData.profile_image !== "") {
                const fileName = formData.profile_image.split("/").pop();
                formDataToSend.append("profile_image", fileName);
            }

            const response = await updateUserService(userEditId, formDataToSend);

            if (response?.status === 200) {
                toast.success("Updated", {
                    description: "User updated successfully",
                });
                router.push("/users");
            }
        } catch (error) {
            toast.error("Update failed", {
                description: error?.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <form className="grid gap-4">
            <div>
                <Label className="pb-1">Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Mobile No <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Email <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Select Role</Label>
                <Select
                    value={formData.role}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, role: value }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-1">Select Stores</Label>
                <MultiSelect
                    options={alPackagingCenterDarkStore.map(store => ({
                        label: store.store_name,
                        value: store.id.toString(),
                    }))}
                    onValueChange={(values) => {
                        setFormData(prev => ({
                            ...prev,
                            StoreId: values,
                        }));
                    }}
                    defaultValue={formData.StoreId}
                    placeholder="Select Stores"
                    variant="secondary"
                    animation={0}
                    modalPopover={true}
                    maxCount={3}
                />
            </div>

            <div>
                <Label className="pb-1">Profile Picture</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {formData?.profile_image_preview && (
                    <div className="mt-2">
                        <Image
                            src={formData?.profile_image_preview}
                            alt="Profile"
                            width={80}
                            height={80}
                            className=""
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/users")}
                    disabled={loading}
                >
                    Back to list
                </Button>

                {!userEditId ? (
                    <Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Save
                    </Button>
                ) : (
                    <Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        Update
                    </Button>
                )}
            </div>
        </form>
    );
}