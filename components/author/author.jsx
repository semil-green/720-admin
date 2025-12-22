"use client";
import { getAllAuthorsService } from '@/service/author/author.service';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginatedAuthors } from '@/store/slices/author/author.slice';
import AuthorTable from './authorTable';
import Loader from '../loader/loader';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AuthorForm from './authorForm';
import { CommonPagination } from '../common-pagination/commonPagination';
const Author = () => {

    const [loading, setLoading] = useState(false);
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 7,
        total: 0,
        totalPages: 1,
    });

    const dispatch = useDispatch();

    const paginatedAuthorsData = useSelector((state) => state.authorSlice.paginatedAuthors);
    const fetchAuthors = async () => {

        try {

            setLoading(true);
            const getData = await getAllAuthorsService(
                pagination.page,
                pagination.limit
            );

            if (getData?.status == 200) {
                dispatch(setPaginatedAuthors(getData?.data?.authors));
                setPagination((prev) => ({
                    ...prev,
                    ...getData?.data?.pagination,
                }));
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.result || "Failed to fetch authors data");
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchAuthors();
    }, [pagination.page, pagination.limit]);

    const openAuthorModal = () => {
        setIsAuthorModalOpen(true);
    };

    return (
        <div>
            {loading && <Loader />}

            <div className="flex justify-end mb-4">
                <Button
                    onClick={openAuthorModal}
                >Add Author</Button>
            </div>


            <Dialog open={isAuthorModalOpen} onOpenChange={(open) => {
                setIsAuthorModalOpen(open);
                if (!open) setEditingAuthor(null);
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {setEditingAuthor ? "Update Author" : "Add Author"}
                        </DialogTitle>
                        <DialogDescription>
                            {setEditingAuthor
                                ? "Update Authpr"
                                : "Add new Author"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <AuthorForm
                            editAuthorData={editingAuthor}
                            handleClose={() => {
                                setIsAuthorModalOpen(false);
                                setEditingAuthor(null)
                            }}

                        />
                    </div>
                </DialogContent>
            </Dialog>

            <AuthorTable
                data={paginatedAuthorsData}
                onEdit={(category) => {
                    setEditingAuthor(category);
                    setIsAuthorModalOpen(true);
                }}
            />

            <CommonPagination
                pagination={pagination}
                onPageChange={(page) =>
                    setPagination((prev) => ({ ...prev, page }))
                }
            />
        </div>
    )
}

export default Author