"use client";
import CityTable from "@/components/city/cityTable";
import MainLayout from "@/components/layout/mainLayout";
import { Button } from "@/components/ui/button";
import { getALlCitiesService } from "@/service/citiy/city.slice";
import { setPaginatedCityData } from "@/store/slices/city/city.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CityForm from "@/components/city/cityForm";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
import { Loader2 } from "lucide-react";


const Page = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [total, settotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [editCityData, setEditCityData] = useState({});
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);

    const [sortCity, setSortCity] = useState(null);
    const [searchCity, setSearchCity] = useState("");

    const totalPages = Math.ceil(total / limit);

    const dispatch = useDispatch();
    const allCities = useSelector((state) => state.citySlice.paginatedCityData);

    const fetchCities = async (
        currentPage = page,
        currentLimit = limit,
        search = searchCity,
        sortBy = sortCity?.sortBy,
        sortOrder = sortCity?.sortOrder
    ) => {
        setLoading(true);
        try {
            const data = await getALlCitiesService(
                currentPage,
                currentLimit,
                search,
                sortBy,
                sortOrder
            );

            settotal(data?.data?.total_count);
            if (data?.status === 200) {
                dispatch(setPaginatedCityData(data?.data?.data));
            } else {
                toast.error("Failed to get all cities");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCities(page, limit, searchCity,);
    }, [page, limit]);

    useEffect(() => {
        if (sortCity) {
            fetchCities(1, limit, searchCity, sortCity?.sortBy, sortCity?.sortOrder);
            setPage(1);
        }
    }, [sortCity]);

    const handleDelete = async (id) => { };
    const handleEdit = (city) => {
        setEditCityData(city);
        setIsCityModalOpen(true);
    };
    const openAddCity = () => {
        setEditCityData({});
        setIsCityModalOpen(true);
    };

    const cityColumns = [{ label: "city", value: "city_name" }];

    const handleCitySortChange = (sort) => {
        setSortCity(sort);
    };

    return (
        <MainLayout>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <div className="flex justify-end mb-4">
                <Button onClick={openAddCity}>Add City</Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-1 gap-2">
                    <Input
                        placeholder="Search City"
                        className="flex-1 sm:flex-[2]"
                        onChange={(e) => setSearchCity(e.target.value)}
                        value={searchCity}
                    />
                    <Button onClick={() => fetchCities(1, limit, searchCity, sortCity?.sortBy, sortCity?.sortOrder)}>
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSearchCity("");
                            setPage(1);
                            fetchCities(1, limit, "", sortCity);
                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>
                </div>

                <div className="flex justify-end">
                    <FilterDropdown columns={cityColumns} onSortChange={handleCitySortChange} />
                </div>
            </div>

            <div className="mt-4">
                <CityTable
                    data={allCities}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    totalPages={totalPages}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>

            <Dialog open={isCityModalOpen} onOpenChange={setIsCityModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editCityData.id ? "Update City" : "Add City"}
                        </DialogTitle>
                        <DialogDescription>Add/Update city from here.</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <CityForm
                            editCityData={editCityData}
                            handleClose={() => setIsCityModalOpen(false)}
                            setPage={setPage}
                            setLimit={setLimit}
                            total={total}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
};


export default Page;

