import React from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/mainLayout';
import Link from 'next/link';


const page = async ({ params }) => {

    const { name } = await params

    return (
        <MainLayout>
            <div className='p-8 bg-sidebar'>
                <div className='flex justify-between items-end'>
                    <div className="flex items-center gap-2">
                        <Link href={"/customer"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        {name && <h2 className="font-semibold text-xl">{name}</h2>}
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

                <div className='mt-4  rounded-lg border shadow px-3 py-3 bg-white 	'>
                    <div className='grid grid-cols-4'>

                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">
                                Amount spent
                            </h1>

                            <p className='pt-2'>345 rs</p>
                        </div>

                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">Orders</h1>
                            <p className='pt-2'>1</p>
                        </div>
                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">Customer Since</h1>
                            <p className='pt-2'>14 days</p>
                        </div>
                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">RFM Group</h1>
                            <p className='pt-2'>Active</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-3 mt-4 gap-4'>
                    <div className='col-span-2 rounded-lg border shadow px-3 py-3 bg-white'>
                        <p className='font-semibold'>  Last order placed</p>
                        <div className='px-2 mt-2'>
                            <div className='flex px-2  justify-between items-end'>
                                <div className='flex gap-4  py-3'>
                                    <p className='font-semibold text-blue-600'>#9856</p>

                                    <p>Paid</p>
                                    <p>Fulfilled</p>
                                </div>
                                <div className='py-3'> ₹329.0</div>

                            </div>

                            <div className='px-2 text-sm font-light mt-2'>1 July 2025 at 1.25 am from Damgood fish magic checkout</div>

                            <div className="flex items-start justify-between gap-5 p-4 rounded-md shadow border bg-white mt-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src="/images/seafood-bg.png"
                                        alt="image"
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                </div>

                                <div className="flex flex-col flex-grow text-sm">
                                    <span className="font-semibold text-gray-800">
                                        Rohu (Rui) Large (2 kg+) Bengali Curry Cut w/o Head
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        Nt. Wt. 470–520g (6–8 pcs)
                                    </span>
                                </div>

                                <div className="text-sm text-gray-700 whitespace-nowrap">x 1</div>

                                <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                    ₹329.00
                                </div>
                            </div>

                            <div className='mt-4 flex justify-end items-end gap-4'>
                                <Link href={`/orders/${name}`}>
                                    <Button className='cursor-pointer' variant={'secondary'}>View All Ordders</Button>
                                </Link>
                                <Button className='cursor-pointer bg-black text-white'>Create Order</Button>
                            </div>


                        </div>
                    </div>
                    <div className='col-span-1 rounded-lg border shadow px-3 py-3 bg-white'>

                        <div>
                            <h1>Customer</h1>
                        </div>

                        <div className='mt-3'>
                            <h1>Contact Information</h1>
                            <p className='text-blue-600'>test@gmail.com</p>
                        </div>

                        <div className='mt-3'>
                            <h1>Default Address</h1>
                            <p className=''>praharita senugupta

                                sundar apartment, near muc international, mohan garden, metro station, West Delhi
                            </p>
                        </div>
                    </div>
                </div>
                <div class="max-full mx-auto p-6 bg-white rounded-md shadow mt-4">
                    <h2 class="text-xl font-bold mb-6">Order History</h2>

                    <div class="relative border-l-2 border-gray-200 pl-6 space-y-8">

                        <div class="relative">
                            <div class="absolute -left-[20px] top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                            <div>
                                <h3 class="text-md font-semibold text-gray-900">Order #123456</h3>
                                <p class="text-sm text-gray-600">Placed on July 10, 2025</p>
                                <p class="text-sm text-gray-500">Status: <span class="text-blue-600 font-medium">Delivered</span></p>
                                <p class="text-sm text-gray-500">₹329.00 • Rohu (470-520g, 1pc)</p>
                            </div>
                        </div>

                        <div class="relative">
                            <div class="absolute -left-[20px] top-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                            <div>
                                <h3 class="text-md font-semibold text-gray-900">Order #123455</h3>
                                <p class="text-sm text-gray-600">Placed on July 5, 2025</p>
                                <p class="text-sm text-gray-500">Status: <span class="text-yellow-600 font-medium">In Transit</span></p>
                                <p class="text-sm text-gray-500">₹1,199.00 • Katla Curry Cut (850g, 2pcs)</p>
                            </div>
                        </div>

                        <div class="relative">
                            <div class="absolute -left-[20px] top-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                            <div>
                                <h3 class="text-md font-semibold text-gray-900">Order #123454</h3>
                                <p class="text-sm text-gray-600">Placed on June 30, 2025</p>
                                <p class="text-sm text-gray-500">Status: <span class="text-gray-600 font-medium">Cancelled</span></p>
                                <p class="text-sm text-gray-500">₹699.00 • Prawns Medium (500g)</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </MainLayout>
    )
}

export default page