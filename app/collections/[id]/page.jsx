import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';


const page = async ({ params }) => {
    const { id } = await params

    const products = [
        {
            id: 1,
            title: 'Rohu (Rui) Large (2 kg+) Bengali Curry Cut w/o Head Nt. Wt. 470–520g (6–8 pcs)',
            image: '/images/seafood-bg.png',
            status: 'Active',
        },
        {
            id: 2,
            title: 'Catla (Bhakur, Large size 3 kg+) Bengali Curry Cut w/o Head Nt. Wt. 470–520g (5–7 pcs)',
            image: '/images/seafood-bg.png',
            status: 'Active',
        },
        {
            id: 3,
            title: 'Singhara (Aar) Fish Curry Cut w/o Head Nt. Wt. 500g (5–7 pcs)',
            image: '/images/seafood-bg.png',
            status: 'Active',
        },
    ];
    return (
        <MainLayout>
            <div className='p-8 bg-sidebar'>
                <div className='flex justify-between items-end'>
                    <div className="flex items-center gap-2">
                        <Link href={"/collections"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        {id && <h2 className="font-semibold text-xl">{id}</h2>}
                    </div>

                    <div>
                        <div>
                            <div className="relative inline-block group">
                                <button
                                    className="h-8 px-4 py-2 has-[>svg]:px-3 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 inline-flex items-center rounded-md"
                                >
                                    Menu
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all origin-top duration-200 pointer-events-none group-hover:pointer-events-auto"
                                >
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='grid grid-cols-3 mt-6 gap-5 b'>


                    <div className='col-span-2  px-4 py-2 bg-white  shadow rounded-md'>

                        <div className='flex flex-col gap-2'>
                            <label className='font-medium'>Title</label>
                            <input type='text' className='rounded-md border shadow h-10 px-4' />
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='font-medium'>Description</label>
                            <textarea type='text' className='rounded-md border shadow py-2 px-4' rows={5} />
                        </div>
                    </div>


                    <div className='col-span-1 bg-white shadow rounded-md px-4 py-2'>

                        <label className='font-medium'>Image</label>
                        <Image src="/images/seafood-bg.png" alt="image" width={100} height={100} className="w-full mt-4" />
                    </div>
                </div>

                <div className="p-4  bg-white  shadow rounded-md mt-6">

                    <label className='font-medium'>Products</label>
                    <div className="grid grid-cols-5 gap-2 mb-6 mt-4">
                        <div className="col-span-2">
                            <input
                                type="text"
                                placeholder="Search products"
                                className="w-full rounded-md border shadow h-10 px-4"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Browse"
                                className="w-full rounded-md border shadow h-10 px-4"
                            />
                        </div>
                        <div className="col-span-2">
                            <input
                                type="text"
                                placeholder="Sort"
                                className="w-full rounded-md border shadow h-10 px-4"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between border rounded-md p-3 bg-white shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 font-medium w-4 text-right">
                                        {index + 1}.
                                    </span>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                        className="rounded object-cover"
                                    />
                                    <span className="text-sm text-gray-900">{product.title}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                        {product.status}
                                    </span>
                                    <button className="text-gray-500 hover:text-red-500 text-lg font-semibold">
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </MainLayout>
    )
}

export default page