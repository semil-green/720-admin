"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCategories, deleteCategory, addCategory, getCategory, updateCategory } from "@/lib/api/categories"
import CategoryTable from "@/components/categories/CategoryTable"
import CategoryForm from "@/components/categories/CategoryForm"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import MainLayout from "@/components/layout/mainLayout";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false)
    const [categoryImage, setCategoryImage] = useState(null);

    const router = useRouter()

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        setLoading(true)

        const categories = await getCategories();
        setCategories([...categories])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteCategory(id)
        toast.success("Deleted", {
            description: "Category deleted successfully"
        })

        await getCategoryList();
    }

    const handleSubmit = async (data) => {
        if (data.CategoryId === 0) {
            await addCategory(data)
            toast.success("Created", { description: "Category created successfully" })
        } else {
            await updateCategory(data.CategoryId, data)
            toast.success("Updated", { description: "Category updated successfully" })
        }
        setIsCategoryModalOpen(false);
        await getCategoryList();
    }

    const handleEdit = async (id) => {
        setLoading(true);
        const data = await getCategory(id)
        setCategory(data)
        setIsCategoryModalOpen(true);
        setLoading(false);
    }

    const openAddCategory = () => {
        setCategory({})
        setIsCategoryModalOpen(true);
    }

    const onOpenSubCategoryModal = () => {
        setIsSubCategoryModalOpen(true);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setCategoryImage(imageUrl)
        }
    }

    return (
        <MainLayout>
            {loading &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }

            <div className="space-y-4">
                <div className="flex justify-end items-center">
                    {/* <h2 className="text-2xl font-bold">Users</h2> */}
                    <Button onClick={() => openAddCategory()} className='cursor-pointer'>Add Category</Button>
                </div>

                <CategoryTable data={categories} onEdit={handleEdit} onDelete={handleDelete} onOpenSubCategoryModal={onOpenSubCategoryModal} />
            </div>


            {/* Add/Edit Category */}
            <Dialog open={!!isCategoryModalOpen > 0} onOpenChange={() => setIsCategoryModalOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {category.CategoryId > 0 ? 'Update Category' : 'Add Category'}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update category from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <CategoryForm initialData={category} onSubmit={handleSubmit} handleCose={() => setIsCategoryModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add/Edit Category */}
            <Dialog open={isSubCategoryModalOpen} onOpenChange={() => setIsSubCategoryModalOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Manage Sub Category</DialogTitle>
                        <DialogDescription>
                            Add or update existing sub category from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center flex-col gap-2 w-full">
                            <div className="w-full">
                                <div className="flex items-center gap-2">
                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                    {categoryImage && (
                                        <div className="mt-2">
                                            <Image src={categoryImage} alt="Category Image" width={40} height={40} className="rounded-full" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full">
                                <Input name="SubCategory" className='flex-1' defaultValue='' placeholder='Sub Category' />
                                <Button type="button" className='h-9'>Add</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <table className="w-full divide-y divide-gray-200 text-sm text-left rounded overflow-hidden">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Image</th>
                                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Sub Category</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 ">
                                    <tr>
                                        <td className="px-4 py-2">
                                            <Image src={'https://picsum.photos/200'} alt="Profile" width={50} height={50} className="rounded-lg" />
                                        </td>
                                        <td className="px-4 py-2">Sub Cat 1</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">
                                            <Image src={'https://picsum.photos/200'} alt="Profile" width={50} height={50} className="rounded-lg" />
                                        </td>
                                        <td className="px-4 py-2">Sub Cat 2</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">
                                            <Image src={'https://picsum.photos/200'} alt="Profile" width={50} height={50} className="rounded-lg" />
                                        </td>
                                        <td className="px-4 py-2">Sub Cat 3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </MainLayout>
    )
}
