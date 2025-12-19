"use client";
import { getAllAuthorsService } from '@/service/author/author.service';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginatedAuthors } from '@/store/slices/author/author.slice';
import AuthorTable from './authorTable';
import Loader from '../loader/loader';
const Author = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const paginatedAuthorsData = useSelector((state) => state.authorSlice.paginatedAuthors);
    const fetchAuthors = async () => {

        try {

            setLoading(true);
            const getData = await getAllAuthorsService();

            if (getData?.status == 200) {
                dispatch(setPaginatedAuthors(getData?.data?.authors));
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
    }, []);

    return (
        <div>
            {loading && <Loader />}
            <AuthorTable
                data={paginatedAuthorsData}
            />
        </div>
    )
}

export default Author