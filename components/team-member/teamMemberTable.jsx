"use client";

import { useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, UserX, UserCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateTeamMemberPasswordService, updateTeamMemberStatusService } from "@/service/team-member/team-member.service";
import { updateTeamMemberStatus } from "@/store/slices/team-member/team-member.slice";
import { handleUnauthorized } from "@/lib/lib/handleUnauthorized";

const TeamMemberTable = ({ data, onEdit }) => {

    const [openDialogId, setOpenDialogId] = useState(null);

    const [openPasswordDialogId, setOpenPasswordDialogId] = useState(null);
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: "",
    }); ``
    const [updatingPassword, setUpdatingPassword] = useState(false);


    const dispatch = useDispatch();

    const onToggleStatus = async (id, newStatus) => {
        try {
            const res = await updateTeamMemberStatusService({
                id,
                status: newStatus,
            });

            if (res?.status === 200) {
                dispatch(updateTeamMemberStatus(res.data.result));
                toast.success(
                    newStatus
                        ? "Team member activated"
                        : "Team member deactivated"
                );
                setOpenDialogId(null);
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Failed to update team member status");
            }
        }
    };

    const onUpdatePassword = async (memberId) => {
        const { password, confirmPassword } = passwordData;

        if (!password || !confirmPassword) {
            toast.error("Both fields are required");
            return;
        }

        if (password.length < 5) {
            toast.error("Password must be at least 5 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setUpdatingPassword(true);

            const res = await updateTeamMemberPasswordService({
                id: memberId,
                password,
            });

            if (res?.status === 200) {
                toast.success("Password updated successfully");

                setPasswordData({ password: "", confirmPassword: "" });
                setOpenPasswordDialogId(null);
            }
        } catch (err) {
            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Failed to update password");
            }
        } finally {
            setUpdatingPassword(false);
        }
    };


    return (
        <div className="rounded border shadow overflow-x-auto">
            <Table className="table-fixed min-w-[900px] w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[22%]">Name</TableHead>
                        <TableHead className="w-[28%]">Email</TableHead>
                        <TableHead className="w-[15%]">Role</TableHead>
                        <TableHead className="w-[15%]">Status</TableHead>
                        <TableHead className="w-[20%] text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((member) => (
                            <TableRow key={member._id}>

                                <TableCell className="font-medium">
                                    {member.name}
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {member.email}
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${member.role === "admin"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-purple-100 text-purple-700"
                                            }`}
                                    >
                                        {member.role === "admin"
                                            ? "Admin"
                                            : "Writer"}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${member.status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {member.status ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>

                                <TableCell className="text-center">
                                    <DropdownMenu

                                        open={openDialogId === member._id}
                                        onOpenChange={(open) =>
                                            setOpenDialogId(open ? member._id : null)
                                        }
                                    >
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => onEdit(member)}
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>

                                            <AlertDialog

                                            >
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        className={
                                                            member.status
                                                                ? "text-red-600 focus:text-red-600"
                                                                : "text-green-600 focus:text-green-600"
                                                        }

                                                    >
                                                        {member.status ? (
                                                            <>
                                                                <UserX className="mr-2 h-4 w-4" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserCheck className="mr-2 h-4 w-4" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            {member.status
                                                                ? "Deactivate team member?"
                                                                : "Activate team member?"}
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {member.status
                                                                ? "This user will no longer be able to access the system."
                                                                : "This user will regain access to the system."}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                onToggleStatus(
                                                                    member._id,
                                                                    !member.status
                                                                )
                                                            }
                                                            className={
                                                                member.status
                                                                    ? "bg-red-600 hover:bg-red-700"
                                                                    : "bg-green-600 hover:bg-green-700"
                                                            }
                                                        >
                                                            {member.status
                                                                ? "Deactivate"
                                                                : "Activate"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <AlertDialog
                                                open={openPasswordDialogId === member._id}
                                                onOpenChange={(open) => {
                                                    setOpenPasswordDialogId(open ? member._id : null);
                                                    setPasswordData({ password: "", confirmPassword: "" });
                                                }}
                                            >
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
                                                        <KeyRound className="mr-2 h-4 w-4" />
                                                        Update Password
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Update Password</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Set a new password for <b>{member.email}</b>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    {/* Inputs */}
                                                    <div className="space-y-3 py-2">
                                                        <input
                                                            type="password"
                                                            placeholder="New password"
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            value={passwordData.password}
                                                            onChange={(e) =>
                                                                setPasswordData((prev) => ({
                                                                    ...prev,
                                                                    password: e.target.value,
                                                                }))
                                                            }
                                                        />

                                                        <input
                                                            type="password"
                                                            placeholder="Confirm password"
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            value={passwordData.confirmPassword}
                                                            onChange={(e) =>
                                                                setPasswordData((prev) => ({
                                                                    ...prev,
                                                                    confirmPassword: e.target.value,
                                                                }))
                                                            }
                                                        />


                                                    </div>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel disabled={updatingPassword}>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <Button
                                                            onClick={() => onUpdatePassword(member._id)}
                                                            disabled={updatingPassword}
                                                        >
                                                            {updatingPassword ? "Updating..." : "Update Password"}
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center text-muted-foreground"
                            >
                                No team members found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TeamMemberTable;
