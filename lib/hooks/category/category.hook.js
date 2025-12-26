"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAuthors } from "@/store/slices/author/author.slice";
import { fetchAllCategoriesService } from "@/service/category/category.service";
import { setAllCategories } from "@/store/slices/category/category.slice";

export const useAllCategory = () => {
    const dispatch = useDispatch();
    const allCategories = useSelector(
        (state) => state.categorySlice.allCategories
    );

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current && allCategories.length === 0) {
            hasFetched.current = true;

            fetchAllCategoriesService(1, 10000000)
                .then((res) => {
                    dispatch(setAllCategories(res.categories));
                })
                .catch(console.log("Failed to fetch categories"));
        }
    }, [allCategories.length, dispatch]);

    return allCategories;
};

