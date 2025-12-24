"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addNewTeamMemberService, updateTeamMemberService } from "@/service/team-member/team-member.service";
import { addNewTeamMember, updateTeamMember } from "@/store/slices/team-member/team-member.slice";
import { handleUnauthorized } from "@/lib/lib/handleUnauthorized";

const TeamMemberForm = ({ editTeamMemberData, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        if (editTeamMemberData) {
            setFormData({
                name: editTeamMemberData.name || "",
                email: editTeamMemberData.email || "",
                password: "",
                role: editTeamMemberData.role || "",
            });
        }
    }, [editTeamMemberData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter name");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter name");
            return;
        }

        if (!formData.email) {
            toast.error("Please enter email");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Please enter email");
            return;
        }

        if (!formData.password) {
            toast.error("Please enter password");
            return;
        }

        if (formData.password.length < 5) {
            toast.error("Password must be at least 5 characters");
            return;
        }

        if (!formData.role) {
            toast.error("Please select role");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Please enter password");
            return;
        }


        try {

            const payload = {
                ...formData,
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password.trim(),
            };

            const res = await addNewTeamMemberService(payload);

            if (res?.status === 200) {
                dispatch(addNewTeamMember(res.data.result));
                toast.success("Team member added successfully");
                handleClose();
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Failed to add team member");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter name");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter name");
            return;
        }

        if (!formData.email) {
            toast.error("Please enter email");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Please enter email");
            return;
        }

        if (!formData.role) {
            toast.error("Please select role");
            return;
        }

        try {
            const payload = {
                id: editTeamMemberData._id,
                name: formData.name,
                email: formData.email,
                role: formData.role,
            };

            const res = await updateTeamMemberService(payload);

            if (res?.status == 200) {
                dispatch(updateTeamMember(res.data.result));
                toast.success("Team member updated successfully");
                handleClose();
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Failed to update team member");
            }
        }
    };

    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>
                    Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>
                    Email <span className="text-red-500">*</span>
                </Label>
                <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
            </div>

            {!editTeamMemberData && (
                <div className="flex flex-col gap-2">
                    <Label>
                        Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Select
                    key={formData.role}
                    value={formData.role}
                    onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="writer">Writer</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {editTeamMemberData ? (
                <Button type="submit" className="mt-3" onClick={handleUpdate}>
                    Update
                </Button>
            ) : (
                <Button type="submit" className="mt-3" onClick={handleSubmit}>
                    Add
                </Button>
            )}
        </form>
    );
};

export default TeamMemberForm;
