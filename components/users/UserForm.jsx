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

export default function UserForm({ initialData = {}, onSubmit, userEditId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedStores, setSelectedStores] = useState([]);

    const roles = useSelector((state) => state.roleMasterSlice.value);
    const editData = useSelector((state) => state.userSlice.editUserData);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        role: "",
        StoreId: "",
        full_name: "",
        contact_number: "",
        email: "",
        Profile: "",
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await getAllRoles();
                dispatch(setRoles(res.data));
            } catch (err) {
                console.error("Failed to fetch roles:", err);
            }
        };

        fetchRoles();
    }, [dispatch]);

    useEffect(() => {
        if (userEditId && editData && roles.length > 0) {
            setFormData({
                full_name: editData.full_name || "",
                contact_number: editData.contact_number || "",
                email: editData.email || "",
                role: editData.role?.toString() || "",
                StoreId: editData.StoreId || "",
                Profile: editData.profile_image || "",
            });
        } else if (!userEditId) {
            setFormData({
                full_name: "",
                contact_number: "",
                email: "",
                role: "",
                StoreId: "",
                Profile: "",
            });
        }
    }, [editData, userEditId, roles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, Profile: imageUrl }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newUser = await addNewUserService(formData);

            dispatch(addUser(newUser?.data));
            router.push("/users");
        } catch (error) {
            console.error("Submit Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await updateUserService(userEditId, formData)

        if (response?.status === 200) {
            dispatch(updatedUserData(response?.data))
            router.push("/users");
        }
        else {
            toast.error("Error updating user", {
                description: response?.data?.message || "Something went wrong",
            });
        }
    }

    return (
        <form className="grid gap-4">
            <div>
                <Label className="pb-1">Full Name</Label>
                <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Mobile No</Label>
                <Input
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Email</Label>
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
                    options={stores}
                    onValueChange={setSelectedStores}
                    defaultValue={selectedStores}
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
                {formData.Profile && (
                    <div className="mt-2">
                        <Image
                            src={formData.Profile}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full"
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