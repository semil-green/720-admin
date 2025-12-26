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
import { CommonPagination } from '../common-pagination/commonPagination';
import { Input } from '../ui/input';
import TableSkeleton from '../skeleton/tableSkeleton';
const TeamMember = () => {

    const [loading, setLoading] = useState(false);
    const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
    const [editingTeamMember, setEditingTeamMember] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const dispatch = useDispatch();
    const openTeamMemberModal = () => {
        setIsTeamMemberModalOpen(true);
    }

    const fetchAllTeamMember = async () => {
        try {
            setLoading(true);
            const res = await fetchAllTeamMemberService(
                pagination.page,
                pagination.limit,
                search
            );

            if (res?.status == 200) {
                dispatch(setAllTeamMembersData(res?.data?.result));
                setPagination((prev) => ({
                    ...prev,
                    ...res?.data?.pagination,
                }));
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
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        fetchAllTeamMember();
    }, [pagination.page, , debouncedSearch]);


    const teamMemberData = useSelector((state) => state.teamMemberSlice.allTeamMembersData)
    return (
        <div>
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

            <div className="mb-5">
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination((prev) => ({
                            ...prev,
                            page: 1,
                        }));
                    }}
                    placeholder="search by team member name"
                    className="max-w-md"
                />
            </div>

            {
                loading ?
                    <TableSkeleton
                        columns={4}
                        rows={6}
                    />
                    :
                    <TeamMemberTable
                        data={teamMemberData}
                        onEdit={(data) => {
                            setIsTeamMemberModalOpen(true);
                            setEditingTeamMember(data);
                        }}
                    />
            }


            <CommonPagination
                pagination={pagination}
                onPageChange={(page) =>
                    setPagination((prev) => ({ ...prev, page }))
                }
            />

        </div>
    )
}

export default TeamMember