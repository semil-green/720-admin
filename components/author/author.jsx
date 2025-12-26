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
import { handleUnauthorized } from '@/lib/lib/handleUnauthorized';
import { Input } from '../ui/input';
import TableSkeleton from '../skeleton/tableSkeleton';
const Author = () => {

    const [loading, setLoading] = useState(false);
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const dispatch = useDispatch();

    const paginatedAuthorsData = useSelector((state) => state.authorSlice.paginatedAuthors);
    const fetchAuthors = async () => {

        try {

            setLoading(true);
            const getData = await getAllAuthorsService(
                pagination.page,
                pagination.limit,
                search
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

            const handled = handleUnauthorized(err);

            if (!handled) {

                toast.error(err?.response?.data?.result || "Failed to fetch authors data");
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
        fetchAuthors();
    }, [pagination.page, , debouncedSearch]);

    const openAuthorModal = () => {
        setIsAuthorModalOpen(true);
    };

    return (
        <div>

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
                    placeholder="search by author name"
                    className="max-w-md"
                />
            </div>

            {loading ?
                <TableSkeleton
                    columns={4}
                    rows={6}
                />
                :
                <AuthorTable
                    data={paginatedAuthorsData}
                    onEdit={(category) => {
                        setEditingAuthor(category);
                        setIsAuthorModalOpen(true);
                    }}
                />}


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