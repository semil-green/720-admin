"use client";
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
import Loader from '../loader/loader';
import { fetchAllTeamMemberService } from '@/service/team-member/team-member.service';
import TeamMemberTable from './teamMemberTable';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import TeamMemberForm from './teamMemberForm';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTeamMembersData } from '@/store/slices/team-member/team-member.slice';
import { handleUnauthorized } from '@/lib/lib/handleUnauthorized';
const TeamMember = () => {

    const [loading, setLoading] = useState(false);
    const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
    const [editingTeamMember, setEditingTeamMember] = useState(null);

    const dispatch = useDispatch();
    const openTeamMemberModal = () => {
        setIsTeamMemberModalOpen(true);
    }

    const fetchAllTeamMember = async () => {
        try {
            setLoading(true);
            const res = await fetchAllTeamMemberService();
            if (res?.status == 200) {
                dispatch(setAllTeamMembersData(res?.data?.result));
            }
        } catch (err) {
            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Something went wrong. Failed to fetch team members.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllTeamMember();
    }, [])

    const teamMemberData = useSelector((state) => state.teamMemberSlice.allTeamMembersData)
    return (
        <div>
            {loading && <Loader />}
            <div className="flex justify-end mb-4">
                <Button onClick={openTeamMemberModal}>Add Team Member</Button>
            </div>


            <Dialog open={isTeamMemberModalOpen} onOpenChange={(open) => {
                setIsTeamMemberModalOpen(open);
                if (!open) setEditingTeamMember(null);
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingTeamMember ? "Update Team Member" : "Add Team Member"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingTeamMember
                                ? "Update a team member"
                                : "Add a new team member"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <TeamMemberForm
                            editTeamMemberData={editingTeamMember}
                            handleClose={() => {
                                setIsTeamMemberModalOpen(false);
                                setEditingTeamMember(null)
                            }}

                        />
                    </div>
                </DialogContent>
            </Dialog>

            <TeamMemberTable
                data={teamMemberData}
                onEdit={(data) => {
                    setIsTeamMemberModalOpen(true);
                    setEditingTeamMember(data);
                }}
            />



        </div>
    )
}

export default TeamMember