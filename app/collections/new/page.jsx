"use client";
import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addNewCollectionService, getCollectionsById, searchProductsService, updateCollectionService } from '@/service/collections/collections.service';
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const page = () => {
    const editId = useSearchParams().get("id");
    const router = useRouter();

    const [productDisplayImageFile, setProductDisplayImageFile] = useState(null);
    const [productDisplayImagePreview, setProductDisplayImagePreview] =
        useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: {}
    });
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [product, setProducts] = useState([])



    useEffect(() => {
        if (!editId) return;

        const fetchData = async () => {
            try {
                const editData = await getCollectionsById(editId);

                setFormData({
                    title: editData?.title || "",
                    description: editData?.description || "",
                    image: editData?.image || {}
                });

                if (editData?.image) {
                    setProductDisplayImagePreview(editData.image);
                }

                if (editData?.products) {
                    const normalizedProducts = editData.products.map((p) => ({
                        ...p,
                        full_product_name: p.full_product_name || p.product_name,
                    }));
                    setProducts(normalizedProducts);
                }
            } catch (error) {
                toast.error("Error in fetching collection data");
            }
        };

        fetchData();
    }, [editId]);


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery) {
                fetchData();
            }
            else {
                setSearchResults([]);
            }
        }, 250);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            const data = await searchProductsService(searchQuery);
            setSearchResults(data);
        } catch (error) {
            toast.error("Error in searching products");
        }
    };

    const handleProductDisplayImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setProductDisplayImageFile(file);
            setProductDisplayImagePreview(blobUrl);
        }
    };
    const handleRemoveProductDisplayImage = () => {
        setProductDisplayImageFile(null);
        setProductDisplayImagePreview("");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = new FormData();

            dataToSend.append("title", formData.title);
            dataToSend.append("description", formData.description);

            const productIds = product.map((p) => p.product_id);
            dataToSend.append("product_ids", JSON.stringify(productIds));

            if (productDisplayImageFile) {
                dataToSend.append("image", productDisplayImageFile);
            }

            const response = await addNewCollectionService(dataToSend);

            if (response.status === 200 || response.status === 201) {

                toast.success("Collection added successfully");
                router.push("/collections")
            }
            else {
                toast.error("Error in adding collection");
            }

        } catch (error) {
            toast.error("Error in adding collection");
        }
    };

    const handleUpdate = async () => {
        try {
            const dataToSend = new FormData();

            dataToSend.append("title", formData.title);
            dataToSend.append("description", formData.description);

            const productIds = product.map((p) => p.product_id);
            dataToSend.append("product_ids", JSON.stringify(productIds));

            if (productDisplayImageFile) {
                dataToSend.append("image", productDisplayImageFile);
            } else if (formData.image) {
                const imageName = formData.image.split("/").pop();
                dataToSend.append("image", imageName);
            }

            const response = await updateCollectionService(editId, dataToSend);

            if (response.status === 200 || response.status === 201) {

                toast.success("Collection updated successfully");
                router.push("/collections")
            } else {
                toast.error("Error in updating collection");
            }
        } catch (error) {
            toast.error("Error in updating collection");
        }
    };


    return (
        <MainLayout>
            <div className='p-8 bg-sidebar'>
                <div className='flex justify-between items-end'>
                    <div className="flex items-center gap-2">
                        <Link href={"/collections"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>

                </div>

                <div className='grid grid-cols-3 mt-6 gap-5 b'>


                    <div className='col-span-2  px-4 py-2 bg-white  shadow rounded-md'>

                        <div className='flex flex-col gap-2'>
                            <Label className="pb-1">Title</Label>
                            <Input
                                name="title"
                                className='rounded-md border shadow h-10 px-4'
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>

                            <Label className="pb-1 font-medium">Description</Label>
                            <Textarea
                                name="description"
                                className="min-h-[150px]"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>


                    <div className='col-span-1 bg-white shadow rounded-md px-4 py-2'>

                        <div>
                            <Label className="pb-1"> Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleProductDisplayImageChange}
                            />
                            {productDisplayImagePreview && (
                                <div className="mt-2 relative inline-block">
                                    <Image
                                        src={productDisplayImagePreview}
                                        alt="Product Display"
                                        width={200}
                                        height={140}
                                        className="rounded-lg"
                                    />
                                    <button
                                        onClick={handleRemoveProductDisplayImage}
                                        className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
                                    >
                                        X
                                    </button>
                                </div>


                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4  bg-white  shadow rounded-md mt-6">

                    <label className='font-medium'>Products</label>
                    <div className="grid grid-cols-5 gap-2 mb-6 mt-4 relative">
                        <div className="col-span-2">
                            <input
                                type="text"
                                placeholder="Search products"
                                className="w-full rounded-md border shadow h-10 px-4"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {searchResults.length > 0 && (
                                <div className="absolute mt-1 w-full max-h-64 overflow-y-auto bg-white rounded-md shadow-lg z-20">
                                    {searchResults.map((product, index) => (
                                        <div
                                            key={product.product_id}
                                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                        >
                                            <span className="text-sm text-gray-700 font-medium w-4 text-right">
                                                {index + 1}.
                                            </span>
                                            <Image
                                                src={product.thumbnail_image}
                                                alt={product.full_product_name}
                                                width={40}
                                                height={40}
                                                className="rounded object-cover"
                                            />
                                            <span className="text-sm text-gray-900">{product.full_product_name}</span>
                                            <Button type="submit" className='cursor-pointer' size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setProducts((prev) => {
                                                        if (prev.some((p) => p.product_id === product.product_id)) {
                                                            return prev;
                                                        }
                                                        return [...prev, product];
                                                    });
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="space-y-2">
                        {product.map((product, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-md p-3 bg-white shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 font-medium w-4 text-right">
                                        {index + 1}.
                                    </span>
                                    <Image
                                        src={product.thumbnail_image}
                                        alt={"product_img"}
                                        width={48}
                                        height={48}
                                        className="rounded object-cover"
                                    />
                                    <span className="text-sm text-gray-900">{product.full_product_name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="text-gray-500 hover:text-red-500 text-lg font-semibold">
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
                <Link href={'/collections'}>
                    <Button type="button" variant="outline" >
                        Back to list
                    </Button>
                </Link>
                {
                    editId ? (<Button type="submit" className='cursor-pointer' onClick={handleUpdate}>
                        Update
                    </Button>) : (<Button type="submit" className='cursor-pointer' onClick={handleSubmit}>
                        Save
                    </Button>)
                }

            </div>


        </MainLayout>
    )
}

export default page