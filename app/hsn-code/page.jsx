"use client";
import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; import HsnForm from '@/components/hsn/HsnForm';
import { getAllHSNCodeService } from '@/service/hsn-code/hsn-code.service';
import { setHsnCodes } from '@/store/slices/hsn-code/hsn-code.slice';
import { useDispatch, useSelector } from 'react-redux';
import HsnTable from '@/components/hsn/HsnTable';
const page = () => {
    const [isHsnModalOpen, setIsHsnModalOpen] = useState(false);
    const [editData, setEditData] = useState({})

    const dispatch = useDispatch();
    const openHsnModal = () => {
        setIsHsnModalOpen(true);
    };

    const allHsnCodes = useSelector((state) => state.hsnCodeSlice.allHsnCodes);

    useEffect(() => {
        const fetchHsnCode = async () => {
            try {
                const res = await getAllHSNCodeService();
                if (res?.status === 200) dispatch(setHsnCodes(res?.data));
            } catch (err) {
                toast.error("Failed to fetch HSN codes");
            }
        };
        if (!allHsnCodes || allHsnCodes.length === 0) {
            fetchHsnCode();
        }
    }, [allHsnCodes, dispatch]);

    return (
        <MainLayout>
            <div className="flex justify-end mb-4">
                <Button onClick={openHsnModal}>Add State</Button>
            </div>

            <Dialog open={isHsnModalOpen} onOpenChange={(open) => {
                setIsHsnModalOpen(open);
                if (!open) setEditData({});
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Add / Update HSN Code
                        </DialogTitle>

                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <HsnForm
                            handleClose={() => { setIsHsnModalOpen(false) }}
                            editStateData={editData}
                            setEditData={setEditData}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <div>
                <HsnTable
                    data={allHsnCodes}
                    setEditData={setEditData}
                    isHsnModalOpen={setIsHsnModalOpen}
                />
            </div>
        </MainLayout>
    )
}

export default page