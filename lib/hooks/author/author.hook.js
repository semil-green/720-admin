"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthorsService } from "@/service/author/author.service";
import { setAllAuthors } from "@/store/slices/author/author.slice";

export const useAllAuthors = () => {
    const dispatch = useDispatch();
    const allAuthors = useSelector((state) => state.authorSlice.allAuthors);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current && allAuthors.length === 0) {
            hasFetched.current = true;

            getAllAuthorsService(1, 10000000)
                .then((res) => {
                    dispatch(setAllAuthors(res.data.authors));
                })
                .catch((err) => {
                    console.error("Failed to fetch authors", err);
                });
        }
    }, [allAuthors.length, dispatch]);

    return allAuthors;
};
